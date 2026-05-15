import React, { useSyncExternalStore } from "react";
import {
  getSelectedPickupTime,
  setSelectedPickupTime,
  subscribe,
} from "../../../stores/pickupTimeStore.js";
import "./PickupList.css";

export default function PickupTimeList({ pickupTimes }) {
  const selectedPickupTime = useSyncExternalStore(
    subscribe,
    getSelectedPickupTime,
    getSelectedPickupTime,
  );

  const handleSelectTime = (time) => {
    setSelectedPickupTime(time);
    document.dispatchEvent(
      new CustomEvent("closeAccordion", { bubbles: true }),
    );
  };

  return (
    <div className="list-wrapper date">
      {pickupTimes.map((time) => (
        <div
          key={time}
          className={`list time clickable-list ${selectedPickupTime === time ? "list--selected" : ""}`}
          onClick={() => handleSelectTime(time)}
        >
          <p className="text-xs">
            <span>{time}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
