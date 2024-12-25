import React, { useState } from 'react';
import axios from 'axios';
import { TextField, CircularProgress, Typography, Card, CardContent, Grid, Button, Box, Divider } from '@mui/material';
import './CaseSearch.css';

function CaseSearch() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [userStory, setUserStory] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const categoryToFileMap = {
        "고용": "1_embeddings.npz",
        "근로": "2_embeddings.npz",
        "교통사고": "3_embeddings.npz",
        "손해배상": "4_embeddings.npz",
        "채무": "5_embeddings.npz",
        "부동산": "6_embeddings.npz",
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleSearch = async () => {
        if (!selectedCategory || !userStory.trim()) {
            alert("카테고리와 사연을 모두 입력하세요.");
            return;
        }

        setIsSearching(true);
        setErrorMessage('');
        setSearchResults([]);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/similarity',
                {
                    fileName: categoryToFileMap[selectedCategory],
                    user_story: userStory
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            setSearchResults(response.data.results);
        } catch (error) {
            setErrorMessage("검색 중 오류가 발생했습니다.");
            console.error(error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f9fafb', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom align="center">판례 검색</Typography>

            <Box display="flex" justifyContent="center" mb={3}>
                {Object.keys(categoryToFileMap).map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'contained' : 'outlined'}
                        sx={{ margin: 1, borderRadius: '20px' }}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </Button>
                ))}
            </Box>

            <TextField
                fullWidth
                label="사연을 입력하세요. (최대 500자)"
                variant="outlined"
                value={userStory}
                onChange={(e) => setUserStory(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{ marginBottom: 2 }}
            />

            {isSearching ? (
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <CircularProgress />
                    <Typography sx={{ marginTop: 2 }}>검색 중입니다...</Typography>
                </Box>
            ) : errorMessage ? (
                <Typography color="error" align="center">{errorMessage}</Typography>
            ) : (
                <Grid container spacing={2} marginTop={2}>
                    {searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                            <Grid item xs={12} key={index}>
                                <Card variant="outlined" sx={{ borderRadius: '12px', boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>{result.case_name}</Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>{result.summary}</Typography>
                                        <Divider sx={{ marginY: 1 }} />
                                        <Typography variant="body2">선고일자: {result.date}</Typography>
                                        <Typography variant="body2">유사도율: {(result.similarity).toFixed(2)}%</Typography>
                                        <Button
                                            href={result.link}
                                            target="_blank"
                                            variant="contained"
                                            sx={{ marginTop: 2, borderRadius: '8px' }}
                                        >
                                            판례 보기
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography align="center">검색 결과가 없습니다.</Typography>
                    )}
                </Grid>
            )}
        </Box>
    );
}

export default CaseSearch;
