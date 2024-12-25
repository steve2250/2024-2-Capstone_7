import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Tabs, Tab } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginClick = () => {
        navigate('/login'); // 로그인 페이지로 이동
    };

    const handleLogoClick = () => {
        navigate('/'); // 첫 화면으로 이동
    };

    const tabRoutes = [
        { label: '법률검색', path: '/law-search' },
        { label: '판례검색', path: '/case-search' },
        { label: '커뮤니티', path: '/community' },
    ];

    return (
        <AppBar position="sticky" elevation={3} sx={{ background: 'linear-gradient(135deg, #4f6dff, #5352ed)' }}>
            <Toolbar>
                {/* 로고 섹션 */}
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={handleLogoClick}
                >
                    눈코
                </Typography>

                {/* 탭 메뉴 */}
                <Tabs
                    value={location.pathname}
                    textColor="inherit"
                    indicatorColor="secondary"
                    sx={{ flexGrow: 2 }}
                >
                    {tabRoutes.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            value={tab.path}
                            component={Link}
                            to={tab.path}
                            sx={{
                                textTransform: 'none',
                                fontWeight: location.pathname === tab.path ? 'bold' : 'normal',
                                color: 'white',
                            }}
                        />
                    ))}
                </Tabs>

                {/* 로그인 버튼 */}
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #70a1ff, #5352ed)',
                        textTransform: 'none',
                        fontWeight: 'bold',
                    }}
                    onClick={handleLoginClick}
                >
                    로그인
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
