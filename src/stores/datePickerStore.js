import { format } from "date-fns";
import { setCheckoutSelection } from "./checkoutSelectionStore.js";

let selectedDate;

const listeners = new Set();

export function getSelectedDate() {
  return selectedDate;
}

export function setSelectedDate(date) {
  selectedDate = date;
  setCheckoutSelection({ date: date ? format(date, "dd/MM/yyyy") : null });
  listeners.forEach((listener) => listener());
}

export function subscribe(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}
