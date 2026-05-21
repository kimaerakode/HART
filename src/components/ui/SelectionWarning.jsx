import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./SelectionWarning.css";

export default function SelectionWarning() {
  const [open, setOpen] = useState(false);
  const [onGo, setOnGo] = useState(null);
  const [onClose, setOnClose] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      const detail = e?.detail || {};
      setOnGo(() => detail.onGo || null);
      setOnClose(() => detail.onClose || null);
      setOpen(true);
    };

    window.addEventListener("show-selection-warning", handler);
    return () => window.removeEventListener("show-selection-warning", handler);
  }, []);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  const handleClose = () => {
    setOpen(false);
    try {
      if (typeof onClose === "function") onClose();
    } catch (e) {
      // swallow
    }
  };
  const handleGo = () => {
    handleClose();
    try {
      if (typeof onGo === "function") onGo();
    } catch (e) {
      // swallow
    }
  };

  const popover = (
    <div
      className="sw-overlay"
      role="dialog"
      aria-modal="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="sw-box">
        <div className="title-wrapper">
          <h3>Go to checkout</h3>
          <button className="sw-close" onClick={handleClose}>
            <img src="/assets/icons/cross-cream.svg" alt="" />
          </button>
        </div>
        <p className="sw-message">
          Please select pickup location, date and time before checkout.
        </p>
      </div>
    </div>
  );

  return createPortal(popover, document.body);
}
