import React from "react";
import { setSelectedLocation } from "./locationStore";

export default function LocationList({ shops }) {
  const handleSelectLocation = (shop) => {
    setSelectedLocation(shop);
    // Dispatch custom event to close accordion
    document.dispatchEvent(
      new CustomEvent("closeAccordion", { bubbles: true }),
    );
  };

  return (
    <div className="list-wrapper location">
      {shops.map((shop) => (
        <div
          key={shop.title}
          className="list"
          onClick={() => handleSelectLocation(shop)}
          style={{ cursor: "pointer" }}
        >
          <h4>{shop.title}</h4>
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
