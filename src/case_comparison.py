import xml.etree.ElementTree as ET
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def parse_case_xml(xml_content):
    tree = ET.ElementTree(ET.fromstring(xml_content))
    cases = []
    for case in tree.iterfind('prec'):
        case_data = {
            '사건명': case.findtext('사건명', ''),
            '사건번호': case.findtext('사건번호', ''),
            '선고일자': case.findtext('선고일자', ''),
            '법원명': case.findtext('법원명', ''),
            '판례내용': case.findtext('판례내용', ''),
            '판례일련번호': case.findtext('판례일련번호', '')
        }
        cases.append(case_data)
    return cases

def calculate_similarity(user_story, case_list):
    user_story = user_story if user_story else ''  # None 방지
    documents = [user_story] + [case['판례내용'] if case['판례내용'] else '' for case in case_list]

    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(documents)

    user_story_vector = tfidf_matrix[0:1]
    case_vectors = tfidf_matrix[1:]

    similarities = cosine_similarity(user_story_vector, case_vectors).flatten()

    return similarities

def find_top_similar_cases(user_story, cases, top_n=5):
    similarities = calculate_similarity(user_story, cases)
    top_indices = similarities.argsort()[-top_n:][::-1]  # 상위 top_n개의 인덱스를 역순으로 정렬

    top_cases = [(cases[i], similarities[i]) for i in top_indices]
    return top_cases