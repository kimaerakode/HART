import React, { useState, useEffect } from "react";
import ProductModal from "./ProductModal.jsx";

export default function ProductModalController() {
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(
      "[ProductModalController] Mounting, adding event listener for 'open-product'",
    );

    const openModal = (detail) => {
      setProduct(detail || {});
      setOpen(true);
      window.__hartPendingProductModal = null;
    };

    const handler = (e) => {
      console.log(
        "[ProductModalController] Received 'open-product' event with detail:",
        e.detail,
      );
      openModal(e.detail);
    };

    window.addEventListener("open-product", handler);

    if (window.__hartPendingProductModal) {
      console.log(
        "[ProductModalController] Consuming queued product modal payload:",
        window.__hartPendingProductModal,
      );
      openModal(window.__hartPendingProductModal);
    }

    return () => {
      console.log(
        "[ProductModalController] Unmounting, removing event listener",
      );
      window.removeEventListener("open-product", handler);
    };
  }, []);

  return (
    <ProductModal
      product={product}
      open={open}
      onClose={() => {
        console.log("[ProductModalController] Closing modal");
        setOpen(false);
        setTimeout(() => setProduct(null), 200);
      }}
    />
  );
}
