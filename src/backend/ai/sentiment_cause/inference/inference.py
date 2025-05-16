import re
import torch
from transformers import T5Tokenizer, T5ForConditionalGeneration

# 모델 경로
model_dir = "inference/t5-emotion-cause-model"

# CUDA 설정
device = torch.device("mps" if torch.backends.mps.is_available() else "cuda" if torch.cuda.is_available() else "cpu")
print(f"Device set to: {device}")

# 모델 로드
tokenizer = T5Tokenizer.from_pretrained(model_dir)
model = T5ForConditionalGeneration.from_pretrained(model_dir).to(device)

# 전처리 함수
def preprocess_user_input(text):
    text = re.sub(r"[\"\'\(\)\[\]\{\}]", "", text)
    text = re.sub(r"\s+", " ", text)
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    sentences = [s for s in sentences if len(s) > 5]
    return sentences

# 감정 원인 추론 함수
def generate_cause_from_text(text):
    sentences = preprocess_user_input(text)
    results = []
    for sentence in sentences:
        input_text = f"문장에서 감정의 원인을 추출하세요: {sentence}"
        input_ids = tokenizer.encode(input_text, return_tensors="pt", max_length=128, truncation=True).to(device)
        output_ids = model.generate(input_ids, max_length=30, num_beams=5, early_stopping=True)
        cause = tokenizer.decode(output_ids[0], skip_special_tokens=True)
        results.append((sentence, cause))
    return results

# 예시 실행
if __name__ == "__main__":
    user_input = "오늘 친구랑 싸워서 너무 슬퍼"
    for sent, cause in generate_cause_from_text(user_input):
        print(f"[문장] {sent}\n→ [원인 생성] {cause}\n")