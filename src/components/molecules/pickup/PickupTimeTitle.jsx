import React, { useSyncExternalStore } from "react";
import { getSelectedPickupTime, subscribe } from "../../../stores/pickupTimeStore.js";

export default function PickupTimeTitle() {
  const selected = useSyncExternalStore(
    subscribe,
    getSelectedPickupTime,
    getSelectedPickupTime,
  );

  return (
    <span className="pickup-time-title">
      {selected ? selected : "Select pick-up time"}
    </span>
  );
}
