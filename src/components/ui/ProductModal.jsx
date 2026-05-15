import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AmountButton from "../atoms/AmountButton.jsx";

export default function ProductModal({ product, open, onClose }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Load scoped stylesheet once (served from /public)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "product-modal-css";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "/styles/product-modal.css";
    document.head.appendChild(link);
  }, []);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="pm-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pm-box" role="dialog" aria-modal="true">
        <button
          className="pm-close"
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <img src="/assets/icons/cross-cream.svg" alt="" aria-hidden="true" />
        </button>
        <div className="pm-media">
          <img
            id="pm-img"
            className="pm-img"
            src={product?.imgSrc || ""}
            alt={product?.title || ""}
          />
        </div>
        <div className="pm-content">
          <div className="title-wrapper">
            <h3>{product?.title}</h3>
          </div>
          <p className="pm-price">{product?.price}</p>
          {product?.time && (
            <p className="pm-time">{`Available from ${product.time}`}</p>
          )}
          <p className="pm-description">{product?.description}</p>

          <div className="pm-actions">
            <AmountButton
              count={quantity}
              onDecrease={() =>
                setQuantity((current) => Math.max(1, current - 1))
              }
              onIncrease={() => setQuantity((current) => current + 1)}
            />
            <button className="pm-button">Add to cart</button>
          </div>

          {product?.allergens ? (
            <p className="text-s pm-allergens">{`Allergens:  ${product.allergens}`}</p>
          ) : null}
          <img
            className="heart"
            src="/assets/brand/walking-heart.svg"
            alt="Walking heart illustration"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
