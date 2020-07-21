import React, { useState, useEffect } from "react";
import useDraggable from "../../hooks/use-draggable";
import TilePalette from "../tile-palette";
import Map from "../map";
import { TILE_SIZE } from "../../constants";

export default function App() {
  const [data, setData] = useState({
    tileset: "rpg-nature-tileset/spring",
    activeTile: {
      x: 1 * TILE_SIZE,
      y: 4 * TILE_SIZE,
    },
    tiles: [],
    bgTile: { x: -TILE_SIZE, y: -TILE_SIZE },
    mapSize: {
      width: 1000,
      height: 1000,
    },
  });
  const { position } = useDraggable("handle");
  const { tileset, activeTile, tiles, bgTile, mapSize } = data;

  useEffect(() => {
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
  }, [mapSize]);

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
      <TilePalette position={position} data={data} setData={setData} />

      <Map data={data} setData={setData} />
    </div>
  );
}
