// src/pages/ReviewPage/ReviewPage.jsx
import React, { useState, useEffect } from 'react';
import ReviewForm from '../../Review/ReviewForm/ReviewForm.jsx'; // 경로 확인 필요!
import ReviewList from '../../Review/ReviewList/ReviewList.jsx'; // 경로 확인 필요!
import './ReviewPage.css'; // 페이지 전체 스타일 (나중에 만들 거예요!)

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]); // 모든 후기 데이터를 저장할 상태

  // 컴포넌트가 처음 마운트될 때 (페이지가 열릴 때) JSON Server에서 후기를 가져옵니다.
  useEffect(() => {
    fetchReviews(); // 후기 데이터를 가져오는 함수 호출
  }, []); // 빈 배열은 컴포넌트가 처음 로드될 때 한 번만 실행되도록 합니다.

  // JSON Server에서 후기 데이터를 가져오는 비동기 함수
  const fetchReviews = async () => {
    try {
      // JSON Server의 reviews 엔드포인트로 요청 보냄
      const response = await fetch('http://localhost:3001/reviews');
      if (!response.ok) { // 응답이 성공적이지 않으면 에러 발생
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // 응답을 JSON 형태로 파싱
      setReviews(data); // 가져온 데이터를 reviews 상태에 저장
    } catch (error) {
      console.error('후기 데이터를 가져오는 중 오류 발생:', error);
      alert('후기 데이터를 불러오지 못했습니다. 서버를 확인해주세요.');
    }
  };

  // ReviewForm으로부터 새 후기 데이터를 받아서 JSON Server에 저장하는 함수
  const handleAddReview = async (newReview) => {
    try {
      const response = await fetch('http://localhost:3001/reviews', {
        method: 'POST', // 새로운 데이터를 생성할 때는 POST 메소드를 사용합니다.
        headers: {
          'Content-Type': 'application/json', // 보내는 데이터가 JSON 형식임을 알려줍니다.
        },
        body: JSON.stringify(newReview), // JavaScript 객체를 JSON 문자열로 변환하여 보냅니다.
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedReview = await response.json(); // 서버에서 저장된 후기 정보를 받아옵니다 (id 포함)
      // 기존 후기 목록에 새 후기를 추가하여 화면을 업데이트합니다.
      setReviews((prevReviews) => [...prevReviews, addedReview]);
      alert('후기가 성공적으로 작성되었습니다!');
    } catch (error) {
      console.error('후기 작성 중 오류 발생:', error);
      alert('후기 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="review-page-container">
      <h2>사용자 후기</h2>
      <ReviewForm onReviewSubmit={handleAddReview} /> {/* 후기 폼 컴포넌트 */}
      <ReviewList reviews={reviews} /> {/* 후기 목록 컴포넌트 */}
    </div>
  );
};

export default ReviewPage;