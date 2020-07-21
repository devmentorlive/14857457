export default function importData({
  setTileset,
  setMapSize,
  setBgTile,
  setTiles,
}) {
  navigator.clipboard.readText().then((text) => {
    try {
      const json = JSON.parse(text);
      const tileset = Object.keys(json.tileset)[0];
      const variant = json.tileset[tileset];
      setTileset(`${tileset}/${variant}`);
      setBgTile(json.bgTile);
      setTiles(json.tiles);
      setMapSize(json.size);
    } catch {}
  });
}
