let selectedDate;

const listeners = new Set();

export function getSelectedDate() {
  return selectedDate;
}

export function setSelectedDate(date) {
  selectedDate = date;
  listeners.forEach((listener) => listener());
}

export function subscribe(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}
