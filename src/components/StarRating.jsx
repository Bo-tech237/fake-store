'use client';
import { useState } from 'react';

const StarRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => {
                return (
                    <button
                        type="button"
                        key={star}
                        className={
                            star <= (hover || rating)
                                ? 'on button'
                                : 'off button'
                        }
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
