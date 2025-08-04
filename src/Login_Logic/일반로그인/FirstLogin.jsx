// src/Login_Logic/일반로그인/FirstLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const USER = {
  email: 'qwer@naver.com',
  pw: 'dnjstjr1!!',
};

export default function FirstLogin({ setUser }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setNotAllow(!(emailValid && pwValid));
  }, [emailValid, pwValid]);

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(regex.test(value));
  };

  const handlePw = (e) => {
    const value = e.target.value;
    setPw(value);
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,20}$/;
    setPwValid(regex.test(value));
  };

  const onClickConfirmButton = () => {
    if (email === USER.email && pw === USER.pw) {
      const loginUser = { name: '일반 사용자', email: USER.email };
      localStorage.setItem('user', JSON.stringify(loginUser));
      setUser(loginUser);
      alert('✅ 로그인 성공!');
      navigate('/');
    } else {
      alert('❌ 이메일 또는 비밀번호가 틀렸습니다.');
    }
  };

  return (
    <>

        <div className="inputTitle">이메일</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="example@email.com"
            value={email}
            onChange={handleEmail}
          />
        </div>
        {!emailValid && email && (
          <div className="errorMessageWrap">올바른 이메일 형식이 아닙니다.</div>
        )}

        <div className="inputTitle">비밀번호</div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="8~20자, 영문+숫자+특수문자"
            value={pw}
            onChange={handlePw}
          />
        </div>
        {!pwValid && pw && (
          <div className="errorMessageWrap">비밀번호 조건이 맞지 않습니다.</div>
        )}

        <button className="bottomButton" onClick={onClickConfirmButton} disabled={notAllow}>
          로그인
        </button>

    </>
  );
}
