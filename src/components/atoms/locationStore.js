// External store for managing location selection state
let selectedLocation = null;
const subscribers = new Set();

export function subscribe(listener) {
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

export function getSelectedLocation() {
  return selectedLocation;
}

export function setSelectedLocation(location) {
  selectedLocation = location;
  subscribers.forEach((listener) => listener());
}
