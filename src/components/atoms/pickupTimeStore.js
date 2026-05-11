// External store for managing pickup time selection state
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
  subscribers.forEach((listener) => listener());
}
