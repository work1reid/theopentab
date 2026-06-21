import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// Upload a file to the private member-content bucket and attach it to a post.
export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const postId = form?.get("post_id");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const sb = createAdminClient();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${Date.now()}-${safeName}`;

  const { error: upErr } = await sb.storage
    .from("member-content")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (upErr) {
    return NextResponse.json({ error: upErr.message }, { status: 500 });
  }

  // Attach to a post if one was given
  if (typeof postId === "string" && postId) {
    await sb.from("post_files").insert({
      post_id: postId,
      file_path: path,
      file_name: file.name,
    });
  }

  return NextResponse.json({ path, file_name: file.name });
}
