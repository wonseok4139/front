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
import KakaoCallback from './Login_Logic/카카오로그인/KakaoCallback.jsx';
import Footer from './components/Footer/Footer.jsx'; 
import SingUp from './Login_Logic/회원가입/SingUp.jsx';
import MyPage from './auth/MyPage.jsx';
// src/App.js
import Notice from './pages/notice/Notice.jsx';
import PostForm from './pages/notice/PostForm.jsx';
import EditPostForm from './pages/notice/EditPostForm.jsx';
import PostDetail from './pages/notice/PostDetail.jsx';


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
              <Route path="/" element={<Home />} /> {/* 홈 */}
              <Route path="/history" element={<History />} /> {/* 경력 */}
              <Route path="/program" element={<Program />} /> {/* 프로그램 */}
              <Route path="/place" element={<Place />} /> {/* 장소 */}
              <Route path="/reservation" element={<Reservation />} /> {/* 예약 */}
              <Route path="/video" element={<Video />} /> {/* 영상+좋아요+싫어요 */}
              <Route path="/contact" element={<Contact />} /> {/* 연락 */}
              <Route path="/notice" element={<Notice />} /> {/* 게시판 */}
              <Route path="/write" element={<PostForm />} /> {/* 게시글 작성 */}
              <Route path="/edit/:id" element={<EditPostForm />} />{/* 게시글 수정 */}
              <Route path="/board/:id" element={<PostDetail />} />{/* 게시글 상세보기 목록*/}
              <Route path="/login" element={<LoginMain user={user} setUser={setUser} />} /> {/* 로그인 집합소 */}
              <Route path="/kakao/callback" element={<KakaoCallback setUser={setUser} />} /> {/* 카카오 로그인 */}
              <Route path="/logout" element={<Logout />} /> {/* 로그아웃 */}
              <Route path="/signup" element={<SingUp />} /> {/* 회원가입 */}
              <Route path="/mypage" element={<MyPage user={user} />} /> {/* 마이페이지 */}
    {/* <Route path="/review" element={<ReviewPage />} /> */}
            </Routes>
          </main>

          <Footer /> 
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
