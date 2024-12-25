import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

function Community() {
    const [posts, setPosts] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newImage, setNewImage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false); // 다이얼로그 상태 관리

    // 다이얼로그 열기
    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    // 다이얼로그 닫기
    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    // 게시물 추가 핸들러
    const handleAddPost = () => {
        const newPost = {
            id: posts.length + 1,
            title: newTitle,
            content: newContent,
            author: newAuthor,
            views: 0,
            likes: 0,
            comments: 0,
            image: newImage,
        };
        setPosts([newPost, ...posts]);
        setNewTitle('');
        setNewContent('');
        setNewAuthor('');
        setNewImage('');
        handleDialogClose(); // 작성 후 다이얼로그 닫기
    };

    return (
        <Box sx={{ padding: '20px', backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
            {/* 커뮤니티 제목 */}
            <Typography variant="h4" fontWeight="bold" mb={3} color="#333">
                커뮤니티
            </Typography>

            {/* 게시물 작성 버튼 */}
            <Box display="flex" justifyContent="flex-end" mb={3}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: '8px', padding: '10px 20px' }}
                    onClick={handleDialogOpen}
                >
                    게시물 작성
                </Button>
            </Box>

            {/* 게시물 작성 다이얼로그 */}
            <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>게시물 작성</DialogTitle>
                <DialogContent>
                    <DialogContentText>새로운 게시물을 작성해주세요.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="제목"
                        fullWidth
                        variant="outlined"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="작성자"
                        fullWidth
                        variant="outlined"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="내용"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="이미지 URL (선택)"
                        fullWidth
                        variant="outlined"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        취소
                    </Button>
                    <Button onClick={handleAddPost} variant="contained" color="primary">
                        작성
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 게시물 리스트 */}
            <Grid container spacing={3}>
                {posts.length === 0 ? (
                    <Typography sx={{ width: '100%', textAlign: 'center', color: '#666' }}>
                        작성된 게시물이 없습니다.
                    </Typography>
                ) : (
                    posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <Card sx={{ boxShadow: 3, borderRadius: '12px' }}>
                                {post.image && (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={post.image}
                                        alt="게시물 이미지"
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold" mb={1}>
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        작성자: {post.author}
                                    </Typography>
                                    <Typography variant="body1" mt={1}>
                                        {post.content}
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" mt={2} color="textSecondary">
                                        <Typography variant="body2">조회수: {post.views}</Typography>
                                        <Typography variant="body2">좋아요: {post.likes}</Typography>
                                        <Typography variant="body2">댓글수: {post.comments}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
}

export default Community;
