// src/components/Review/ReviewList.jsx
import React from 'react';
import './ReviewList.css'; // 리뷰 목록을 위한 CSS 파일 (나중에 만들 거예요!)

const ReviewList = ({ reviews }) => {
  // reviews 배열이 비어있으면 메시지 표시
  if (!reviews || reviews.length === 0) {
    return (
      <div className="no-reviews">
        <p>아직 작성된 후기가 없습니다. 첫 번째 후기를 남겨주세요!</p>
      </div>
    );
  }

  return (
    <div className="review-list-container">
      <h3>작성된 후기들</h3>
      {reviews.map((review) => (
        <div key={review.id} className="review-item"> {/* 각 후기는 고유한 id를 가집니다. */}
          <div className="review-header">
            <span className="review-author">{review.author}</span>
            <span className="review-date">
              {new Date(review.createdAt).toLocaleDateString()} {/* 작성 날짜를 보기 좋게 표시 */}
            </span>
          </div>
          <div className="star-rating-display">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= review.rating ? 'filled' : ''}`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="review-text">{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;