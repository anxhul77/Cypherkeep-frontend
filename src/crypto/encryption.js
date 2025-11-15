import { abToBase64 } from "../utils/base64";
import { getRsaPublicKeyJwk } from "./keymanager";

export async function encryptFile(file) {
  const aesKey = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const fileBuffer = await file.arrayBuffer();

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    fileBuffer
  );

  const encryptedBlob = new Blob([encryptedBuffer], { type: "application/octet-stream" });

 
  return { encryptedBlob, aesKey, iv };
}

export async function encryptAesKey(aesKey) {
  const rsaPublicKeyJwk = await getRsaPublicKeyJwk();
  if (!rsaPublicKeyJwk) throw new Error("RSA public key not found in IndexedDB");

  const rsaPublicKey = await crypto.subtle.importKey(
    "jwk",
    rsaPublicKeyJwk,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );

  const rawAesKey = await crypto.subtle.exportKey("raw", aesKey);
  const encryptedKeyBuffer = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    rsaPublicKey,
    rawAesKey
  );

  return abToBase64(encryptedKeyBuffer);
}
