import { NextResponse } from "next/server";

// Placeholder until Stripe is wired up (Phase 3).
// Will create a Stripe Checkout session and redirect the member to pay.
export async function POST(req: Request) {
  return NextResponse.redirect(new URL("/members?checkout=soon", req.url), 303);
}
