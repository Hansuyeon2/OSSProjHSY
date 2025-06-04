from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  

def gpt_comment(causes, main_emotion=None):
    if not causes:
        return "오늘 하루 특별한 감정 원인을 찾지 못했어요. 내일은 조금 더 마음을 들여다보는 하루가 되길 바랍니다."

    prompt = "다음은 사용자의 일기에서 추출한 감정 원인입니다:\n"
    for i, (sentence, cause) in enumerate(causes, 1):
        prompt += f"{i}. \"{sentence}\" → 원인: {cause}\n"

    if main_emotion:
        prompt += f"\n사용자의 오늘 주요 감정은 \"{main_emotion}\"입니다.\n"

    prompt += (
        "\n이러한 감정 원인과 주요 감정을 바탕으로 사용자에게 따뜻한 조언을 500자 이내, 세 문단으로 작성해주세요.\n"
        "각 문단의 역할은 다음과 같습니다:\n"
        "1. 첫 번째 문단에서는 감정의 원인을 언급하고, 그 감정에 따뜻하게 공감해주세요.\n"
        "2. 두 번째 문단에서는 그 감정이 어떤 마음에서 비롯되었는지를 짚어주며, 사용자가 자신을 이해할 수 있도록 도와주세요.\n"
        "3. 세 번째 문단에서는 감정을 돌보는 방법이나 앞으로 실천할 수 있는 작은 조언을 제시해주세요.\n"
        "전체적으로 공감과 위로를 주는 따뜻한 말투를 유지해주세요.\n"
    )

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )

    return response.choices[0].message.content.strip()
