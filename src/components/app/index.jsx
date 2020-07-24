import React, { useState, useEffect } from "react";

import TilePalette from "../tile-palette";
import Map from "../map";

export default function App() {
  const [values, setValues] = useState({
    tileset: "rpg-nature-tileset",
    variant: "spring",
    activeTile: { x: 1 * 32, y: 4 * 32 },
    tiles: [],
    bgTile: { x: -32, y: -32 },
    mapSize: {
      width: 800,
      height: 600,
    },
  });

  const { mapSize } = values;

  useEffect(() => {
    const _tiles = [];
    let id = 0;

    for (let y = 0; y < mapSize.height; y = y + 32) {
      const row = [];
      for (let x = 0; x < mapSize.width; x = x + 32) {
        row.push({ x, y, id: id++, v: { x: -32, y: -32 } });
      }
      _tiles.push(row);
    }
    setValues((prev) => ({
      ...prev,
      tiles: _tiles,
    }));
  }, []);

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
      <TilePalette values={values} setValues={setValues} />
      <Map values={values} setValues={setValues} />
    </div>
  );
}
