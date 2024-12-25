import re
import requests
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor

def get_case_detail(case_id, oc="kroad0129"):
    """
    판례 상세 내용을 API로 가져옵니다.
    """
    url = "http://www.law.go.kr/DRF/lawService.do"
    params = {
        "OC": oc,
        "target": "prec",
        "type": "XML",
        "ID": case_id
    }
    try:
        response = requests.get(url, params=params, timeout=10)  # 타임아웃 설정
        if response.status_code == 200:
            return case_id, response.content
        else:
            print(f"판례 {case_id} 요청 실패: {response.status_code}")
            return case_id, None
    except Exception as e:
        print(f"판례 {case_id} 요청 중 오류 발생: {e}")
        return case_id, None

def parse_case_detail(xml_content):
    """
    판례 상세 데이터를 XML에서 파싱하여 반환.
    """
    try:
        tree = ET.ElementTree(ET.fromstring(xml_content))
        root = tree.getroot()

        # 필요한 데이터 결합
        case_detail = {
            "판례정보일련번호": root.findtext('판례정보일련번호', ''),
            "판례내용": root.findtext('판례내용', '')
        }

        for key in case_detail:
            if case_detail[key]:  # 값이 있는 경우만 처리
                case_detail[key] = re.sub(r'<br\s*/?>', '', case_detail[key])  # <br/> 또는 <br> 제거
                case_detail[key] = re.sub(r'[^\w\s,.]', '', case_detail[key])  # 특수문자 제거 (., 제외)
                case_detail[key] = re.sub(r'\s{2,}', ' ', case_detail[key])    # 과도한 공백 제거

        # 하나의 텍스트로 결합
        combined_text = (
            f"판례정보일련번호: {case_detail['판례정보일련번호']}\n"
            f"판례내용: {case_detail['판례내용']}"
        )
        return combined_text

    except Exception as e:
        print(f"XML 파싱 오류 발생: {e}")
        return None

def save_case_details_parallel(case_ids_file, output_file, max_workers=5):
    """
    병렬 처리를 이용해 판례 데이터를 저장.
    """
    try:
        with open(case_ids_file, "r", encoding="utf-8") as ids_file:
            case_ids = [line.strip() for line in ids_file.readlines()]

        results = []
        print(f"{len(case_ids)}개의 판례 데이터를 병렬 처리 중...")

        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            future_to_case_id = {executor.submit(get_case_detail, case_id): case_id for case_id in case_ids}
            for future in future_to_case_id:
                case_id, xml_content = future.result()
                if xml_content:
                    case_text = parse_case_detail(xml_content)
                    if case_text:
                        results.append(case_text)
                        print(f"판례 {case_id} 처리 완료.")
                    else:
                        print(f"판례 {case_id} 파싱 실패.")
                else:
                    print(f"판례 {case_id} 요청 실패.")

        with open(output_file, "w", encoding="utf-8") as out_file:
            for case_text in results:
                out_file.write(case_text + "\n\n")  # 판례 간 빈 줄 추가

    except Exception as e:
        print(f"오류 발생: {e}")

def main():
    """
    메인 함수: 병렬 처리로 판례 데이터를 추출하여 저장.
    """
    case_ids_file = input("판례 ID 파일 이름을 입력하세요 (예: case_ids.txt): ").strip()
    output_file = input("저장할 파일 이름을 입력하세요 (예: case_details.txt): ").strip()

    print("\n판례 데이터를 병렬 처리 중...")
    save_case_details_parallel(case_ids_file, output_file)
    print(f"\n판례 데이터가 '{output_file}'에 저장되었습니다.")

if __name__ == "__main__":
    main()
