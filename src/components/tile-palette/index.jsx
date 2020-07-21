import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import MapDimension from "./map-dimension";
import exportData from "./export";
import importData from "./import";

import { TILE_SIZE } from "../../constants";

export default function TilePalette({
  tileset,
  setTileset,
  position,
  activeTile,
  setActiveTile,
  mapSize,
  setMapSize,
  bgTile,
  setBgTile,
  tiles,
  setTiles,
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
  const palette = [];
  let id = 0;

  for (let y = 0; y < height; y = y + TILE_SIZE) {
    const row = [];
    for (let x = 0; x < width; x = x + TILE_SIZE) {
      row.push({ x, y, id: id++ });
    }
    palette.push(row);
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
        <div
          style={{
            position: "relative",
            width: TILE_SIZE,
            marginLeft: 8,
          }}
        >
          <div
            style={{
              position: "relative",
              background: `url(/sprites/${tileset}.png) -${activeTile.x}px -${activeTile.y}px no-repeat`,
              width: TILE_SIZE,
              height: TILE_SIZE,
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

        <div style={{ position: "relative", marginLeft: 2 }}>
          <button
            style={{
              padding: "6px 20px",
              textTransform: "uppercase",
              fontSize: "14px",
              height: 34,
            }}
            onClick={() => setBgTile(activeTile)}
          >
            Fill Base Layer
          </button>
        </div>

        <div style={{ position: "relative", marginLeft: 8 }}>
          <button
            onClick={() => exportData({ tileset, mapSize, bgTile, tiles })}
            style={{
              padding: "4px 8px",
              height: 34,
            }}
          >
            <img
              src="/img/arrow-line.png"
              alt="export map data"
              style={{
                padding: 0,
                margin: 0,
              }}
            />
          </button>
        </div>

        <div style={{ position: "relative", marginLeft: 8 }}>
          <button
            onClick={() =>
              importData({ setTileset, setMapSize, setBgTile, setTiles })
            }
            style={{
              padding: "4px 8px",
              height: 34,
            }}
          >
            <img
              src="/img/arrow-line.png"
              alt="export map data"
              style={{
                padding: "3px 0",
                margin: 0,
                transform: "scaleY(-1)",
              }}
            />
          </button>
        </div>
      </div>
      {palette.map((row, y) => (
        <div style={{ display: "flex" }}>
          {row.map((tile, x) => (
            <div
              onClick={() =>
                setActiveTile({ x: x * TILE_SIZE, y: y * TILE_SIZE })
              }
              style={{
                borderTop: "1px solid #333",
                borderRight: "1px solid #333",
                background: `url(/sprites/${tileset}.png) -${
                  x * TILE_SIZE
                }px -${y * TILE_SIZE}px no-repeat`,
                width: TILE_SIZE,
                height: TILE_SIZE,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
