export default function importData({ setBgTile, setTiles }) {
  navigator.clipboard.readText().then((text) => {
    try {
      const json = JSON.parse(text);
      setBgTile({ ...json.bgTile });
      setTiles(json.tiles);
    } catch {}
  });
}
