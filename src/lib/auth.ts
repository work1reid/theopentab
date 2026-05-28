import { cookies } from "next/headers";

const COOKIE_NAME = "_otat";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function hmac(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function expectedToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET not set");
  return hmac(secret, "open-tab-admin-v1");
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function setAuthCookie() {
  const token = await expectedToken();
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearAuthCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!value) return false;
  try {
    const expected = await expectedToken();
    return constantTimeEqual(value, expected);
  } catch {
    return false;
  }
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    result |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return result === 0;
}

export { COOKIE_NAME };
