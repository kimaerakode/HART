const STORAGE_KEY = "hart.checkoutSelection";

const defaultSelection = {
  location: null,
  date: null,
  time: null,
};

function readStoredSelection() {
  if (typeof window === "undefined") {
    return defaultSelection;
  }

  try {
    const storedSelection = window.localStorage.getItem(STORAGE_KEY);
    return storedSelection
      ? { ...defaultSelection, ...JSON.parse(storedSelection) }
      : defaultSelection;
  } catch {
    return defaultSelection;
  }
}

let checkoutSelection = readStoredSelection();
const subscribers = new Set();

function notifySubscribers() {
  subscribers.forEach((listener) => listener());
}

export function getCheckoutSelection() {
  return checkoutSelection;
}

export function setCheckoutSelection(partialSelection) {
  checkoutSelection = {
    ...checkoutSelection,
    ...partialSelection,
  };

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(checkoutSelection),
      );
    } catch {
      // Ignore persistence failures and keep the in-memory value.
    }
  }

  notifySubscribers();
}

export function subscribe(listener) {
  subscribers.add(listener);

  return () => {
    subscribers.delete(listener);
  };
}
