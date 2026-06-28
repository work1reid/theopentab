import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Collects founding-member emails into the locked-down `waitlist` table.
// Uses the service-role key (server only) so the table needs no anon access.
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}) as { email?: string });

  const clean = (email ?? "").toString().trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return NextResponse.json(
      { error: "Waitlist isn't available right now." },
      { status: 503 },
    );
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("waitlist")
    .upsert({ email: clean, source: "members" }, { onConflict: "email" });

  if (error) {
    return NextResponse.json(
      { error: "Something went wrong — try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
