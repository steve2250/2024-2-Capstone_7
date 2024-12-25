import requests
import xml.etree.ElementTree as ET

def get_case_ids_by_keyword(keyword, oc="kroad0129", search=2, display=100, max_pages=1000):
    """
    특정 키워드로 본문 검색을 수행하고 판례 일련번호를 수집.
    
    Args:
        keyword (str): 검색 키워드.
        oc (str): 사용자 ID.
        search (int): 검색 범위 (2: 본문 검색).
        display (int): 한 번에 가져올 최대 결과 수 (default=100).
        max_pages (int): 가져올 최대 페이지 수 (default=10).

    Returns:
        list: 판례 일련번호 목록.
    """
    url = "http://www.law.go.kr/DRF/lawSearch.do"
    case_ids = []

    for page in range(1, max_pages + 1):
        params = {
            "OC": oc,
            "target": "prec",
            "type": "XML",
            "search": search,
            "query": keyword,
            "display": display,
            "page": page
        }

        try:
            response = requests.get(url, params=params)
            if response.status_code != 200:
                print(f"API 요청 실패 (페이지 {page}): {response.status_code}")
                break

            # XML 파싱
            tree = ET.ElementTree(ET.fromstring(response.content))
            root = tree.getroot()

            # 판례 일련번호 수집
            cases = root.findall('prec')
            if not cases:
                print(f"페이지 {page}: 더 이상 결과 없음.")
                break

            for case in cases:
                case_id = case.findtext('판례일련번호')
                if case_id:
                    case_ids.append(case_id)

            print(f"페이지 {page}: {len(cases)}개의 판례 수집 완료.")
        
        except Exception as e:
            print(f"페이지 {page} 처리 중 오류 발생: {e}")
            break

    return case_ids

def main():
    """
    메인 함수: 키워드와 파일 이름을 입력받아 판례 일련번호를 수집 및 저장.
    """
    keyword = input("검색 키워드를 입력하세요: ").strip()
    file_name = input("저장할 파일 이름을 입력하세요 (확장자 포함): ").strip()
    print(f"'{keyword}'에 대한 판례 데이터를 수집 중...")

    try:
        case_ids = get_case_ids_by_keyword(keyword, max_pages=1000)
        print(f"\n수집된 판례 일련번호 총 {len(case_ids)}개:")

        # 결과를 파일로 저장
        with open(file_name, "w", encoding="utf-8") as file:
            for case_id in case_ids:
                file.write(case_id + "\n")
        print(f"\n판례 일련번호가 '{file_name}'에 저장되었습니다.")

    except Exception as e:
        print(f"오류 발생: {e}")

if __name__ == "__main__":
    main()
