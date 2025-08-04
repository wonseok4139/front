// src/Login_Logic/구글로그인/GoogleAuthBox.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import '../login.css';

export default function GoogleAuthBox({ setUser }) {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const loginUser = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    localStorage.setItem('user', JSON.stringify(loginUser));
    setUser(loginUser);
    alert('✅ 구글 로그인 성공!');
    window.location.href = '/';
  };

  const handleError = () => {
    alert('❌ 구글 로그인 실패');
  };

  return (

    <div className="login-social-wrap">
        <div className="social-button">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError}   width="100%" 
      border-radius= "20%"
      />
      </div>
    </div>
  
  );
}
