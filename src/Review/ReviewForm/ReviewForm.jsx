// src/components/Review/ReviewForm.jsx
import React, { useState } from 'react';
import './ReviewForm.css'; // 리뷰 폼을 위한 CSS 파일 (나중에 만들 거예요!)

const ReviewForm = ({ onReviewSubmit }) => {
  // 사용자가 입력한 후기 내용을 저장할 상태
  const [reviewText, setReviewText] = useState('');
  // 사용자가 선택한 별점(1~5)을 저장할 상태
  const [rating, setRating] = useState(0); // 초기 별점은 0개

  // 후기 내용을 입력할 때마다 상태를 업데이트하는 함수
  const handleTextChange = (e) => {
    setReviewText(e.target.value);
  };

  // 별을 클릭할 때 별점을 업데이트하는 함수
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  // '후기 작성' 버튼을 눌렀을 때 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    // 입력된 후기 내용이 없거나, 별점을 선택하지 않았다면 경고 메시지
    if (!reviewText.trim() || rating === 0) {
      alert('후기 내용과 별점을 모두 입력해주세요.');
      return;
    }

    // 새로운 후기 객체 생성
    const newReview = {
      text: reviewText,
      rating: rating,
      // 실제 프로젝트에서는 로그인된 사용자의 ID나 닉네임을 여기에 추가해야 합니다.
      // 지금은 '익명' 또는 테스트용으로 '사용자1' 등으로 해볼 수 있습니다.
      author: '익명사용자', // 나중에 user.nickname 등으로 변경 가능
      createdAt: new Date().toISOString(), // 후기 작성 시간 (ISO 형식)
    };

    // 부모 컴포넌트(ReviewPage 등)로 새 후기 데이터를 전달합니다.
    // 이 데이터를 부모 컴포넌트에서 JSON Server로 보낼 것입니다.
    onReviewSubmit(newReview);

    // 폼 제출 후 입력 필드 초기화
    setReviewText('');
    setRating(0);
  };

  return (
    <div className="review-form-container">
      <h3>후기 작성</h3>
      <form onSubmit={handleSubmit}>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'filled' : ''}`} // 별점 상태에 따라 'filled' 클래스 추가
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="솔직한 후기를 남겨주세요..."
          value={reviewText}
          onChange={handleTextChange}
          rows="5"
        ></textarea>
        <button type="submit">후기 작성</button>
      </form>
    </div>
  );
};

export default ReviewForm;