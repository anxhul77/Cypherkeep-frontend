import { base64ToAb } from "../utils/base64";
import { getRsaPrivateKey } from "./keymanager";

function detectMime(buffer) {
  const bytes = new Uint8Array(buffer);
 
  if (bytes.length > 4 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return "application/pdf";
  }

  if (
    bytes.length > 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }

  if (bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }

  if (
    bytes.length > 4 &&
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38
  ) {
    return "image/gif";
  }
 
  if (bytes.length > 12) {
    const str = String.fromCharCode(...bytes.subarray(4, 8));
    if (str === "ftyp") return "video/mp4";
  }
 
  const sample = bytes.subarray(0, Math.min(bytes.length, 512));
  let nonPrintable = 0;
  for (let i = 0; i < sample.length; i++) {
    if (sample[i] === 0) nonPrintable++;
  }
  if (nonPrintable === 0) return "text/plain";

  return "application/octet-stream";
}

export async function decryptFile(encryptedBlob, ivB64, encryptedAesKeyB64) {
  if (!encryptedBlob) throw new Error("encryptedBlob required");
  const privateKey = await getRsaPrivateKey();
  if (!privateKey) throw new Error("RSA private key missing");

  const encryptedAesKeyAb = base64ToAb(encryptedAesKeyB64);

  const rawAesKey = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    encryptedAesKeyAb
  );

  const aesKey = await crypto.subtle.importKey(
    "raw",
    rawAesKey,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  const iv = Uint8Array.from(atob(ivB64), (c) => c.charCodeAt(0));
  const encryptedBuffer = await encryptedBlob.arrayBuffer();

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    aesKey,
    encryptedBuffer
  );


  const mime = detectMime(decryptedBuffer);
  return new Blob([decryptedBuffer], { type: mime });
}
