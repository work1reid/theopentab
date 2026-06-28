import { NextResponse } from "next/server";

// Placeholder until Stripe is wired up (Phase 3).
// Will create a Stripe Checkout session and redirect the member to pay.
//
// Until then we deliberately do NOT charge anyone: founding membership is
// "opening soon" while the vault fills. We redirect back to /members with
// ?checkout=soon, which the members page reads and turns into a visible,
// honest "you're on the list — we'll email you when it opens" confirmation
// (no silent reload, no charge).
export async function POST(req: Request) {
  return NextResponse.redirect(new URL("/members?checkout=soon", req.url), 303);
}
