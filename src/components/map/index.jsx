import React from "react";

import Dimension from "./dimension";
import { TILE_SIZE } from "../../constants";

export { Dimension };
export default function Map({ data, setData }) {
  const { activeTile, bgTile, tiles, tileset, variant, mapSize } = data;
  function cloneMatrix(m) {
    const clone = new Array(m.length);
    for (let i = 0; i < m.length; ++i) {
      clone[i] = m[i].slice(0);
    }
    return clone;
  }

  function dropTile({ x, y }) {
    setData((prev) => {
      const clone = cloneMatrix(prev.tiles);
      const tile = {
        ...clone[y][x],
        v: activeTile,
      };
      clone[y][x] = tile;
      return {
        ...prev,
        tiles: clone,
      };
    });
  }
  return (
    <div
      style={{
        boxSizing: "border-box",
        backgroundColor: "white",
        width: mapSize.width,
      }}
    >
      <div style={{ position: "absolute", zIndex: 1 }}>
        {tiles.map((row, y) => (
          <div style={{ display: "flex" }}>
            {row.map((tile, x) => (
              <div
                style={{
                  borderBottom: "1px solid #333",
                  borderRight: "1px solid #333",
                  background: `url(/sprites/${tileset}/${variant}.png) -${bgTile.x}px -${bgTile.y}px no-repeat`,
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", zIndex: 2 }}>
        {tiles.map((row, y) => (
          <div style={{ display: "flex" }}>
            {row.map((tile, x) => (
              <div
                onClick={() => dropTile({ x, y })}
                style={{
                  borderBottom: "1px solid #333",
                  borderRight: "1px solid #333",
                  background: `url(/sprites/${tileset}/${variant}.png) -${tile.v.x}px -${tile.v.y}px no-repeat`,
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
