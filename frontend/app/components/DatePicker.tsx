"use client";

import React from "react";

type DatePickerProps = {
  label: string;
  value: string;
  onChange: (date: string) => void;
};

export default function DatePicker({ label, value, onChange }: DatePickerProps) {
  return (
    <div className="date-picker">
      <label>
        {label}:{" "}
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded p-1"
        />
      </label>
    </div>
  );
}
