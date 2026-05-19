// Cart store for managing shopping cart state with localStorage persistence
const CART_STORAGE_KEY = "hart_cart";
const CART_CHANGE_EVENT = "hart-cart-change";
let cart = [];
const subscribers = new Set();
let initialized = false;

// Initialize cart from localStorage - only runs in browser
function initializeCart() {
  if (initialized) {
    console.log("[cartStore] Already initialized, skipping");
    return;
  }

  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    console.log("[cartStore] Not in browser context, skipping initialization");
    return;
  }

  initialized = true;

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    console.log("=== [cartStore] INITIALIZING ===");
    console.log("[cartStore] localStorage key:", CART_STORAGE_KEY);
    console.log("[cartStore] Raw localStorage value:", stored);
    if (stored) {
      cart = JSON.parse(stored);
      console.log(
        "[cartStore] ✓ Successfully loaded cart from localStorage:",
        cart,
      );
    } else {
      console.log("[cartStore] No cart found in localStorage, starting empty");
      cart = [];
    }
    console.log("=== [cartStore] INITIALIZATION COMPLETE ===");
  } catch (error) {
    console.error(
      "[cartStore] ✗ Failed to load cart from localStorage:",
      error,
    );
    cart = [];
  }
}

// Save cart to localStorage
function persistCart() {
  if (typeof localStorage === "undefined") {
    console.warn("[cartStore] localStorage not available, cannot persist");
    return;
  }
  try {
    const serialized = JSON.stringify(cart);
    localStorage.setItem(CART_STORAGE_KEY, serialized);
    console.log(
      "[cartStore] Saved cart to localStorage. Key:",
      CART_STORAGE_KEY,
    );
    console.log("[cartStore] Saved data:", serialized);
    console.log(
      "[cartStore] Verification - retrieving from localStorage:",
      localStorage.getItem(CART_STORAGE_KEY),
    );
  } catch (error) {
    console.error("[cartStore] Failed to save cart to localStorage:", error);
  }
}

function notifyCartChange() {
  subscribers.forEach((listener) => listener());

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CART_CHANGE_EVENT));

    if (typeof window.__hartSyncCartCount === "function") {
      window.__hartSyncCartCount();
    }
  }
}

// Initialize on module load
initializeCart();

export function subscribe(listener) {
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

export function getCart() {
  console.log("[cartStore] getCart returning cart with", cart.length, "items");
  return [...cart];
}

export function addToCart(product, quantity = 1) {
  console.log("[cartStore] Adding to cart:", product, quantity);

  const existingItem = cart.find((item) => item.title === product.title);

  if (existingItem) {
    existingItem.quantity += quantity;
    console.log("[cartStore] Updated existing item. Cart now:", cart);
  } else {
    cart.push({
      ...product,
      quantity,
    });
    console.log("[cartStore] Added new item. Cart now:", cart);
  }

  persistCart();
  notifyCartChange();
}

export function removeFromCart(productTitle) {
  cart = cart.filter((item) => item.title !== productTitle);
  persistCart();
  notifyCartChange();
}

export function updateQuantity(productTitle, quantity) {
  const item = cart.find((item) => item.title === productTitle);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productTitle);
    } else {
      item.quantity = quantity;
      persistCart();
      notifyCartChange();
    }
  }
}

export function clearCart() {
  cart = [];
  persistCart();
  notifyCartChange();
}

export function getCartTotal() {
  return cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    return sum + price * item.quantity;
  }, 0);
}
