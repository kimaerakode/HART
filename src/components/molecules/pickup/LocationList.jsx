import React, { useSyncExternalStore } from "react";
import {
  getSelectedLocation,
  setSelectedLocation,
  subscribe,
} from "../../../stores/locationStore.js";
import "./PickupList.css";

export default function LocationList({ shops }) {
  const selectedLocation = useSyncExternalStore(
    subscribe,
    getSelectedLocation,
    getSelectedLocation,
  );

  const handleSelectLocation = (shop) => {
    setSelectedLocation(shop);
    document.dispatchEvent(
      new CustomEvent("closeAccordion", { bubbles: true }),
    );
  };

  return (
    <div className="list-wrapper location">
      {shops.map((shop) => (
        <div
          key={shop.title}
          className={`list clickable-list ${selectedLocation?.title === shop.title ? "list--selected" : ""}`}
          onClick={() => handleSelectLocation(shop)}
        >
          <h4 className="location-name">{shop.title}</h4>
          <p className="text-xs">
            <>
              <span>{shop.street}</span>
              <br />
              <span>{shop.town}</span>
            </>
          </p>
        </div>
      ))}
    </div>
  );
}
