import React, { useSyncExternalStore } from "react";
import { format } from "date-fns";
import { getSelectedDate, subscribe } from "./datePickerStore";

export default function DatePickerTitle() {
  const selected = useSyncExternalStore(
    subscribe,
    getSelectedDate,
    getSelectedDate,
  );

  return (
    <span className="date-picker-title">
      {selected ? format(selected, "dd/MM/yyyy") : "Select date"}
    </span>
  );
}
