import React, { useSyncExternalStore } from "react";
import { getSelectedLocation, subscribe } from "./locationStore";

export default function LocationTitle() {
  const selected = useSyncExternalStore(
    subscribe,
    getSelectedLocation,
    getSelectedLocation,
  );

  return (
    <span className="location-title">
      {selected ? (
        <span className="location-title-value">{selected.title}</span>
      ) : (
        "Select location"
      )}
    </span>
  );
}
