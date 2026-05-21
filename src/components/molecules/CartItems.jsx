import React, { useEffect, useState, useRef } from "react";
import AmountButton from "../atoms/AmountButton.jsx";
import "./CartItems.css";

/**
 * @param {{ buttonColor?: string; buttonTone?: string }} props
 */
export default function CartItems({
  buttonColor = "cream",
  buttonTone = "charcoal",
}) {
  const [cart, setCart] = useState([]);
  const storeRef = useRef(null);

  useEffect(() => {
    console.log("[CartItems] Hydration complete, loading cart store");
    let unsubscribe = () => {};

    // Lazy load store only after hydration
    import("../../stores/cartStore.js").then(
      ({ getCart, subscribe, removeFromCart, updateQuantity }) => {
        // Store functions in ref for use in callbacks
        storeRef.current = { removeFromCart, updateQuantity };

        // Update cart immediately with current data
        setCart(getCart());

        // Subscribe to cart changes
        unsubscribe = subscribe(() => {
          setCart(getCart());
        });
      },
    );

    return () => unsubscribe();
  }, []);

  if (!cart || cart.length === 0) {
    return (
      <div className="cart">
        <p className="cart-empty">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart">
      {cart.map((item) => (
        <CartItemRow
          key={item.title}
          title={item.title}
          price={item.price}
          imgSrc={item.imgSrc}
          quantity={item.quantity}
          buttonColor={buttonColor}
          buttonTone={buttonTone}
          onRemove={() => storeRef.current?.removeFromCart(item.title)}
          onQuantityChange={(newQuantity) =>
            storeRef.current?.updateQuantity(item.title, newQuantity)
          }
        />
      ))}
    </div>
  );
}

function CartItemRow({
  title,
  price,
  imgSrc,
  quantity,
  buttonColor = "cream",
  buttonTone = "charcoal",
  onRemove,
  onQuantityChange,
}) {
  const priceNum = parseFloat(price) || 0;
  const itemTotal = Math.round(priceNum * quantity);
  // Construct full image path if only filename is provided
  const fullImgSrc = imgSrc?.startsWith("/")
    ? imgSrc
    : `/assets/img/products/${imgSrc}`;

  return (
    <div className="cart-item">
      <img src={fullImgSrc} className="product" alt={`${title} image`} />
      <div className="cart-item-content">
        <div className="cart-item-description">
          <div className="cart-item-single">
            <p className="cart-item-title">{title}</p>
            <p className="cart-item-price">{price}</p>
          </div>
          <div className="cart-item-total-mobile">
            <p>{itemTotal} DKK</p>
          </div>
        </div>
        <div className="cart-item-amount">
          <AmountButton
            count={quantity}
            onDecrease={() => onQuantityChange(Math.max(1, quantity - 1))}
            onIncrease={() => onQuantityChange(quantity + 1)}
            variant="cart"
            color={buttonColor}
            tone={buttonTone}
          />
          <button
            onClick={onRemove}
            className="cart-item-remove"
            aria-label="remove item"
          >
            <img src="/assets/icons/cross-charcoal.svg" alt="remove item (X)" />
          </button>
        </div>
        <div className="cart-item-total">
          <p>{itemTotal} DKK</p>
        </div>
      </div>
    </div>
  );
}
