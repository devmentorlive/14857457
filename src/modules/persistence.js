export function exportData(data) {
  try {
    const json = JSON.stringify(data);
    navigator.clipboard.writeText(json);
  } catch {}
}

export function importData(setData) {
  navigator.clipboard.readText().then((text) => {
    try {
      const json = JSON.parse(text);

      setData((prev) => ({
        ...prev,
        ...json,
      }));
    } catch {}
  });
}
