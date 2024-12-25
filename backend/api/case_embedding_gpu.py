import sys
import os
import torch
import numpy as np
from transformers import BertModel

# src_tokenizer 경로 추가
sys.path.append('./bert_eojeol_pytorch/src_tokenizer')
from tokenization import BertTokenizer

# GPU 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 모델 및 토크나이저 설정
MODEL_PATH = './bert_eojeol_pytorch/'
VOCAB_PATH = './bert_eojeol_pytorch/vocab.korean.rawtext.list'
tokenizer = BertTokenizer(vocab_file=VOCAB_PATH)
model = BertModel.from_pretrained(MODEL_PATH, ignore_mismatched_sizes=True).to(device)

print("모델 및 토크나이저 로드 완료")

def read_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def preprocess_cases(case_text):
    cases = case_text.strip().split('\n\n')
    case_list = []
    for case in cases:
        case_id = case.split('판례정보일련번호: ')[1].split('\n')[0]
        case_content = case.split('판례내용: ')[1]
        case_list.append((case_id.strip(), case_content.strip()))
    return case_list

def sliding_window_tokenize(text, tokenizer, max_length=512, stride=256):
    tokens = tokenizer.tokenize(text)
    token_windows = []
    for i in range(0, len(tokens), stride):
        window = tokens[i:i + max_length]
        if len(window) > max_length:
            window = window[:max_length]
        token_windows.append(window)
    return token_windows

def encode_texts_with_sliding_window(texts, tokenizer, model, max_length=512, stride=256, batch_size=8):
    embeddings = []
    for idx, text in enumerate(texts):
        print(f"[진행 상황] {idx + 1}/{len(texts)} 텍스트 처리 중...")
        token_windows = sliding_window_tokenize(text, tokenizer, max_length, stride)
        all_embeddings = []
        for i in range(0, len(token_windows), batch_size):
            batch_tokens = token_windows[i:i + batch_size]
            batch_token_ids = []
            for tokens in batch_tokens:
                token_ids = tokenizer.convert_tokens_to_ids(tokens)
                vocab_size = model.config.vocab_size
                token_ids = [id if id < vocab_size else tokenizer.vocab['[UNK]'] for id in token_ids]
                if len(token_ids) > max_length:
                    token_ids = token_ids[:max_length]
                batch_token_ids.append(torch.tensor(token_ids))

            # 패딩 처리
            padded_batch = torch.nn.utils.rnn.pad_sequence(
                batch_token_ids, batch_first=True, padding_value=0
            ).to(device)

            # 모델 추론
            with torch.no_grad():
                try:
                    outputs = model(padded_batch)
                    batch_embeddings = outputs.last_hidden_state.mean(dim=1)
                    all_embeddings.extend(batch_embeddings)
                except RuntimeError as e:
                    print(f"[ERROR] 모델 추론 중 오류 발생: {e}")
                    continue

        if all_embeddings:
            embeddings.append(torch.mean(torch.stack(all_embeddings), dim=0))
        else:
            embeddings.append(torch.zeros((1, model.config.hidden_size)).to(device))
    return torch.vstack(embeddings)

def save_embeddings(embeddings, case_ids, output_file="case_embeddings.npz"):
    embeddings_np = np.array([embedding.cpu().numpy() for embedding in embeddings])
    np.savez(output_file, case_ids=case_ids, embeddings=embeddings_np)
    print(f"임베딩 저장 완료: {output_file}")

def main():
    cases_file_path = '2_details.txt'
    cases_text = read_file(cases_file_path)
    cases = preprocess_cases(cases_text)
    case_ids = [case[0] for case in cases]
    case_texts = [case[1] for case in cases]

    print("[INFO] 판례 데이터 임베딩 시작")
    case_embeddings = encode_texts_with_sliding_window(case_texts, tokenizer, model)
    save_embeddings(case_embeddings, case_ids)

if __name__ == '__main__':
    main()

