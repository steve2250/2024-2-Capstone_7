from flask import Flask, request, jsonify
import xml.etree.ElementTree as ET
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def get_case_detail(case_id, oc="kroad0129"):
    url = "http://www.law.go.kr/DRF/lawService.do"
    params = {
        "OC": oc,
        "target": "prec",
        "type": "XML",
        "ID": case_id
    }
    try:
        response = requests.get(url, params=params, timeout=10)
        if response.status_code == 200:
            return response.content
        else:
            raise Exception(f"판례 상세 API 요청 실패: {response.status_code}, {response.text}")
    except requests.exceptions.Timeout:
        raise Exception("요청이 시간 초과되었습니다.")
    except requests.exceptions.RequestException as e:
        raise Exception(f"요청 중 오류 발생: {e}")

def parse_case_detail(xml_content):
    tree = ET.ElementTree(ET.fromstring(xml_content))
    root = tree.getroot()
    return {
        "판례내용": root.findtext('판례내용', ''),
        "사건명": root.findtext('사건명', ''),
        "사건번호": root.findtext('사건번호', ''),
        "선고일자": root.findtext('선고일자', ''),
        "법원명": root.findtext('법원명', '')
    }

def calculate_similarity_tfidf(user_story, case_content):
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform([user_story, case_content])
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    return similarity[0][0]

@app.route('/search_cases', methods=['POST'])
def search_cases():
    try:
        data = request.json
        print("받은 데이터:", data)
        keyword = data.get('query')
        user_story = data.get('user_story')

        if not keyword or not user_story or keyword.strip() == "" or user_story.strip() == "":
            print(f"유효하지 않은 데이터 - keyword: {keyword}, user_story: {user_story}")
            return jsonify({"error": "키워드와 사연을 모두 입력하세요."}), 400

        case_id = 228541
        xml_content = get_case_detail(case_id)
        case_detail = parse_case_detail(xml_content)

        case_content = case_detail.get("판례내용", "")
        print("판례 본문:", case_content)

        if not case_content:
            return jsonify({"error": "판례 본문이 비어 있습니다."}), 400

        # 키워드 존재 여부를 확인하지 않고 유사도 계산 수행
        similarity = calculate_similarity_tfidf(user_story, case_content)
        return jsonify({
            "사건명": case_detail["사건명"],
            "사건번호": case_detail["사건번호"],
            "판례내용": case_detail["판례내용"],
            "법원명": case_detail["법원명"],
            "유사도": similarity
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
