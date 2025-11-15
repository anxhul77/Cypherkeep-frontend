export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      const idx = result.indexOf(",");
      resolve(result.slice(idx + 1));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}