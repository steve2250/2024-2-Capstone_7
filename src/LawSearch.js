import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
    Divider,
    Container,
    Collapse
} from '@mui/material';

function LawSearch() {
    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [breadcrumb, setBreadcrumb] = useState([]);

    const categories = [
        { id: 1, name: '부동산' },
        { id: 2, name: '근로/노동' },
        { id: 3, name: '교통/운전' },
        { id: 4, name: '금융/금전' },
    ];

    const subCategories = {
        1: [
            { id: 'A', name: '공공임대주택 입주자' },
            { id: 'B', name: '이사' },
            { id: 'C', name: '전세사기 피해자 지원' },
        ],
        2: [
            { id: 'D', name: '기간제 및 단시간 근로자' },
            { id: 'E', name: '임금' },
            { id: 'F', name: '실업급여 및 부당해고' },
            { id: 'G', name: '청년취업지원' },
        ],
        3: [
            { id: 'H', name: '교통/운전' },
            { id: 'I', name: '운전면허' },
            { id: 'J', name: '개인형 이동장치' },
            { id: 'K', name: '자동차 구입 및 관리' },
        ],
        4: [
            { id: 'L', name: '소비자 보호 ' },
            { id: 'M', name: '보증' },
            { id: 'N', name: '보험계약' },
            { id: 'O', name: '금전거래' },
        ],
    };

    const detailCategories = {
        A: [
            { 
                title: '공공임대주택 입주를 위한 확인 사항', 
                details: '공공임대주택의 개념 및 종류, 입주 신청 전 확인사항',
                laws: [
                    { name: '공공주택 특별법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '공공주택 특별법 시행규칙,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95+%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&languageType=KO&joNo=&paras=1#' },
                    { name: '주택공급에 관한 규칙,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EC%A3%BC%ED%83%9D%EA%B3%B5%EA%B8%89%EC%97%90+%EA%B4%80%ED%95%9C+%EA%B7%9C%EC%B9%99&languageType=KO&joNo=&paras=1#' },
                    { name: '공공주택 입주자 보유 자산 관련 업무처리기준', url: 'https://www.law.go.kr/%ED%96%89%EC%A0%95%EA%B7%9C%EC%B9%99/%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D%20%EC%9E%85%EC%A3%BC%EC%9E%90%20%EB%B3%B4%EC%9C%A0%20%EC%9E%90%EC%82%B0%20%EA%B4%80%EB%A0%A8%20%EC%97%85%EB%AC%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%A4%80' }
                ]
            },
            { 
                title: '행복주택 입주하기', 
                details: '임대절차 확인하기, 유형별 입주자격',
                laws: [
                    { name: '공공주택 특별법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '공공주택 특별법 시행규칙', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95+%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&languageType=KO&joNo=&paras=1#' }
                ]
            },
            { 
                title: '통합공공임대주택 입주하기', 
                details: '임대절차 확인하기, 공급별 입주자격',
                laws: [
                    { name: '공공주택 특별법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '공공주택 특별법 시행규칙', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95+%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&languageType=KO&joNo=&paras=1#' }
                ]
            },
            { 
                title: '장기전세임대주택 입주하기', 
                details: '임대절차 확인하기, 공급별 입주자격',
                laws: [
                    { name: '공공주택 특별법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '공공주택 특별법 시행규칙', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95+%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&languageType=KO&joNo=&paras=1#' }
                ]
            },
            { 
                title: '분양전환공공임대주택 입주하기', 
                details: '임대절차 확인하기, 유형별 입주자격',
                laws: [
                    { name: '공공주택 특별법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '공공주택 특별법 시행규칙', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95+%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&languageType=KO&joNo=&paras=1#' }
                ]
            },
            { 
                title: '임대차계약 체결', 
                details: '임대차계약서 작성 및 자금 지원',
                laws: [
                    { name: '공공주택 특별법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '공공주택 특별법 시행규칙', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95+%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&languageType=KO&joNo=&paras=1#' }
                ]
            },
            { 
                title: '입주 생활', 
                details: '관리비, 사용료 납부 및 임차인대표회 구성',
                laws: [
                    { name: '공공주택 특별법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '공공주택 특별법 시행규칙,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95+%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&languageType=KO&joNo=&paras=1#' },
                    { name: '민간임대주택에 관한 특별법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EB%AF%BC%EA%B0%84%EC%9E%84%EB%8C%80%EC%A3%BC%ED%83%9D%EC%97%90+%EA%B4%80%ED%95%9C+%ED%8A%B9%EB%B3%84%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '민간임대주택에 관한 특별법 시행,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EB%AF%BC%EA%B0%84%EC%9E%84%EB%8C%80%EC%A3%BC%ED%83%9D%EC%97%90+%EA%B4%80%ED%95%9C+%ED%8A%B9%EB%B3%84%EB%B2%95+%EC%8B%9C%ED%96%89&languageType=KO&joNo=&paras=1#' },
                    { name: '민간임대주택에 관한 특별법 시행규칙', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EB%AF%BC%EA%B0%84%EC%9E%84%EB%8C%80%EC%A3%BC%ED%83%9D%EC%97%90+%EA%B4%80%ED%95%9C+%ED%8A%B9%EB%B3%84%EB%B2%95+%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&languageType=KO&joNo=&paras=1#' }
                ]
            },
            { 
                title: '임대차계약 종료', 
                details: '임대차계약의 재계약 거절 등',
                laws: [
                    { name: '공공주택 특별법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '공공주택 특별법 시행령,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95+%EC%8B%9C%ED%96%89%EB%A0%B9&languageType=KO&joNo=&paras=1#' },
                    { name: '공공주택 특별법 시행규칙', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EA%B3%B5%EC%A3%BC%ED%83%9D+%ED%8A%B9%EB%B3%84%EB%B2%95+%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&languageType=KO&joNo=&paras=1#' },
                    
                ]
            },
        ],
        B: [
            { 
                title: '집 내놓기', 
                details: '집 내놓기 및 비용회수하기',
                laws: [
                    { name: '주택임대차보호법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EC%A3%BC%ED%83%9D%EC%9E%84%EB%8C%80%EC%B0%A8%EB%B3%B4%ED%98%B8%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '공인중개사법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EC%9D%B8%EC%A4%91%EA%B0%9C%EC%82%AC%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '부동산 거래신고 등에 관한 법률,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EB%B6%80%EB%8F%99%EC%82%B0+%EA%B1%B0%EB%9E%98%EC%8B%A0%EA%B3%A0+%EB%93%B1%EC%97%90+%EA%B4%80%ED%95%9C+%EB%B2%95%EB%A5%A0&languageType=KO&joNo=&paras=1#' },
                    { name: '공동주택 관리법', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EB%8F%99%EC%A3%BC%ED%83%9D+%EA%B4%80%EB%A6%AC%EB%B2%95&languageType=KO&joNo=&paras=1#' }
                ]
            },
            { 
                title: '계약서 작성하기', 
                details: '중개보수 확인하기, 계약서 작성하기, 임대차 계약에 따른 권리와 의무 확인하기',
                laws: [
                    { name: '공인중개사법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EC%9D%B8%EC%A4%91%EA%B0%9C%EC%82%AC%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '민법', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EB%AF%BC%EB%B2%95&languageType=KO&joNo=&paras=1#' }
                ]
            },
            { 
                title: '각종 요금 정산하기', 
                details: '전기ㆍ가스 및 상하수도요금 정산하기, 선수관리비 및 장기수선충당금 정산하기',
                laws: [
                    { name: '공동주택관리법', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EB%8F%99%EC%A3%BC%ED%83%9D%EA%B4%80%EB%A6%AC%EB%B2%95&languageType=KO&joNo=&paras=1#' }
                ]
            },
            { 
                title: '전입신고하기', 
                details: '전입신고하기',
                laws: [
                    { name: '주민등록법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EC%A3%BC%EB%AF%BC%EB%93%B1%EB%A1%9D%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '주택임대차보호법', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EC%A3%BC%ED%83%9D%EC%9E%84%EB%8C%80%EC%B0%A8%EB%B3%B4%ED%98%B8%EB%B2%95&languageType=KO&joNo=&paras=1#' }
                ]
            },
        ],
        C: [
            { 
                title: '전세사기 피해 인정 받기', 
                details: '전세사기피해자 유형 알아보기',
                laws: [
                    { name: '주택임대차보호법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EC%A3%BC%ED%83%9D%EC%9E%84%EB%8C%80%EC%B0%A8%EB%B3%B4%ED%98%B8%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '전세사기피해자 지원 및 주거안정에 관한 특별법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EC%A0%84%EC%84%B8%EC%82%AC%EA%B8%B0%ED%94%BC%ED%95%B4%EC%9E%90+%EC%A7%80%EC%9B%90+%EB%B0%8F+%EC%A3%BC%EA%B1%B0%EC%95%88%EC%A0%95%EC%97%90+%EA%B4%80%ED%95%9C+%ED%8A%B9%EB%B3%84%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '긴급복지지원법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B8%B4%EA%B8%89%EB%B3%B5%EC%A7%80%EC%A7%80%EC%9B%90%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '전세사기피해자법 시행규칙', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EC%A0%84%EC%84%B8%EC%82%AC%EA%B8%B0%ED%94%BC%ED%95%B4%EC%9E%90+%EC%A7%80%EC%9B%90+%EB%B0%8F+%EC%A3%BC%EA%B1%B0%EC%95%88%EC%A0%95%EC%97%90+%EA%B4%80%ED%95%9C+%ED%8A%B9%EB%B3%84%EB%B2%95+%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&languageType=KO&joNo=&paras=1#' }
                ]
            },
            { 
                title: '전세피해지원 방안', 
                details: '법률지원, 경제적 지원, 주거지원 등',
                laws: [
                    { name: '공인중개사법,', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EC%9D%B8%EC%A4%91%EA%B0%9C%EC%82%AC%EB%B2%95&languageType=KO&joNo=&paras=1#' },
                    { name: '민법', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EB%AF%BC%EB%B2%95&languageType=KO&joNo=&paras=1#' }
                ]
            },
            { 
                title: '전세 계약 시 유의사항', 
                details: '계약 전 후 그리고 종료 후 유의사항까지지',
                laws: [
                    { name: '공동주택관리법', url: 'https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=&lsNm=%EA%B3%B5%EB%8F%99%EC%A3%BC%ED%83%9D%EA%B4%80%EB%A6%AC%EB%B2%95&languageType=KO&joNo=&paras=1#' }
                ]
            },
            
        ],
    };

    const handleCategorySelect = (categoryId, categoryName) => {
        setCategory(categoryId);
        setSubCategory(null);
        setSelectedDetail(null);
        setBreadcrumb([{ level: '대분류', name: categoryName }]);
    };

    const handleSubCategorySelect = (subCategoryId, subCategoryName) => {
        setSubCategory(subCategoryId);
        setSelectedDetail(null);
        setBreadcrumb((prev) => prev.slice(0, 1).concat({ level: '중분류', name: subCategoryName }));
    };

    const handleDetailSelect = (detail) => {
        setSelectedDetail(detail);
        setBreadcrumb((prev) => prev.slice(0, 2).concat({ level: '소분류', name: detail.title }));
    };

    const handleBreadcrumbClick = (index) => {
        if (index === 0) {
            setCategory(null);
            setSubCategory(null);
            setSelectedDetail(null);
            setBreadcrumb([]);
        } else if (index === 1) {
            setSubCategory(null);
            setSelectedDetail(null);
            setBreadcrumb(breadcrumb.slice(0, 1));
        } else if (index === 2) {
            setSelectedDetail(null);
            setBreadcrumb(breadcrumb.slice(0, 2));
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h4" fontWeight="bold" mb={3} color="#333">
                    생활 법령 검색
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Box mb={3}>
                    {breadcrumb.map((item, index) => (
                        <Typography
                            key={index}
                            variant="subtitle1"
                            display="inline"
                            onClick={() => handleBreadcrumbClick(index)}
                            sx={{
                                cursor: 'pointer',
                                color: '#1976d2',
                                '&:hover': { 
                                    textDecoration: 'underline',
                                    color: '#1565c0',
                                    transition: 'color 0.3s ease-in-out',
                                } 
                            }}
                        >
                            {item.name} {index < breadcrumb.length - 1 ? ' > ' : ''}
                        </Typography>
                    ))}
                </Box>

                <Collapse in={!category} timeout={500}>
                    <Grid container spacing={3} justifyContent="center">
                        {categories.map((cat) => (
                            <Grid item xs={12} sm={6} md={3} key={cat.id}>
                                <Card sx={{ boxShadow: 3, borderRadius: '12px', cursor: 'pointer', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    onClick={() => handleCategorySelect(cat.id, cat.name)}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold" align="center">
                                            {cat.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Collapse>

                <Collapse in={!!category && !subCategory && !selectedDetail} timeout={500}>
                    <Grid container spacing={3} justifyContent="center">
                        {subCategories[category]?.map((sub) => (
                            <Grid item xs={12} sm={6} md={3} key={sub.id}>
                                <Card sx={{ boxShadow: 3, borderRadius: '12px', cursor: 'pointer', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    onClick={() => handleSubCategorySelect(sub.id, sub.name)}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold" align="center">
                                            {sub.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Collapse>

                <Collapse in={!!subCategory && !selectedDetail} timeout={500}>
                    <Grid container spacing={3} justifyContent="center">
                        {detailCategories[subCategory]?.map((item, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card sx={{ boxShadow: 3, borderRadius: '12px', cursor: 'pointer', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    onClick={() => handleDetailSelect(item)}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold" align="center">
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Collapse>

                <Collapse in={!!selectedDetail} timeout={500}>
                    <Box sx={{ mt: 3, p: 3, boxShadow: 3, borderRadius: '12px', backgroundColor: 'white' }}>
                        <Typography variant="h5" fontWeight="bold" mb={2}>
                            {selectedDetail?.title}
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            {selectedDetail?.details}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            관련 법령:{' '}
                            {selectedDetail?.laws.map((law, index) => (
                                <a 
                                    key={index}
                                    href={law.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', color: '#1976d2', marginRight: '8px' }}
                                >
                                    {law.name}
                                </a>
                            ))}
                        </Typography>
                    </Box>
                </Collapse>
            </Paper>
        </Container>
    );
}

export default LawSearch;