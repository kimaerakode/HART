import React, { useSyncExternalStore } from "react";
import {
  getCheckoutSelection,
  subscribe,
} from "../../../stores/checkoutSelectionStore.js";
import { shops } from "../../../data/shopsData";
import "./CheckoutSelection.css";

export default function CheckoutSelection() {
  const selection = useSyncExternalStore(
    subscribe,
    getCheckoutSelection,
    getCheckoutSelection,
  );

  const resolvedLocation =
    typeof selection.location === "string"
      ? (shops.find((shop) => shop.title === selection.location) ?? null)
      : selection.location;

  const locationTitle =
    resolvedLocation?.title ??
    (typeof selection.location === "string"
      ? selection.location
      : "Select location");
  const locationStreet = resolvedLocation?.street ?? "";
  const locationTown = resolvedLocation?.town ?? "";

  return (
    <>
      <div className="select-menu">
        <div className="item">
          <div className="title-wrapper">
            <h4>Location</h4>
            <div className="selection mobile">
              <span className="selection-title location">{locationTitle}</span>
              {locationStreet || locationTown ? (
                <div className="location-address">
                  {locationStreet ? (
                    <span className="location-address-line">
                      {locationStreet}
                    </span>
                  ) : null}
                  {locationTown ? (
                    <span className="location-address-line">
                      {locationTown}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          <div className="selection">
            <span className="selection-title">{locationTitle}</span>
            {locationStreet || locationTown ? (
              <div className="location-address">
                {locationStreet ? (
                  <span className="location-address-line">
                    {locationStreet}
                  </span>
                ) : null}
                {locationTown ? (
                  <span className="location-address-line">{locationTown}</span>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div className="item">
          <div className="title-wrapper">
            <h4>Date</h4>
            <div className="selection mobile">
              <span className="selection-title">
                {selection.date ?? "Select date"}
              </span>
            </div>
          </div>
          <div className="selection">
            <span className="selection-title">
              {selection.date ?? "Select date"}
            </span>
          </div>
        </div>
        <div className="item">
          <div className="title-wrapper">
            <h4>Time</h4>
            <div className="selection mobile">
              <span className="selection-title">
                {selection.time ?? "Select time"}
              </span>
            </div>
          </div>
          <div className="selection">
            <span className="selection-title">
              {selection.time ?? "Select time"}
            </span>
          </div>
        </div>
        <a className="link" href="/preorder">
          edit order
        </a>
      </div>
    </>
  );
}
