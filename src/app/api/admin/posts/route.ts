import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// List all posts (admin)
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("posts")
    .select("*, post_files(*)")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data });
}

// Create a post (admin)
export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!body || typeof body.title !== "string" || !body.title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const sb = createAdminClient();
  const { data, error } = await sb
    .from("posts")
    .insert({
      title: body.title,
      body: body.body ?? null,
      kind: body.kind ?? "post",
      video_url: body.video_url ?? null,
      cover_image: body.cover_image ?? null,
      members_only: body.members_only ?? true,
      published: body.published ?? false,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data });
}
