// src/Login_Logic/카카오로그인/KakaoCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init('fa98f93d60ff1e50bf35bdf87b46eeeb');
      }

      try {
        const res = await window.Kakao.API.request({
          url: '/v2/user/me',
        });

        const userInfo = {
          email: res.kakao_account.email,
          nickname: res.kakao_account.profile.nickname,
          provider: 'kakao',
        };

        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
        navigate('/');
      } catch (error) {
        console.error('카카오 사용자 정보 요청 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
