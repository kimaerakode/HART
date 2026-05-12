import React, { useSyncExternalStore } from "react";
import {
  getSelectedPickupTime,
  setSelectedPickupTime,
  subscribe,
} from "./pickupTimeStore";

export default function PickupTimeList({ pickupTimes }) {
  const selectedPickupTime = useSyncExternalStore(
    subscribe,
    getSelectedPickupTime,
    getSelectedPickupTime,
  );

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
          className={`list time ${selectedPickupTime === time ? "list--selected" : ""}`}
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
