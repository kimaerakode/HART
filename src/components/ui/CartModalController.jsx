import React, { useEffect, useState } from "react";
import CartModal from "./CartModal.jsx";

export default function CartModalController() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const win = /** @type {any} */ (window);

    const openModal = () => {
      setOpen(true);
      win.__hartPendingCartModal = false;
    };

    const handler = () => {
      openModal();
    };

    win.__hartOpenCartModal = openModal;
    window.addEventListener("open-cart", handler);

    if (win.__hartPendingCartModal) {
      openModal();
    }

    return () => {
      window.removeEventListener("open-cart", handler);
      if (win.__hartOpenCartModal === openModal) {
        win.__hartOpenCartModal = null;
      }
    };
  }, []);

  return <CartModal open={open} onClose={() => setOpen(false)} />;
}
