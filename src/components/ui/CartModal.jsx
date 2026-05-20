import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import CartItems from "../molecules/CartItems.jsx";
import CartTotal from "../atoms/CartTotal.jsx";
import "./CartModal.css";

export default function CartModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="cm-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="cm-box" role="dialog" aria-modal="true" aria-label="Cart">
        <div className="cm-header">
          <h2 className="cm-title">Cart</h2>
          <button
            className="cm-close"
            type="button"
            onClick={onClose}
            aria-label="Close cart"
          >
            <img
              src="/assets/icons/cross-cream.svg"
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="cm-content">
          <div className="cm-scroll">
            <CartItems buttonColor="charcoal" />
          </div>
        </div>

        <div className="cm-footer">
          <CartTotal placement="mobile" />
          <a className="cm-checkout-link" href="/checkout">
            Go to checkout
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
