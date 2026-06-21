import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Handles the link in the confirmation email:
// exchanges the code for a session (logs them in) and sends them to /members.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/members";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Something went wrong — send them to members to log in manually.
  return NextResponse.redirect(`${origin}/members?error=confirm`);
}
