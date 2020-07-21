import React, { useState, useEffect } from "react";
import useDraggable from "../../hooks/use-draggable";
import TilePalette from "../tile-palette";
import Map from "../map";
import { TILE_SIZE } from "../../constants";

export default function App() {
  const [tileset, setTileset] = useState("rpg-nature-tileset/spring");
  const [activeTile, setActiveTile] = useState({
    x: 1 * TILE_SIZE,
    y: 4 * TILE_SIZE,
  });
  const [tiles, setTiles] = useState([]);
  const [bgTile, setBgTile] = useState({ x: -TILE_SIZE, y: -TILE_SIZE });
  const [mapSize, setMapSize] = useState({
    width: 1000,
    height: 1000,
  });
  const { position } = useDraggable("handle");

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
    setTiles(_tiles);
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
      <TilePalette
        position={position}
        tileset={tileset}
        setTileset={setTileset}
        activeTile={activeTile}
        setActiveTile={setActiveTile}
        mapSize={mapSize}
        setMapSize={setMapSize}
        bgTile={bgTile}
        setBgTile={setBgTile}
        tiles={tiles}
        setTiles={setTiles}
      />

      <Map
        tiles={tiles}
        tileset={tileset}
        size={mapSize}
        activeTile={activeTile}
        setTiles={setTiles}
        bgTile={bgTile}
      />
    </div>
  );
}
