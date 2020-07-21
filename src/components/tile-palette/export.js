export default function exportData({ bgTile, tiles }) {
  try {
    const json = JSON.stringify({
      bgTile,
      tiles,
    });
    navigator.clipboard.writeText(json);
  } catch {}
}
