import { NextResponse } from "next/server";
import { setAuthCookie, verifyPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as {
    password?: string;
  };

  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "Missing password" }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  await setAuthCookie();
  return NextResponse.json({ ok: true });
}
