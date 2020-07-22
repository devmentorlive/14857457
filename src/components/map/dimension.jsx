import React from "react";
import { MAX_MAP_SIZE } from "../../constants";

export default function MapDimension({ label, value, onChange }) {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const size = Number(e.target.value.replace(/\D/g, ""));
          if (size <= MAX_MAP_SIZE) {
            onChange(size);
          }
        }}
        size={5}
      />
      <span style={{ position: "relative", left: -18 }}>{label}</span>
    </>
  );
}
