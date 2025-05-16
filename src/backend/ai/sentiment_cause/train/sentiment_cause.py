import os
import torch
import pandas as pd
from datasets import Dataset
from transformers import (
    T5Tokenizer,
    T5ForConditionalGeneration,
    Seq2SeqTrainingArguments,
    Seq2SeqTrainer,
    DataCollatorForSeq2Seq
)

# CUDA 설정 
device = torch.device("cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu")
print(f"Using device: {device}")

# 1. 데이터셋 로드
data_path = "./train/Updated_Emotion_Cause.csv"
df = pd.read_csv(data_path)
dataset = Dataset.from_pandas(df)

# 2. Tokenizer 로드
tokenizer = T5Tokenizer.from_pretrained("KETI-AIR/ke-t5-base", use_fast=False)

# 3. 전처리 함수 정의
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
            max_length=32,
            truncation=True,
            padding="max_length"
        )
    labels = label_enc["input_ids"]
    labels = [token if token != tokenizer.pad_token_id else -100 for token in labels]
    input_enc["labels"] = labels
    return input_enc

# 4. 전처리 적용
tokenized_dataset = dataset.map(preprocess, remove_columns=["input_text", "target_text"])
print("✅ tokenized_dataset 샘플:", tokenized_dataset[0])

# 5. 모델 로딩
model = T5ForConditionalGeneration.from_pretrained("KETI-AIR/ke-t5-base").to(device)

# 6. DataCollator 정의
data_collator = DataCollatorForSeq2Seq(
    tokenizer=tokenizer,
    model=model,
    label_pad_token_id=-100,
    pad_to_multiple_of=8
)

# 7. 학습 인자 설정
training_args = Seq2SeqTrainingArguments(
    output_dir="./train/t5-emotion-cause-model",
    per_device_train_batch_size=4,
    num_train_epochs=5,
    save_total_limit=1,
    predict_with_generate=True,
    fp16=torch.cuda.is_available(),
    logging_steps=100,
    logging_dir="./train/logs",
    report_to="none"
)

# 8. Trainer 정의
trainer = Seq2SeqTrainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    tokenizer=tokenizer,
    data_collator=data_collator
)

# 9. 학습
trainer.train()

# 10. 모델 저장
trainer.save_model("./train/t5-emotion-cause-model")
tokenizer.save_pretrained("./train/t5-emotion-cause-model")

print("학습 완료 및 모델 저장 완료")