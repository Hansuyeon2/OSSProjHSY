import re
import torch
from collections import defaultdict
from transformers import T5Tokenizer, T5ForConditionalGeneration

# 디바이스 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Hugging Face Hub에서 모델 로드
MODEL_NAME = "mignonieee/t5-sentiment-cause-model"
tokenizer = T5Tokenizer.from_pretrained(MODEL_NAME)
model = T5ForConditionalGeneration.from_pretrained(MODEL_NAME).to(device)

# 대표 감정 → 세부 감정 매핑
emotion_detail_map = {
    "우울함": ["슬픔", "실망", "후회", "비참함"],
    "행복": ["기쁨", "설렘", "만족감", "신남"],
    "화남": ["짜증", "분노", "억울함"],
    "두려움": ["불안", "긴장", "걱정"],
    "평온": ["편안함", "안정감"],
    "놀람": ["당황", "경악", "예상밖"]
}

# 문장 전처리
def preprocess_user_input(text):
    text = re.sub(r"[\"\'\(\)\[\]\{\}]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    sentences = re.split(r'(?<=[.!?])\s+', text)
    return [s for s in sentences if len(s) > 5]

# 감정 및 원인 분리 + 세부 감정 매핑
def parse_emotion_and_cause(output):
    output = re.sub(r"[\"\'\[\]\(\)]", "", output).strip()
    if "||" in output:
        emotion, cause = output.split("||", 1)
    else:
        emotion, cause = "없음", output
    emotion = emotion.strip()
    cause = cause.strip()
    sub_emotions = emotion_detail_map.get(emotion, [])
    return emotion, cause, sub_emotions

# 주요 감정 결정 (다수결 + 뒷문장 우선)
def get_main_emotion_with_latest_priority(emotions):
    emotion_count = defaultdict(int)
    emotion_latest_index = {}

    for idx, emo in enumerate(emotions):
        emotion_count[emo] += 1
        emotion_latest_index[emo] = idx

    sorted_emotions = sorted(
        emotion_count.items(),
        key=lambda item: (-item[1], -emotion_latest_index[item[0]])
    )
    return sorted_emotions[0][0] if sorted_emotions else "없음"

# 감정 및 원인 생성 (문장 단위)
def generate_emotion_and_cause(text):
    sentences = preprocess_user_input(text)
    results = []
    for sentence in sentences:
        input_text = f"감정 원인을 추출하세요: {sentence}"
        input_ids = tokenizer.encode(
            input_text,
            return_tensors="pt",
            max_length=128,
            truncation=True
        ).to(device)

        output_ids = model.generate(
            input_ids,
            max_length=32,
            num_beams=4,
            early_stopping=True
        )

        output_text = tokenizer.decode(output_ids[0], skip_special_tokens=True)
        emotion, cause, sub_emotions = parse_emotion_and_cause(output_text)
        results.append((sentence, emotion, sub_emotions, cause))
    return results

# 테스트 실행
if __name__ == "__main__":
    text = "오늘 돈까스를 먹었다."
    results = generate_emotion_and_cause(text)
    all_emotions = [e for _, e, _, _ in results]
    main_emotion = get_main_emotion_with_latest_priority(all_emotions)

    print(f"\n대표 감정: {main_emotion}\n")
    for sent, emotion, sub_emotions, cause in results:
        print(f"문장 : {sent}")
        print(f"대표감정 : {emotion}")
        print(f"세부감정 : {', '.join(sub_emotions) if sub_emotions else '없음'}")
        print(f"원인 : {cause}\n")