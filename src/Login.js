import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('로그인 시도:', { username, password });
    };

    return (
        <div className="login-container">
            <h1>로그인</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="username">아이디</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="아이디를 입력하세요"
                    required
                />
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호를 입력하세요"
                    required
                />
                <button type="submit" className="login-button">로그인</button>
                <div className="find-account">
                    <a href="/find-account">계정 찾기</a>
                </div>
                <div className="signup-section">
                    <p>회원이 아니신가요?</p>
                    <button className="signup-button">회원가입</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
