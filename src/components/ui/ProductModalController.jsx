import React, { useState, useEffect } from "react";
import ProductModal from "./ProductModal.jsx";

export default function ProductModalController() {
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      setProduct(e.detail || {});
      setOpen(true);
    };
    window.addEventListener("open-product", handler);
    return () => window.removeEventListener("open-product", handler);
  }, []);

  return (
    <ProductModal
      product={product}
      open={open}
      onClose={() => {
        setOpen(false);
        setTimeout(() => setProduct(null), 200);
      }}
    />
  );
}
