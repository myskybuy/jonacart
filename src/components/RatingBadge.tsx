"use client";

export function RatingBadge({ rating, count }: { rating: number; count?: number }) {
  if (!rating && !count) {
    return <span className="rating-badge rating-badge--empty">Not rated yet</span>;
  }
  return (
    <span className="rating-badge" aria-label={`Rated ${rating} out of 5`}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7L5.8 21l1.6-7L2 9.3l7.1-.7z" />
      </svg>
      <b>{rating.toFixed(1)}</b>
      {count !== undefined ? <span>({count})</span> : null}
    </span>
  );
}

export function RatingStarsInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <span className="rating-stars-input" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          className={`rating-chip ${value >= n ? "on" : ""}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
    </span>
  );
}
