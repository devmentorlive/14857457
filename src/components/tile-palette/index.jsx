import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import useDraggable from "../../hooks/use-draggable";

export default function TilePalette({ values, setValues }) {
  const { tileset, activeTile, variant } = values;
  const { position } = useDraggable("handle");
  const tilesetData = require("../../data/tilesets.json");
  const tilesets = Object.keys(tilesetData).map((set) => ({
    type: "group",
    name: set.split("-", " "),
    items: tilesetData[set].variants.map((variant) => ({
      value: `${set}/${variant}`,
      label: variant,
    })),
  }));

  const { width, height } = tilesetData[tileset].size;
  const tiles = [];
  let id = 0;

  for (let y = 0; y < height; y = y + 32) {
    const row = [];
    for (let x = 0; x < width; x = x + 32) {
      row.push({ x, y, id: id++ });
    }
    tiles.push(row);
  }

  return (
    <div
      id="palette"
      style={{
        position: "absolute",
        border: "1px solid black",
        top: position.y,
        left: position.x,
        zIndex: 100,
        backgroundColor: "white",
      }}
    >
      <div style={{ display: "flex", margin: 4 }}>
        <img id="handle" src="/img/drag-handle.png" alt="" />
        <div style={{ position: "relative", width: 32, marginLeft: 8 }}>
          <div
            style={{
              position: "relative",
              background: `url(/sprites/${tileset}/${variant}.png) -${activeTile.x}px -${activeTile.y}px no-repeat`,
              width: 32,
              height: 32,
              top: 2,
            }}
          />
        </div>

        <div style={{ width: 200, marginLeft: 8 }}>
          <Dropdown
            options={tilesets}
            onChange={(tileset) =>
              setValues((prev) => ({
                ...prev,
                tileset: tileset.value,
              }))
            }
            value={tileset}
          />
        </div>

        <div style={{ width: 200, marginLeft: 8 }}>
          <button
            onClick={() =>
              setValues((prev) => ({
                ...prev,
                bgTile: activeTile,
              }))
            }
            style={{
              padding: "6px 20px",
              textTransform: "uppercase",
              fontSize: 14,
            }}
          >
            Fill BG
          </button>
        </div>
      </div>
      {tiles.map((row, y) => (
        <div style={{ display: "flex" }}>
          {row.map((tile, x) => (
            <div
              onClick={() =>
                setValues((prev) => ({
                  ...prev,
                  activeTile: { x: x * 32, y: y * 32 },
                }))
              }
              style={{
                borderTop: "1px solid #333",
                borderRight: "1px solid #333",
                background: `url(/sprites/${tileset}/${variant}.png) -${
                  x * 32
                }px -${y * 32}px no-repeat`,
                width: 32,
                height: 32,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
