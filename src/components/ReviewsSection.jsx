import React from 'react';
import { Star } from 'lucide-react';
import { reviewsData } from '../data/mockData';

const ReviewsSection = () => {
  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title-center">
            Customer <span className="text-accent">Reviews</span>
          </h2>
          <p className="section-subtitle-center">
            What our happy customers say about us
          </p>
        </div>

        <div className="reviews-grid">
          {reviewsData.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="var(--accent-primary)" color="var(--accent-primary)" />
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <div className="author-avatar">{review.author.charAt(0)}</div>
                <div className="author-info">
                  <p className="author-name">{review.author}</p>
                  <p className="review-date">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
