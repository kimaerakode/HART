import React, { useEffect, useState } from "react";

export default function CheckoutSelectionFields() {
  const [selection, setSelection] = useState({
    location: null,
    date: null,
    time: null,
  });

  useEffect(() => {
    console.log("[CheckoutSelectionFields] Hydration complete, loading store");
    
    // Lazy load store only after hydration
    import("../../../stores/checkoutSelectionStore.js").then(
      ({ getCheckoutSelection, subscribe }) => {
        // Update selection immediately with current data
        setSelection(getCheckoutSelection());
        
        // Subscribe to selection changes
        const unsubscribe = subscribe(() => {
          setSelection(getCheckoutSelection());
        });
        
        return unsubscribe;
      }
    );
  }, []);

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
