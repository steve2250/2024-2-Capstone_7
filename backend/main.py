import os
import torch
import requests
import xml.etree.ElementTree as ET
from flask import Flask, request, jsonify
from flask_cors import CORS

from bert_utils.tokenizer import setup_tokenizer_and_model
from bert_utils.embedding import encode_text, calculate_similarity
from data_utils.file_handler import read_file, load_embeddings

# GPU 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 경로 설정
MODEL_PATH = "bert_eojeol_pytorch/"
VOCAB_PATH = "bert_eojeol_pytorch/vocab.korean.rawtext.list"
EMBEDDING_DIR = "embeddings/"

# Flask 서버 초기화
app = Flask(__name__)
CORS(app)  # React와의 통신을 위해 CORS 활성화

# 토크나이저 및 모델 로드
tokenizer, model = setup_tokenizer_and_model(MODEL_PATH, VOCAB_PATH, device)

# 법령 API 설정
LAW_API_URL = "http://www.law.go.kr/DRF/lawService.do"
LAW_API_KEY = "leehc0522"  # 사용자 OC 값


def fetch_case_details(case_id):
    """
    법제처 OpenAPI를 이용하여 판례 정보를 조회하고 사건명, 판시사항(요약), 선고일자를 반환
    """
    params = {
        "OC": LAW_API_KEY,
        "target": "prec",
        "ID": case_id,  # 판례 일련번호
        "type": "XML"   # XML 형식으로 요청
    }
    try:
        # API 요청
        response = requests.get(LAW_API_URL, params=params)
        response.raise_for_status()  # HTTP 에러 검사
        xml_data = response.text

        # XML 파싱
        root = ET.fromstring(xml_data)

        # 사건명, 판시사항, 선고일자 추출
        case_name = root.findtext(".//사건명", default="사건명 없음")
        판시사항 = root.findtext(".//판시사항", default="판시사항 없음")
        선고일자 = root.findtext(".//선고일자", default="선고일자 없음")

        # 판시사항 <br/> 태그를 줄바꿈(\n)으로 변경
        판시사항 = 판시사항.replace("<br/>", "\n")

        # 판시사항 2줄만 추출
        판시사항_lines = 판시사항.splitlines()[:2]  # 2줄만 추출
        판시사항_summary = "\n".join(판시사항_lines).strip()

        return case_name, 판시사항_summary, 선고일자
    except Exception as e:
        print(f"[ERROR] API 요청 오류: {e}")
        return "사건명 없음", "판시사항 없음", "선고일자 없음"


@app.route("/api/similarity", methods=["POST"])
def get_similarity():
    """유사도 계산 API"""
    data = request.json
    file_name = data.get("fileName")
    user_story = data.get("user_story")  # 사용자 입력 사연

    # 임베딩 파일 로드
    embedding_file_path = os.path.join(EMBEDDING_DIR, file_name)

    if not os.path.isfile(embedding_file_path):
        return jsonify({"error": "해당 임베딩 파일이 존재하지 않습니다."}), 400

    # 사연 임베딩 계산 (사용자 입력 반영)
    story_embedding = encode_text(user_story, tokenizer, model, device)

    # 판례 임베딩 계산
    case_ids, case_embeddings = load_embeddings(embedding_file_path, device)

    # 유사도 계산
    similarities = calculate_similarity(story_embedding, case_embeddings)
    top_k = 10
    top_k_indices = torch.topk(similarities, k=top_k).indices
    top_k_similarities = similarities[top_k_indices].tolist()

    # 결과 구성
    results = []
    for rank, idx in enumerate(top_k_indices):
        case_id = case_ids[idx]

        # 사건명, 판시사항(요약), 선고일자 조회
        case_name, case_summary, case_date = fetch_case_details(case_id)

        # 결과 구성
        result = {
            "case_name": case_name,
            "summary": case_summary,  # 판시사항 요약
            "date": case_date,  # 선고일자
            "similarity": round(top_k_similarities[rank] * 100, 2),  # 유사도 백분율
            "link": f"https://www.law.go.kr/DRF/lawService.do?OC=leehc0522&target=prec&ID={case_id}&type=HTML"
        }
        results.append(result)

    return jsonify({"results": results})


if __name__ == "__main__":
    app.run(debug=True, port=5000)