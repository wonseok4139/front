import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('email');
    setUser(null); // 상태 초기화
    navigate('/');
  }, [navigate, setUser]);

  return null;
}
