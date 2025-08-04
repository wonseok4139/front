import FirstLogin from '../Login_Logic/일반로그인/FirstLogin';
import GoogleAuthBox from '../Login_Logic/구글로그인/GoogleAuthBox';
import KakaoLoginBox from '../Login_Logic/카카오로그인/KakaoLoginBox';
import '../Login_Logic/login.css';

export default function LoginMain({ setUser }) {
  return (
    <div className="page">
      <div className="titleWrap">로그인</div>

      <div className="contentWrap">
        {/* 일반 로그인 입력창 */}
        <FirstLogin setUser={setUser} />

        {/* 소셜 로그인 버튼들 */}
        <div className="social-login-wrap">
          <GoogleAuthBox setUser={setUser} />
          <KakaoLoginBox />
        </div>
      </div>
    </div>
  );
}
