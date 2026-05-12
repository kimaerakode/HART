import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { format, isValid } from "date-fns";
import { InputMask, MaskedRange } from "imask";
import "./DatePickerField.css";
import { getSelectedDate, setSelectedDate, subscribe } from "./datePickerStore";

export default function DatePickerField() {
  const selected = useSyncExternalStore(
    subscribe,
    getSelectedDate,
    getSelectedDate,
  );

  const inputRef = useRef(null);
  const maskRef = useRef(null);
  const justCommittedRef = useRef(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputRef.current && !maskRef.current) {
      maskRef.current = new InputMask(inputRef.current, {
        mask: "dd/mm/yyyy",
        blocks: {
          dd: {
            mask: MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2,
          },
          mm: {
            mask: MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
          },
          yyyy: {
            mask: MaskedRange,
            from: 1900,
            to: 2100,
            maxLength: 4,
          },
        },
        lazy: false,
        overwrite: "shift",
      });
    }

    // Listen for calendar date selection to reset input field
    const handleCalendarSelect = () => {
      justCommittedRef.current = true;
      setError(null);
      if (inputRef.current) {
        inputRef.current.value = "";
        if (maskRef.current) {
          maskRef.current.updateValue();
        }
      }
    };

    document.addEventListener("dateSelectedFromCalendar", handleCalendarSelect);

    return () => {
      document.removeEventListener(
        "dateSelectedFromCalendar",
        handleCalendarSelect,
      );
      if (maskRef.current) {
        maskRef.current.destroy();
        maskRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      // Skip refilling if we just committed (to allow reset)
      if (justCommittedRef.current) {
        justCommittedRef.current = false;
        return;
      }
      inputRef.current.value = selected ? format(selected, "dd/MM/yyyy") : "";
      if (maskRef.current) {
        maskRef.current.updateValue();
      }
    }
  }, [selected]);

  // Auto-clear error after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const commitValue = () => {
    if (!inputRef.current) return;

    const value = inputRef.current.value.trim();
    setError(null);

    if (!value) {
      setSelectedDate(undefined);
      inputRef.current.value = "";
      return;
    }

    const currentYear = new Date().getFullYear();
    const unmaskedValue =
      maskRef.current?.unmaskedValue ?? value.replace(/\D/g, "");
    let parsedDate;

    // If only day/month was entered, default the year to the current year.
    if (unmaskedValue.length === 4) {
      const day = parseInt(unmaskedValue.slice(0, 2), 10);
      const month = parseInt(unmaskedValue.slice(2, 4), 10);
      parsedDate = new Date(currentYear, month - 1, day);
    } else if (unmaskedValue.length === 8) {
      // Full dd/mm/yyyy format — parse manually to ensure dd/mm order.
      const day = parseInt(unmaskedValue.slice(0, 2), 10);
      const month = parseInt(unmaskedValue.slice(2, 4), 10);
      const year = parseInt(unmaskedValue.slice(4, 8), 10);
      parsedDate = new Date(year, month - 1, day);
    } else {
      // Invalid format - clear the field
      inputRef.current.value = "";
      if (maskRef.current) {
        maskRef.current.updateValue();
      }
      return;
    }

    if (!isValid(parsedDate)) {
      // Invalid date - clear the field
      inputRef.current.value = "";
      if (maskRef.current) {
        maskRef.current.updateValue();
      }
      return;
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    parsedDate.setHours(0, 0, 0, 0);

    if (parsedDate < today) {
      setError("Date cannot be in the past");
      // Clear the input field
      inputRef.current.value = "";
      if (maskRef.current) {
        maskRef.current.updateValue();
      }
      return;
    }

    // Date is valid and not in the past - commit it
    // Mark that we just committed so useEffect doesn't refill the field
    justCommittedRef.current = true;
    setSelectedDate(parsedDate);
    // Reset input field after successful commit
    inputRef.current.value = "";
    if (maskRef.current) {
      maskRef.current.updateValue();
    }
    // Dispatch custom event to close accordion
    inputRef.current.dispatchEvent(
      new CustomEvent("closeAccordion", { bubbles: true }),
    );
  };

  return (
    <div className="date-picker-field-wrapper">
      <input
        ref={inputRef}
        className="date-picker-field"
        type="text"
        onFocus={(event) => {
          // Clear error when focused
          setError(null);
          // Dispatch custom event to open accordion
          event.currentTarget.dispatchEvent(
            new CustomEvent("openAccordion", { bubbles: true }),
          );
        }}
        onInput={() => {
          // Clear error when user starts typing
          setError(null);
        }}
        onBlur={commitValue}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
        placeholder="dd/mm/yyyy"
        aria-label="Selected date"
        inputMode="numeric"
      />
      {error && (
        <div className="date-picker-error-popover">
          <p className="date-picker-error-text">{error}</p>
        </div>
      )}
    </div>
  );
}
