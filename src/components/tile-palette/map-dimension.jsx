import React from "react";

export default function MapDimension({ label, value, onChange }) {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, "")))}
        size={4}
        maxLength={3}
      />
      <span style={{ position: "relative", left: -18 }}>{label}</span>
    </>
  );
}
