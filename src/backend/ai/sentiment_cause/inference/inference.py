import re
import torch
from transformers import T5Tokenizer, T5ForConditionalGeneration

# 디바이스 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Hugging Face Hub에서 모델 로드
MODEL_NAME = "mignonieee/t5-emotion-cause"
tokenizer = T5Tokenizer.from_pretrained(MODEL_NAME)
model = T5ForConditionalGeneration.from_pretrained(MODEL_NAME).to(device)

# 입력 전처리 함수
def preprocess_user_input(text):
    text = re.sub(r"[\"\'\(\)\[\]\{\}]", "", text)   # 특수기호 제거
    text = re.sub(r"\s+", " ", text).strip()         # 공백 정리
    sentences = re.split(r'(?<=[.!?])\s+', text)      # 문장 단위로 분리
    return [s for s in sentences if len(s) > 5]       # 너무 짧은 문장 제외

# 출력 후처리 함수
def clean_output(text):
    text = re.sub(r"[\"\'\[\]\(\)]", "", text).strip()
    if len(text) < 2 or text.lower() in ["none", "nan", "감정"]:
        return ""
    return text

# 감정 원인 생성 함수
def generate_cause_from_text(text):
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
            max_length=30,
            num_beams=4,
            early_stopping=True
        )

        cause = tokenizer.decode(output_ids[0], skip_special_tokens=True)
        results.append((sentence, clean_output(cause)))
    return results

# 테스트 실행
if __name__ == "__main__":
    text = "오늘 찬주랑 싸워서 너무 슬퍼"
    for sent, cause in generate_cause_from_text(text):
        print(f"[문장] {sent}\n→ [감정 원인] {cause}\n")