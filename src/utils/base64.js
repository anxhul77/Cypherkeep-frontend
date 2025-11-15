export function abToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

export function base64ToAb(base64) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}
