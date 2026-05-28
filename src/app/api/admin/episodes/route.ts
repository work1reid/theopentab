import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { readEpisodes, writeEpisodes } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { episodes, sha } = await readEpisodes();
    return NextResponse.json({ episodes, sha });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Read failed" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => null)) as {
    episodes?: unknown;
    sha?: string;
    message?: string;
  } | null;

  if (!body || !Array.isArray(body.episodes) || !body.sha) {
    return NextResponse.json(
      { error: "Body must include { episodes: [...], sha: '...' }" },
      { status: 400 }
    );
  }

  try {
    const result = await writeEpisodes(body.episodes, body.sha, body.message);
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Write failed" },
      { status: 500 }
    );
  }
}
