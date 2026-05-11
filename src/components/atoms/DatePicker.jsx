import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import "./DatePicker.css";

export default function DatePicker({ onDateSelect, disabled }) {
  const [selected, setSelected] = useState(undefined);

  const handleSelect = (date) => {
    setSelected(date);
    onDateSelect?.(date);
  };

  return (
    <div className="date-picker-wrapper">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        disabled={disabled}
        showOutsideDays
        weekStartsOn={1}
        className="date-picker"
      />
      {selected && (
        <p className="date-picker-display">
          Selected: <strong>{format(selected, "EEEE, MMMM d, yyyy")}</strong>
        </p>
      )}
    </div>
  );
}
