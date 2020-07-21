export default function exportData({ tileset, mapSize, bgTile, tiles }) {
  try {
    const [set, variant] = tileset.split("/");
    const json = JSON.stringify({
      tileset: {
        [set]: variant,
      },
      size: mapSize,
      bgTile,
      tiles,
    });
    navigator.clipboard.writeText(json);
  } catch {}
}
