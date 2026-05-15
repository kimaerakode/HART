// External store for managing pickup time selection state
import { setCheckoutSelection } from "./checkoutSelectionStore.js";

let selectedPickupTime = null;
const subscribers = new Set();

export function subscribe(listener) {
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

export function getSelectedPickupTime() {
  return selectedPickupTime;
}

export function setSelectedPickupTime(time) {
  selectedPickupTime = time;
  setCheckoutSelection({ time: time ?? null });
  subscribers.forEach((listener) => listener());
}
