import React, { useEffect, useState } from "react";
import "./CartTotal.css";

export default function CartTotal({ placement = "mobile" }) {
  const [total, setTotal] = useState(0);
  const formattedTotal = Math.round(total);

  useEffect(() => {
    console.log("[CartTotal] Hydration complete, loading cart store");
    let unsubscribe = () => {};

    // Lazy load store only after hydration
    import("../../stores/cartStore.js").then(({ getCart, subscribe }) => {
      // Update total immediately with current cart
      const cart = getCart();
      const newTotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        return sum + price * item.quantity;
      }, 0);
      setTotal(newTotal);

      // Subscribe to cart changes
      unsubscribe = subscribe(() => {
        const updatedCart = getCart();
        const updatedTotal = updatedCart.reduce((sum, item) => {
          const price = parseFloat(item.price) || 0;
          return sum + price * item.quantity;
        }, 0);
        setTotal(updatedTotal);
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={`total--${placement}`}>
      <div className="title-wrapper reverse">
        <h3>Total</h3>
        <span>{formattedTotal} DKK</span>
      </div>
    </div>
  );
}
