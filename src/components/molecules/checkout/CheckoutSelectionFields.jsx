import React, { useSyncExternalStore } from "react";
import { getCheckoutSelection, subscribe } from "../../../stores/checkoutSelectionStore.js";

export default function CheckoutSelectionFields() {
  const selection = useSyncExternalStore(
    subscribe,
    getCheckoutSelection,
    getCheckoutSelection,
  );

  const locationValue =
    typeof selection.location === "string"
      ? selection.location
      : (selection.location?.title ?? "");

  return (
    <>
      <input type="hidden" name="pickupLocation" value={locationValue} />
      <input type="hidden" name="pickupDate" value={selection.date ?? ""} />
      <input type="hidden" name="pickupTime" value={selection.time ?? ""} />
    </>
  );
}
