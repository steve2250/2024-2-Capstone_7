import requests

def get_cases(query, oc="leehc0522", court=None, case_number=None, page=1, display=20):
    url = "http://www.law.go.kr/DRF/lawSearch.do"
    params = {
        "OC": oc,
        "target": "prec",
        "type": "XML",
        "query": query,
        "curt": court,
        "nb": case_number,
        "page": page,
        "display": display
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.content
    else:
        raise Exception(f"API 요청 실패: {response.status_code}")

def get_case_detail(case_id, oc="leehc0522"):
    url = "http://www.law.go.kr/DRF/lawService.do"
    params = {
        "OC": oc,
        "target": "prec",
        "ID": case_id,
        "type": "XML"
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.content
    else:
        raise Exception(f"API 요청 실패: {response.status_code}")
