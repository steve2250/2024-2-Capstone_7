import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Grid, Typography, Box } from '@mui/material';
import Navbar from './Navbar';
import CaseSearch from './CaseSearch';
import LawSearch from './LawSearch';
import Login from './Login';
import Community from './Community';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import './App.css';

// SaasAble 스타일 적용
const StyledButton = styled(Button)({
    borderRadius: '8px',
    padding: '10px 20px',
    textTransform: 'none',
    background: 'linear-gradient(135deg, #4F46E5, #6B21A8)',
    color: '#fff',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        background: 'linear-gradient(135deg, #4338CA, #5B21B6)',
        transform: 'scale(1.05)',
    },
});

const StyledCard = styled(Box)({
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    transition: 'all 0.3s ease-in-out',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    background: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)',
    '&:hover': {
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
        transform: 'scale(1.05)',
    },
});

function App() {
    const cards = [
        {
            title: '법령검색',
            description: '법령 정보를 빠르게 찾아보세요',
            linkText: '이동하기',
            linkUrl: '/law-search',
        },
        {
            title: '판례검색',
            description: '내 사연과 유사한 실제 판례를 알아보세요',
            linkText: '이동하기',
            linkUrl: '/case-search',
        },
        {
            title: '게시판',
            description: '다른 사람들과 고민을 나누고 법률 상담을 받아보세요',
            linkText: '이동하기',
            linkUrl: '/community',
        },
    ];

    return (
        <BrowserRouter>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Grid container spacing={4} justifyContent="center">
                                {cards.map((card, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <StyledCard>
                                            <Typography variant="h5" fontWeight="bold" mb={1} color="primary">
                                                {card.title}
                                            </Typography>
                                            <Typography variant="body2" mb={2} color="text.secondary">
                                                {card.description}
                                            </Typography>
                                            <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                                                <StyledButton href={card.linkUrl}>{card.linkText}</StyledButton>
                                            </Box>
                                        </StyledCard>
                                    </Grid>
                                ))}
                            </Grid>
                        }
                    />
                    <Route path="/case-search" element={<CaseSearch />} />
                    <Route path="/law-search" element={<LawSearch />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
