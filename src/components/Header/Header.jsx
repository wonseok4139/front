// src/components/Header/Header.jsx

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import './navbar.css';
import logo from '../../images/LOGO.jpg'
const Header = ({ user, setUser }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();

  // ✅ 경로 이동할 때 메뉴 자동 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // ✅ 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };//이 조건은 총 세 가지의 조건이 모두 **참(true)**일 때만, 즉 세 가지 조건이 모두 만족될 때만 
    // 다음 코드를 실행하겠다는 뜻입니다.
    //3번째는="사용자가 클릭한 곳이 메뉴 창 안에 포함되어 있는가?"라는 뜻입니다.


    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

const handleSearchSubmit = (e) => {
  e.preventDefault();
  const keyword = searchKeyword.toLowerCase().trim();

  // 유사 키워드를 여러 개 포함시키는 방식
  const routeKeywords = {
    '/history': ['경력', '스펙', '학벌', '학교', '콩쿨', '유학', '대학교', '석사', '박사'],
    '/program': ['프로그램', '강의', '커리큘럼', '수업'],
    '/place': ['위치', '오시는 길', '주소', '찾아오시는길', '장소'],
    '/reservation': ['예약', 'book', '예약하기', '예약좀', '예약 좀요'],
    '/video': ['영상', '비디오', '공연', '무대'],
    '/contact': ['연락', '문의', '전화', 'contact'],
  };

  // 어떤 경로든 키워드가 포함되면 해당 경로로 이동
  for (const path in routeKeywords) {
    if (routeKeywords[path].some(k => keyword.includes(k))) {
      navigate(path);
      setSearchKeyword('');
      setMenuOpen(false);
      return;
    }
  }

  // 일치하는 게 없을 경우
  alert(`'${searchKeyword}'에 대한 페이지를 찾을 수 없습니다.`);
  navigate('/');
  setSearchKeyword('');
  setMenuOpen(false);
};


  return (
    <header className="header-container">
      <div className="header-wrap">
        <div className="header-left-wrap">
          <Link to="/" className="header-logo">
          <img src={logo} alt="로고" />
          </Link>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <ul ref={menuRef} className={`header-menu ${menuOpen ? 'open' : ''}`}>
            <li><Link className="header-nav-item" to="/history">경력</Link></li>
            <li><Link className="header-nav-item" to="/program">프로그램</Link></li>
            <li><Link className="header-nav-item" to="/place">위치</Link></li>
            <li><Link className="header-nav-item" to="/reservation">예약</Link></li>
            <li><Link className="header-nav-item" to="/video">영상</Link></li>
            <li><Link className="header-nav-item" to="/contact">연락</Link></li>
{/* ✨ 여기에 새로운 링크를 추가합니다 ✨ */}    
  <li><Link className="header-nav-item" to="/review">후기</Link></li>
{user ? (
  <>
    <li>
      <Link className="header-nav-item" to="/mypage">
        마이페이지
      </Link>
    </li>
    <li>
      <span className="header-nav-item">{user.nickname || user.email}님</span>
    </li>
    <li>
      <button className="header-nav-item logout-button" onClick={handleLogout}>
        로그아웃
      </button>
    </li>
  </>
) : (
  <>
    <li>
      <Link className="header-nav-item" to="/login">
        로그인
      </Link>
    </li>
    <li className="signup-message">
      아이디가 없으신가요? 👉 <Link to="/signup">회원가입</Link>
    </li>
  </>
)}
          </ul>
        </div>

        <form className="header-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="페이지 검색..."
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <button type="submit">검색</button>
        </form>
      </div>
    </header>
  );
};

export default Header;
