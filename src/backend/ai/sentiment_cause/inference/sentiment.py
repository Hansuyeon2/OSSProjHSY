import re
from transformers import pipeline, T5Tokenizer, T5ForConditionalGeneration

# 1. 감정 분석 파이프라인 로드
sentiment_pipeline = pipeline(
    "text-classification",
    model="hun3359/klue-bert-base-sentiment",
    tokenizer="hun3359/klue-bert-base-sentiment",
    return_all_scores=True
)

# 감정 매핑
emotion_mapping = {
    '행복': ['기쁨', '감사하는', '신뢰하는', '만족스러운', '흥분', '신이 난', '자신하는'],
    '놀람': ['당황', '고립된(당황한)', '남의 시선을 의식하는', '열등감', '부끄러운', '혼란스러운(당황한)'],
    '화남': ['분노', '툴툴대는', '좌절한', '짜증내는', '방어적인', '악의적인', '안달하는',
           '구역질 나는', '노여워하는', '성가신', '질투하는', '억울한', '혐오스러운', '한심한'],
    '평온': ['편안한', '느긋', '안도'],
    '우울함': ['슬픔', '실망한', '비통한', '후회되는', '우울한', '마비된', '염세적인',
             '눈물이 나는', '낙담한', '환멸을 느끼는', '상처', '배신당한', '고립된', '충격 받은',
             '가난한 불우한', '희생된', '괴로워하는', '버려진', '외로운', '죄책감의'],
    '두려움': ['불안', '두려운', '스트레스 받는', '취약한', '혼란스러운', '당혹스러운',
             '회의적인', '걱정스러운', '조심스러운', '초조한']
}

def find_main_emotion(detail_emotion):
    for main, details in emotion_mapping.items():
        if detail_emotion in details:
            return main
    return "기타"

# 2. T5 기반 감정 원인 생성 모델 로드
tokenizer = T5Tokenizer.from_pretrained("/mnt/data/t5-emotion-cause-model")
model = T5ForConditionalGeneration.from_pretrained("/mnt/data/t5-emotion-cause-model")

# 3. 입력 전처리 + 감정 분석 + 원인 생성 통합 함수
def analyze_emotion_and_cause(text):
    # 문장 분리 (짧은 문장 제거 포함)
    sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', text) if len(s.strip()) > 5]

    results = []
    for sent in sentences:
        # 감정 분석
        result = sentiment_pipeline(sent)
        best_result = max(result[0], key=lambda x: x["score"])
        sub_emotion = best_result["label"]
        main_emotion = find_main_emotion(sub_emotion)
        score = round(best_result["score"], 3)

        # 감정 원인 생성
        input_text = f"문장에서 감정의 원인을 추출하세요: {sent}"
        input_ids = tokenizer.encode(input_text, return_tensors="pt", max_length=128, truncation=True)
        output_ids = model.generate(input_ids, max_length=30, num_beams=5, early_stopping=True)
        cause = tokenizer.decode(output_ids[0], skip_special_tokens=True)

        results.append({
            "sentence": sent,
            "main_emotion": main_emotion,
            "sub_emotion": sub_emotion,
            "emotion_score": score,
            "cause": cause
        })

    return results