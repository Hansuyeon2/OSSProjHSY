import re
import torch
from transformers import T5Tokenizer, T5ForConditionalGeneration
from functools import lru_cache

# 디바이스 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 모델과 토크나이저를 Lazy하게 불러오는 함수 (최초 1회만 로드됨)
@lru_cache()
def get_model():
    MODEL_NAME = "mignonieee/t5-emotion-cause"
    tokenizer = T5Tokenizer.from_pretrained(MODEL_NAME)
    model = T5ForConditionalGeneration.from_pretrained(MODEL_NAME).to(device)
    return tokenizer, model

# 입력 전처리 함수
def preprocess_user_input(text):
    text = re.sub(r"[\"\'\(\)\[\]\{\}]", "", text)   # 특수기호 제거
    text = re.sub(r"\s+", " ", text).strip()         # 공백 정리
    sentences = re.split(r'(?<=[.!?])\s+', text)      # 문장 단위로 분리
    return [s for s in sentences if len(s) > 5]       # 너무 짧은 문장 제외

# 출력 후처리 함수 (감정 제거 → 원인만 반환)
def clean_output(text):
    text = re.sub(r"[\"\'\[\]\(\)]", "", text).strip()
    if "||" in text:
        text = text.split("||", 1)[1]  # 감정 제거
    if len(text) < 2 or text.lower() in ["none", "nan", "감정"]:
        return ""
    return text

# 감정 원인 생성 함수
def generate_cause_from_text(text):
    tokenizer, model = get_model()  # lazy load
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
    test_text = "오늘 찬주랑 싸워서 너무 슬퍼. 아침부터 기분이 안 좋았어."
    for sent, cause in generate_cause_from_text(test_text):
        print(f"[문장] {sent}\n→ [감정 원인] {cause}\n")
