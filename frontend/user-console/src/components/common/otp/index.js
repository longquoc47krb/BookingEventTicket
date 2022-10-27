import React, { useMemo } from "react";
import constants from "../../../utils/constants";
const { PATTERNS } = constants;

export default function OtpInput({
  value,
  valueLength,
  onChange,
  onBlur,
  name,
}) {
  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (PATTERNS.RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target) => {
    const nextElementSibling = target.nextElementSibling | null;
    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target) => {
    const previousElementSibling = target.previousElementSibling | null;
    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };
  const inputOnChange = (e, idx) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = PATTERNS.RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    const nextInputEl = target.nextElementSibling | null;

    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };
  const inputOnKeyDown = (e) => {
    const { key } = e;
    const target = e.target;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== "Backspace" || targetValue !== "") {
      return;
    }

    focusToPrevInput(target);
  };
  const inputOnFocus = (e) => {
    const { target } = e;

    // keep focusing back until previous input
    // element has value
    const prevInputEl = target.previousElementSibling | null;

    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className="otp-group">
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          name={name}
          maxLength={valueLength}
          className="otp-input"
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
}
