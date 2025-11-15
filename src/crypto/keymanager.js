import { get, set } from "idb-keyval";

export async function generateRsaKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  const publicJwk = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
  const privateJwk = await crypto.subtle.exportKey("jwk", keyPair.privateKey);

  await set("rsaPublicKey", publicJwk);
  await set("rsaPrivateKey", privateJwk);

  return { publicJwk, privateJwk };
}

export async function getRsaPublicKeyJwk() {
  return await get("rsaPublicKey");
}

export async function getRsaPrivateKey() {
  const jwk = await get("rsaPrivateKey");
  if (!jwk) throw new Error("RSA private key not found in IndexedDB");
  return crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["decrypt"]
  );
}
