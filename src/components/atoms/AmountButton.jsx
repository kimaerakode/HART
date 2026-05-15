import React from "react";

export default function AmountButton({ count, onDecrease, onIncrease }) {
  return (
    <div className="pm-amount" aria-label="Quantity selector">
      <button
        type="button"
        className="pm-amount-btn"
        onClick={onDecrease}
        aria-label="Decrease quantity"
      >
        <img
          src="/assets/icons/arrow-decrease-cream.svg"
          alt=""
          aria-hidden="true"
        />
      </button>
      <span className="pm-amount-count">{count}</span>
      <button
        type="button"
        className="pm-amount-btn"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <img
          src="/assets/icons/arrow-increase-cream.svg"
          alt=""
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
