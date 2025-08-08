import React, { useState, useEffect } from 'react';
import './Notice.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Notice() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // 게시글 목록을 가져오는 함수 
  const fetchPosts = async (search = '') => {
    try {
      // 백엔드 API에 GET 요청을 보낼 때 검색어가 있으면 파라미터로 추가합니다.
      const response = await axios.get(`http://localhost:8000/api/boards`, {
        params: { search: search }
      });
      setPosts(response.data);
    } catch (error) {
      console.error("게시글을 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 게시글 목록을 불러옵니다.
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:8000/api/boards/${postId}`);
        alert('게시글이 삭제되었습니다.');
        // 삭제 후 목록을 다시 불러옵니다.
        fetchPosts();
      } catch (error) {
        console.error("게시글 삭제 중 오류가 발생했습니다:", error);
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const handleTitleClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 검색 버튼 클릭 시 또는 엔터 키 입력 시 실행되는 함수
  const handleSearch = () => {
    fetchPosts(searchTerm); // 백엔드 API로 검색어를 전달합니다.
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="notice-container">
      <h2>게시판 목록</h2>
      <div className="search-box">
        <input 
          type="text" 
          onChange={handleSearchChange} 
          onKeyDown={handleKeyDown}
          className="SearchBoard" 
          placeholder='여기에 입력하시오...' 
          value={searchTerm}
        />
        <button 
          type="button" 
          onClick={handleSearch} 
          className="SearchBoardButton">
          찾기
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>
                <span
                  className="post-title-link"
                  onClick={() => handleTitleClick(post.id)}
                >
                  {post.title}
                </span>
              </td>
              <td>{post.author}</td>
              <td>
                {post.createDate
                  ? new Date(post.createDate).toLocaleString()
                  : '날짜 미정'}
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(post.id)}
                >
                  수정
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(post.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button className="write-button" onClick={() => navigate('/write')}>
          글쓰기
        </button>
      </div>
    </div>
  );
}

export default Notice;