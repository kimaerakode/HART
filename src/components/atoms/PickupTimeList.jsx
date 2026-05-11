import React from "react";
import { setSelectedPickupTime } from "./pickupTimeStore";

export default function PickupTimeList({ pickupTimes }) {
  const handleSelectTime = (time) => {
    setSelectedPickupTime(time);
    // Dispatch custom event to close accordion
    document.dispatchEvent(
      new CustomEvent("closeAccordion", { bubbles: true }),
    );
  };

  return (
    <div className="list-wrapper date">
      {pickupTimes.map((time) => (
        <div
          key={time}
          className="list time"
          onClick={() => handleSelectTime(time)}
          style={{ cursor: "pointer" }}
        >
          <p className="text-xs">
            <span>{time}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
