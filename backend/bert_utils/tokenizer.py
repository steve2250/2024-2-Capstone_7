import os
import sys
import torch
from transformers import BertModel

# 토크나이저 직접 임포트
from bert_eojeol_pytorch.src_tokenizer.tokenization import BertTokenizer

def setup_tokenizer_and_model(model_path, vocab_path, device):
    tokenizer = BertTokenizer(vocab_file=vocab_path)
    model = BertModel.from_pretrained(model_path, ignore_mismatched_sizes=True).to(device)
    print("모델 및 토크나이저 로드 완료")
    return tokenizer, model

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

if __name__ == "__main__":
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # 현재 파일 위치 기준 경로
    MODEL_PATH = os.path.join(BASE_DIR, "bert_eojeol_pytorch")
    VOCAB_PATH = os.path.join(BASE_DIR, "bert_eojeol_pytorch", "vocab.korean.rawtext.list")

    tokenizer, model = setup_tokenizer_and_model(MODEL_PATH, VOCAB_PATH, device)
    print("토크나이저와 모델 설정 완료")
