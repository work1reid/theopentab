import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// Update a post (e.g. toggle published) — admin
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const sb = createAdminClient();
  const { data, error } = await sb
    .from("posts")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data });
}

// Delete a post (and its files) — admin
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const sb = createAdminClient();

  // remove any stored files first
  const { data: files } = await sb
    .from("post_files")
    .select("file_path")
    .eq("post_id", id);
  if (files?.length) {
    await sb.storage.from("member-content").remove(files.map((f) => f.file_path));
  }

  const { error } = await sb.from("posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
