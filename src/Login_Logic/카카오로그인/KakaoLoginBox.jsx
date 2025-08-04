import '../login.css';

const KakaoLoginBox = () => {
  const loginWithKakao = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('fa98f93d60ff1e50bf35bdf87b46eeeb');
    }

    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/kakao/callback',
    });
  };

  return (
  
    <button className="kakao-button" onClick={loginWithKakao}>
    </button>

  );
};

export default KakaoLoginBox;
