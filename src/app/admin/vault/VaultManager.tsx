"use client";

import { useEffect, useState, useCallback } from "react";

type PostFile = { id: string; file_name: string; file_path: string };
type Post = {
  id: string;
  title: string;
  body: string | null;
  kind: string;
  video_url: string | null;
  members_only: boolean;
  published: boolean;
  created_at: string;
  post_files: PostFile[];
};

const KINDS = [
  { v: "post", label: "Post" },
  { v: "video", label: "Video" },
  { v: "bts", label: "Behind the scenes" },
  { v: "early", label: "Early access" },
];

export default function VaultManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // new post form
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [kind, setKind] = useState("post");
  const [videoUrl, setVideoUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/posts");
    const data = await res.json();
    if (res.ok) setPosts(data.posts ?? []);
    else setErr(data.error ?? "Failed to load");
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function createPost(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    setErr(null);
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        body,
        kind,
        video_url: videoUrl || null,
        members_only: true,
        published,
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) return setErr(data.error ?? "Failed to create");
    setTitle("");
    setBody("");
    setVideoUrl("");
    setKind("post");
    setPublished(true);
    load();
  }

  async function togglePublish(p: Post) {
    await fetch(`/api/admin/posts/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !p.published }),
    });
    load();
  }

  async function remove(p: Post) {
    if (!confirm(`Delete "${p.title}"? This can't be undone.`)) return;
    await fetch(`/api/admin/posts/${p.id}`, { method: "DELETE" });
    load();
  }

  async function uploadFile(postId: string, file: File) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("post_id", postId);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setErr(d.error ?? "Upload failed");
    }
    load();
  }

  return (
    <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="font-mono text-[0.72rem] tracking-[0.22em] text-ghost uppercase">
            Studio · Members vault
          </div>
          <h1 className="mt-2 font-display text-4xl tracking-snug">
            The <span className="italic text-signal">vault.</span>
          </h1>
        </div>
        <a
          href="/admin/dashboard"
          className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost hover:text-signal"
        >
          ← Episodes
        </a>
      </div>

      {err && (
        <div className="mb-6 border border-red-500/60 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-300">
          {err}
        </div>
      )}

      {/* New post */}
      <form
        onSubmit={createPost}
        className="border border-edge p-6 mb-12 space-y-4"
      >
        <div className="font-mono text-[0.72rem] tracking-[0.22em] text-signal uppercase">
          New drop
        </div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent border border-edge focus:border-signal px-4 py-3 font-mono text-sm text-bone placeholder:text-ghost focus:outline-none"
        />
        <textarea
          placeholder="Write something… (optional)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="w-full bg-transparent border border-edge focus:border-signal px-4 py-3 font-mono text-sm text-bone placeholder:text-ghost focus:outline-none"
        />
        <div className="flex flex-wrap gap-4">
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className="bg-ink border border-edge px-4 py-3 font-mono text-sm text-bone focus:outline-none focus:border-signal"
          >
            {KINDS.map((k) => (
              <option key={k.v} value={k.v}>
                {k.label}
              </option>
            ))}
          </select>
          <input
            placeholder="Video URL (YouTube/Vimeo, optional)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="flex-1 min-w-[240px] bg-transparent border border-edge focus:border-signal px-4 py-3 font-mono text-sm text-bone placeholder:text-ghost focus:outline-none"
          />
        </div>
        <label className="flex items-center gap-2 font-mono text-[0.78rem] text-ghost">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Publish immediately (uncheck to save as draft)
        </label>
        <button
          type="submit"
          disabled={saving}
          className="bg-signal text-ink px-6 py-3 font-mono text-[0.72rem] tracking-[0.22em] uppercase hover:bg-bone transition-colors disabled:opacity-50"
        >
          {saving ? "…" : "Create drop →"}
        </button>
      </form>

      {/* Existing posts */}
      <div className="font-mono text-[0.72rem] tracking-[0.22em] text-ghost uppercase mb-4">
        Published & drafts
      </div>
      {loading ? (
        <p className="font-mono text-sm text-ghost">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="font-mono text-sm text-ghost">
          Nothing yet — create your first drop above.
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((p) => (
            <div key={p.id} className="border border-edge p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] uppercase">
                    <span className="text-signal">{p.kind}</span>
                    <span
                      className={p.published ? "text-green-400" : "text-ghost"}
                    >
                      {p.published ? "● published" : "○ draft"}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl">{p.title}</h3>
                  {p.post_files?.length > 0 && (
                    <div className="mt-2 font-mono text-[0.72rem] text-ghost">
                      {p.post_files.length} file
                      {p.post_files.length > 1 ? "s" : ""} attached
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 gap-3 font-mono text-[0.7rem] tracking-[0.2em] uppercase">
                  <button
                    onClick={() => togglePublish(p)}
                    className="text-ghost hover:text-signal"
                  >
                    {p.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => remove(p)}
                    className="text-ghost hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <label className="mt-4 inline-block font-mono text-[0.72rem] text-ghost cursor-pointer hover:text-signal">
                + Attach file
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadFile(p.id, f);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
