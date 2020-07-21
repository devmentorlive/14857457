import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import MapDimension from "./map-dimension";

export default function TilePalette({
  tileset,
  setTileset,
  position,
  activeTile,
  setActiveTile,
  mapSize,
  setMapSize,
}) {
  const tilesetData = require("../../data/tilesets.json");
  const tilesets = Object.keys(tilesetData).map((set) => ({
    type: "group",
    name: set.split("-").join(" "),
    items: tilesetData[set].variants.map((variant) => ({
      value: `${set}/${variant}`,
      label: variant,
    })),
  }));

  const [tilesetGroup, tilesetVariant] = tileset.split("/");
  const { width, height } = tilesetData[tilesetGroup].size;
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
              background: `url(/sprites/${tileset}.png) -${activeTile.x}px -${activeTile.y}px no-repeat`,
              width: 32,
              height: 32,
              top: 2,
            }}
          />
        </div>
        <div style={{ width: 200, marginLeft: 8 }}>
          <Dropdown
            options={tilesets}
            onChange={(tileset) => setTileset(tileset.value)}
            value={tileset}
          />
        </div>
        <div style={{ position: "relative", marginLeft: 8 }}>
          <MapDimension
            value={mapSize.width}
            label="w"
            onChange={(width) => setMapSize((prev) => ({ ...prev, width }))}
          />

          <MapDimension
            value={mapSize.height}
            label="h"
            onChange={(height) => setMapSize((prev) => ({ ...prev, height }))}
          />
        </div>
      </div>
      {tiles.map((row, y) => (
        <div style={{ display: "flex" }}>
          {row.map((tile, x) => (
            <div
              onClick={() => setActiveTile({ x: x * 32, y: y * 32 })}
              style={{
                borderTop: "1px solid #333",
                borderRight: "1px solid #333",
                background: `url(/sprites/${tileset}.png) -${x * 32}px -${
                  y * 32
                }px no-repeat`,
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
