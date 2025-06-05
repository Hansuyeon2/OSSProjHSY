import os
from huggingface_hub import upload_folder

# huggingface.py가 위치한 디렉토리 기준으로 model 경로 설정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model')

upload_folder(
    folder_path=MODEL_PATH,
    repo_id="mignonieee/t5-sentiment-cause-model",
    repo_type="model",
    commit_message="Reupload with essential model and tokenizer files only"
)