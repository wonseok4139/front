import React, { useState, useEffect } from 'react';
import './Notice.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Notice() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // 게시글 목록을 가져오는 함수
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/boards');
      setPosts(response.data);
    } catch (error) {
      console.error("게시글을 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 게시글 목록을 불러옵니다.
  useEffect(() => {
    fetchPosts();
  }, []);

  // 게시글 삭제 처리 함수
  const handleDelete = async (postId) => {
    // TODO: window.confirm 대신 사용자 정의 모달 UI를 사용해야 합니다.
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:8000/api/boards/${postId}`);
        // TODO: alert 대신 사용자 정의 모달 UI를 사용해야 합니다.
        alert('게시글이 삭제되었습니다.');
        // 삭제된 게시글을 목록에서 제거하여 UI를 업데이트합니다.
        setPosts(posts.filter(post => post.id !== postId));
      } catch (error) {
        console.error("게시글 삭제 중 오류가 발생했습니다:", error);
        // TODO: alert 대신 사용자 정의 모달 UI를 사용해야 합니다.
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  // 게시글 수정 페이지로 이동하는 함수
  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  // 게시글 상세 페이지로 이동하는 함수 (제목 클릭 시)
  const handleTitleClick = (postId) => {
    navigate(`/board/${postId}`); // '/board/{id}' 경로로 이동합니다.
  };

  return (
    <div className="notice-container">
      <h2>게시판 목록</h2>
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
                {/* 제목 클릭 시 handleTitleClick 함수를 호출하여 상세 페이지로 이동 */}
                <span
                  className="post-title-link"
                  onClick={() => handleTitleClick(post.id)}
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} // 클릭 가능한 것처럼 보이도록 스타일 추가
                >
                  {post.title}
                </span>
              </td>
              <td>{post.author}</td>
              <td>
                {/* createDate가 존재하면 로컬 시간으로 포맷, 없으면 '날짜 미정' */}
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
        {/* "글쓰기" 버튼 클릭 시 작성 페이지로 이동 */}
        <button className="write-button" onClick={() => navigate('/write')}>
          글쓰기
        </button>
      </div>
    </div>
  );
}

export default Notice;