export default function importData(setData) {
  navigator.clipboard.readText().then((text) => {
    try {
      const json = JSON.parse(text);
      const tileset = Object.keys(json.tileset)[0];
      const variant = json.tileset[tileset];
      setData((prev) => ({
        ...prev,
        ...json,
        tileset: `${tileset}/${variant}`,
      }));
    } catch {}
  });
}
