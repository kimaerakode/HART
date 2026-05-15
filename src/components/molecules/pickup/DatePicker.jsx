import React, { useSyncExternalStore } from "react";
import { DayPicker } from "react-day-picker";
import { format, isBefore, startOfDay } from "date-fns";
import "react-day-picker/dist/style.css";
import "./DatePicker.css";
import { getSelectedDate, setSelectedDate, subscribe } from "../../../stores/datePickerStore.js";

export default function DatePicker({ onDateSelect, disabled }) {
  const selected = useSyncExternalStore(
    subscribe,
    getSelectedDate,
    getSelectedDate,
  );

  const handleSelect = (date) => {
    const today = startOfDay(new Date());
    const selectedDay = startOfDay(date);

    if (isBefore(selectedDay, today)) {
      return;
    }

    setSelectedDate(date);
    document.dispatchEvent(
      new CustomEvent("closeAccordion", { bubbles: true }),
    );
    document.dispatchEvent(
      new CustomEvent("dateSelectedFromCalendar", { bubbles: true }),
    );
    onDateSelect?.(date);
  };

  const disabledDates = (date) => {
    const today = startOfDay(new Date());
    return isBefore(startOfDay(date), today);
  };

  return (
    <div className="date-picker-wrapper">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        disabled={disabledDates}
        showOutsideDays
        weekStartsOn={1}
        className="date-picker"
      />
      {selected && (
        <p className="date-picker-display">
          Selected: <strong>{format(selected, "dd/MM/yyyy")}</strong>
        </p>
      )}
    </div>
  );
}
