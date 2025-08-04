import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyPage({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다');
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div style={{ color: 'white' }}>
      <h1>{user?.nickname || user?.email}님의 마이페이지</h1>
      {/* 더 많은 정보, 편집 기능 등 여기에 추가 가능 */}
    </div>
  );
}
