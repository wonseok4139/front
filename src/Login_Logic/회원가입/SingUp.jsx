// src/Login_Logic/회원가입/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login.css';

export default function SignUp() {
  const navigate = useNavigate();
//=====================================================================
//const [상태변수, 상태변경함수] = useState(초기값);
//=====================================================================
  // 입력 상태값 관리
  const [nickname, setNickname] = useState('');//닉네임 생성
  const [email, setEmail] = useState('');//이메일 생성
  const [pw, setPw] = useState(''); //비밀번호 생성
  const [pwConfirm, setPwConfirm] = useState(''); //비밀번호 재확인 하는 곳
  const [error, setError] = useState('');//에로 확인 

  // 이메일 유효성 검사
  const validateEmail = (email) => //밸리데이트 이메일 유효성 검사
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 

  // 비밀번호 유효성 검사: 영문 + 숫자 + 특수문자 / 8~20자
  const validatePassword = (pw) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,20}$/.test(pw);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!nickname || !email || !pw || !pwConfirm) {
      return setError('모든 항목을 입력해주세요.');
    }

    if (!validateEmail(email)) {
      return setError('올바른 이메일 형식이 아닙니다.');
    }

    if (!validatePassword(pw)) {
      return setError('비밀번호는 8~20자, 영문+숫자+특수문자 조합이어야 합니다.');
    }

    if (pw !== pwConfirm) {
      return setError('비밀번호가 일치하지 않습니다.');
    }

    // ✅ 로컬 스토리지에 사용자 정보 임시 저장
    const newUser = { nickname, email, pw };
    localStorage.setItem('registeredUser', JSON.stringify(newUser));

    alert('✅ 회원가입이 완료되었습니다! 로그인 해주세요.');
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <div className="signup-container">{/* ✅ 전체 중앙 정렬 wrapper */}
      <div className="signup-box">{/* ✅ 내용 박스 */}
        <h2 className="titleWrap">회원가입</h2>

        <form onSubmit={handleSubmit}>
          <div className="inputTitle">닉네임</div>
          <input
            className="input"
            type="text"
            placeholder="홍길동"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <div className="inputTitle">이메일</div>
          <input
            className="input"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="inputTitle">비밀번호</div>
          <input
            className="input"
            type="password"
            placeholder="8~20자, 영문+숫자+특수문자"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />

          <div className="inputTitle">비밀번호 확인</div>
          <input
            className="input"
            type="password"
            placeholder="비밀번호 재입력"
            value={pwConfirm}
            onChange={(e) => setPwConfirm(e.target.value)}
          />

          {error && <div className="errorMessageWrap">{error}</div>}

          <button className="bottomButton" type="submit">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

/*
✅ 회원가입 후의 일반적인 흐름 (프론트엔드 관점)
회원정보 입력 완료 (이메일, 비밀번호, 닉네임 등)

회원가입 버튼 클릭 → 유효성 검사 통과

DB 또는 localStorage에 저장 (지금은 DB 대신 localStorage 쓴다고 가정)

회원가입 성공 알림 → 로그인 페이지로 이동 또는 자동 로그인

로그인 후 → 홈(/) 또는 마이페이지(/mypage) 이동
*/