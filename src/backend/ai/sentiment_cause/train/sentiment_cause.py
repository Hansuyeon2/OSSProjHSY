# sentiment_cause.py (in src/backend/ai/sentiment_cause/train/)

import os
import pandas as pd
from datasets import Dataset
from transformers import (
    T5Tokenizer, T5ForConditionalGeneration,
    Seq2SeqTrainingArguments, Seq2SeqTrainer,
    DataCollatorForSeq2Seq
)

# 1. 경로 설정 
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "sentiment_cause.csv")
MODEL_DIR = os.path.join(BASE_DIR, "model", "t5-emotion-cause-model-joint")
LOG_DIR = os.path.join(BASE_DIR, "logs", "joint")

# 2. 데이터 로드
df = pd.read_csv(DATA_PATH)
dataset = Dataset.from_pandas(df)

# 3. Tokenizer 로드
tokenizer = T5Tokenizer.from_pretrained("KETI-AIR/ke-t5-base", use_fast=False)

# 4. 전처리 함수
def preprocess(example):
    input_enc = tokenizer(
        example["input_text"],
        max_length=128,
        truncation=True,
        padding="max_length"
    )
    with tokenizer.as_target_tokenizer():
        label_enc = tokenizer(
            example["target_text"],
            max_length=64,
            truncation=True,
            padding="max_length"
        )
    labels = [
        token if token != tokenizer.pad_token_id else -100
        for token in label_enc["input_ids"]
    ]
    input_enc["labels"] = labels
    return input_enc

# 5. 전처리 적용
tokenized_dataset = dataset.map(preprocess, remove_columns=["input_text", "target_text"])

# 6. 모델 로드
model = T5ForConditionalGeneration.from_pretrained("KETI-AIR/ke-t5-base")

# 7. Collator 정의
data_collator = DataCollatorForSeq2Seq(
    tokenizer=tokenizer,
    model=model,
    label_pad_token_id=-100,
    pad_to_multiple_of=8
)

# 8. 학습 인자 정의
training_args = Seq2SeqTrainingArguments(
    output_dir=MODEL_DIR,
    per_device_train_batch_size=8,
    learning_rate=3e-4,
    weight_decay=0.01,
    warmup_steps=500,
    num_train_epochs=10,
    save_total_limit=2,
    predict_with_generate=True,
    fp16=False,
    logging_steps=100,
    logging_dir=LOG_DIR,
    report_to="none"
)

# 9. Trainer 정의
trainer = Seq2SeqTrainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    tokenizer=tokenizer,
    data_collator=data_collator
)

# 10. 학습
trainer.train()

# 11. 모델 저장
trainer.save_model(MODEL_DIR)
tokenizer.save_pretrained(MODEL_DIR)

print("모델 학습 및 저장 완료:", MODEL_DIR)