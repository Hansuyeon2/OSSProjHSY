from openai import OpenAI
import os
from dotenv import load_dotenv
from .sentiment_cause.inference.inference import generate_emotion_and_cause, get_main_emotion_with_latest_priority

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def gpt_comment(causes, main_emotion=None):
    if not causes:
        return "오늘 하루 특별한 감정 원인을 찾지 못했어요. 내일은 조금 더 마음을 들여다보는 하루가 되길 바랍니다."

    prompt = "다음은 사용자의 일기에서 추출한 감정 및 원인입니다:\n"
    for i, (sentence, emotion, _, cause) in enumerate(causes, 1): 
        prompt += f"{i}. \"{sentence}\" → 감정: {emotion}, 원인: {cause}\n"

    if main_emotion:
        prompt += f"\n사용자의 오늘 주요 감정은 \"{main_emotion}\"입니다.\n"

    prompt += (
        "\n이러한 감정 원인과 주요 감정을 바탕으로 사용자에게 따뜻한 조언을 문단 세 개로, 500자 이내로 작성해주세요. "
        "감정의 원인을 반드시 언급해야 하며, 감정 상태에 공감하는 따뜻한 말투로 작성해주세요. "
        "사용자가 앞으로 어떻게 하면 좋을지 조언도 해주세요. "
        "세 문단이 자연스럽게 연결되도록 해주세요.\n"
    )

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )

    return response.choices[0].message.content.strip()