import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { format, isValid } from "date-fns";
import { InputMask, MaskedRange } from "imask";
import "./DatePickerField.css";
import { getSelectedDate, setSelectedDate, subscribe } from "../../../stores/datePickerStore.js";

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
          dd: { mask: MaskedRange, from: 1, to: 31, maxLength: 2 },
          mm: { mask: MaskedRange, from: 1, to: 12, maxLength: 2 },
          yyyy: { mask: MaskedRange, from: 1900, to: 2100, maxLength: 4 },
        },
        lazy: false,
        overwrite: "shift",
      });
    }

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
      document.removeEventListener("dateSelectedFromCalendar", handleCalendarSelect);
      if (maskRef.current) {
        maskRef.current.destroy();
        maskRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 4000);
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

    if (unmaskedValue.length === 4) {
      const day = parseInt(unmaskedValue.slice(0, 2), 10);
      const month = parseInt(unmaskedValue.slice(2, 4), 10);
      parsedDate = new Date(currentYear, month - 1, day);
    } else if (unmaskedValue.length === 8) {
      const day = parseInt(unmaskedValue.slice(0, 2), 10);
      const month = parseInt(unmaskedValue.slice(2, 4), 10);
      const year = parseInt(unmaskedValue.slice(4, 8), 10);
      parsedDate = new Date(year, month - 1, day);
    } else {
      inputRef.current.value = "";
      if (maskRef.current) {
        maskRef.current.updateValue();
      }
      return;
    }

    if (!isValid(parsedDate)) {
      inputRef.current.value = "";
      if (maskRef.current) {
        maskRef.current.updateValue();
      }
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    parsedDate.setHours(0, 0, 0, 0);

    if (parsedDate < today) {
      setError("Date cannot be in the past");
      inputRef.current.value = "";
      if (maskRef.current) {
        maskRef.current.updateValue();
      }
      return;
    }

    justCommittedRef.current = true;
    setSelectedDate(parsedDate);
    inputRef.current.value = "";
    if (maskRef.current) {
      maskRef.current.updateValue();
    }
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
          setError(null);
          event.currentTarget.dispatchEvent(
            new CustomEvent("openAccordion", { bubbles: true }),
          );
        }}
        onInput={() => setError(null)}
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
