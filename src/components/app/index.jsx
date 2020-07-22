import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import TilePalette from "../tile-palette";
import Map, { Dimension } from "../map";
import { TILE_SIZE } from "../../constants";
import { importData } from "../../modules/persistence";

export default function App() {
  const [data, setData] = useState({
    tileset: "",
    variant: "",
    activeTile: {
      x: 0,
      y: 0,
    },
    tiles: [],
    bgTile: { x: -TILE_SIZE, y: -TILE_SIZE },
    mapSize: {
      width: 0,
      height: 0,
    },
  });

  const { mapSize, tileset } = data;
  const newMap = mapSize.width < 1 || mapSize.height < 1;

  function buildMap() {
    const _tiles = [];
    let id = 0;

    for (let y = 0; y < mapSize.height; y = y + TILE_SIZE) {
      const row = [];
      for (let x = 0; x < mapSize.width; x = x + TILE_SIZE) {
        row.push({ x, y, id: id++, v: { x: -TILE_SIZE, y: -TILE_SIZE } });
      }
      _tiles.push(row);
    }
    setData((prev) => ({
      ...prev,
      tiles: _tiles,
    }));
  }

  return (
    <div
      style={{
        position: "relative",
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: "grey",
        overflow: "hidden",
        border: "1px solid black",
      }}
    >
      {!newMap ? (
        <>
          <TilePalette data={data} setData={setData} />

          <Map data={data} setData={setData} />
        </>
      ) : (
        <div
          style={{
            position: "relative",
            width: 300,
            margin: "25% auto",
            backgroundColor: "white",
            padding: "20px",
            border: "2px solid black",
          }}
        >
          <h1>Create new map</h1>

          <div style={{ position: "relative", margin: "20px 0" }}>
            <button
              onClick={() => {
                importData(setData);
              }}
              style={{
                padding: "4px 8px",
                height: 34,
              }}
            >
              Import Data
            </button>
          </div>

          <fieldset>
            <legend>Create new map</legend>
            <div style={{ width: 200 }}>
              <label>Tileset</label>
              <Dropdown
                options={Object.keys(require("../../data/tilesets.json"))}
                onChange={(tileset) =>
                  setData((prev) => ({
                    ...prev,
                    tileset: tileset.value,
                  }))
                }
                value={tileset}
              />
            </div>

            <div>
              <label>Map size</label>
              <Dimension
                value={mapSize.width}
                label="w"
                onChange={(width) => {
                  setData((prev) => ({
                    ...prev,
                    mapSize: { ...prev.mapSize, width },
                  }));
                }}
              />

              <Dimension
                value={mapSize.height}
                label="h"
                onChange={(height) => {
                  setData((prev) => ({
                    ...prev,
                    mapSize: { ...prev.mapSize, height },
                  }));
                }}
              />
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
}
