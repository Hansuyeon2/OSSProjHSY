import os
from huggingface_hub import upload_folder

# 현재 huggingface.py 파일 기준으로 model 폴더 경로 설정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # /src/backend/ai/sentiment_cause
MODEL_PATH = os.path.join(BASE_DIR, 'model')  # 중복 제거

upload_folder(
    folder_path=MODEL_PATH,
    repo_id="mignonieee/t5-emotion-cause",  # HF repo 경로
    repo_type="model",
    commit_message="Upload fine-tuned emotion cause model"
)