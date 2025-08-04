import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import '../src/Appstyle/App.css'; // 스타일
import Home from './pages/Home/Home.jsx';
import Place from './pages/Place/Place.jsx';
import Reservation from './pages/Reservation/Reservation.jsx';
import Program from './pages/Program/Program.jsx';
import History from './pages/History/History.jsx';
import Header from './components/Header/Header.jsx';
import Video from './pages/Video/Video.jsx';
import Contact from './pages/Contact/Contact.jsx';
import LoginMain from './auth/LoginMain';
import Logout from './Login_Logic/Logout';
import KakaoLoginBox from './Login_Logic/카카오로그인/KakaoLoginBox.jsx';
import KakaoCallback from './Login_Logic/카카오로그인/KakaoCallback.jsx';
import Footer from './components/Footer/Footer.jsx'; 
import SingUp from './Login_Logic/회원가입/SingUp.jsx';
import MyPage from './auth/MyPage.jsx';
// src/App.js
import ReviewPage from './Review/ReviewPage/ReviewPage.jsx';


export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');// 이게 콜백 함수인가봐 ㅋ
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId="241778158287-n41tf9496r5bbjd5dve0611qrghuipkh.apps.googleusercontent.com">
      <BrowserRouter>
        <div className="app-wrapper">
          <Header user={user} setUser={setUser} />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/program" element={<Program />} />
              <Route path="/place" element={<Place />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/video" element={<Video />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LoginMain user={user} setUser={setUser} />} />
              <Route path="/kakao/callback" element={<KakaoCallback setUser={setUser} />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/signup" element={<SingUp />} />
              <Route path="/mypage" element={<MyPage user={user} />} />
    <Route path="/review" element={<ReviewPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
