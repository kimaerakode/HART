import React from "react";

export default function AmountButton({
  count,
  onDecrease,
  onIncrease,
  variant = "modal",
  color = "cream",
}) {
  const isCart = variant === "cart";
  const isCreamColor = color === "cream";
  const decreaseIcon = isCreamColor
    ? "/assets/icons/arrow-decrease-charcoal.svg"
    : "/assets/icons/arrow-decrease-cream.svg";
  const increaseIcon = isCreamColor
    ? "/assets/icons/arrow-increase-charcoal.svg"
    : "/assets/icons/arrow-increase-cream.svg";
  const containerClass = isCart ? "cart-amount" : "pm-amount";
  const colorClass = isCreamColor
    ? "amount-color-cream"
    : "amount-color-charcoal";
  const buttonClass = isCart ? "cart-amount-btn" : "pm-amount-btn";
  const countClass = isCart ? "cart-amount-count" : "pm-amount-count";

  return (
    <div
      className={`${containerClass} ${colorClass}`}
      aria-label="Quantity selector"
    >
      <button
        type="button"
        className={buttonClass}
        onClick={onDecrease}
        aria-label="Decrease quantity"
      >
        <img src={decreaseIcon} alt="" aria-hidden="true" />
      </button>
      <span className={countClass}>{count}</span>
      <button
        type="button"
        className={buttonClass}
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <img src={increaseIcon} alt="" aria-hidden="true" />
      </button>
    </div>
  );
}
