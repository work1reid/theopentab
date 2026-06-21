"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Episode = {
  number: string;
  slug: string;
  guest: string;
  title: string;
  tagline: string;
  description: string;
  date: string;
  duration: string;
  city: string;
  released: boolean;
  image: string;
  spotify: string;
  apple: string;
  youtube: string;
  highlights: string[];
};

const blank: Episode = {
  number: "",
  slug: "",
  guest: "",
  title: "",
  tagline: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  duration: "",
  city: "Forbes, NSW",
  released: false,
  image: "",
  spotify: "",
  apple: "",
  youtube: "",
  highlights: [],
};

export default function Dashboard() {
  const router = useRouter();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [sha, setSha] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<Episode>(blank);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/episodes", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setEpisodes(data.episodes);
      setSha(data.sha);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }

  async function save(updated: Episode[], message: string) {
    setSaving(true);
    setErr(null);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/episodes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ episodes: updated, sha, message }),
      });
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setEpisodes(updated);
      setSha(data.sha);
      setStatus(
        `Committed. Vercel rebuild starting — live in ~30–60 sec. ${
          data.commitUrl ? "View commit ↗" : ""
        }`
      );
      setEditingIdx(null);
      setDraft(blank);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function startNew() {
    setDraft({
      ...blank,
      number: nextNumber(episodes),
      date: new Date().toISOString().slice(0, 10),
    });
    setEditingIdx(-1);
  }

  function startEdit(i: number) {
    setDraft({ ...episodes[i], highlights: [...episodes[i].highlights] });
    setEditingIdx(i);
  }

  function cancelEdit() {
    setEditingIdx(null);
    setDraft(blank);
  }

  function commitDraft() {
    const cleaned: Episode = {
      ...draft,
      highlights: draft.highlights.filter((h) => h.trim().length > 0),
    };
    if (!cleaned.number || !cleaned.guest || !cleaned.slug) {
      setErr("Number, slug, and guest are required");
      return;
    }
    let updated: Episode[];
    if (editingIdx === -1) {
      updated = [cleaned, ...episodes];
    } else {
      updated = episodes.map((e, i) => (i === editingIdx ? cleaned : e));
    }
    save(
      updated,
      editingIdx === -1
        ? `admin: add ep ${cleaned.number} — ${cleaned.guest}`
        : `admin: update ep ${cleaned.number} — ${cleaned.guest}`
    );
  }

  function deleteEpisode(i: number) {
    if (!confirm(`Delete EP ${episodes[i].number} — ${episodes[i].guest}?`))
      return;
    const updated = episodes.filter((_, idx) => idx !== i);
    save(updated, `admin: remove ep ${episodes[i].number}`);
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= episodes.length) return;
    const updated = [...episodes];
    [updated[i], updated[j]] = [updated[j], updated[i]];
    save(updated, `admin: reorder`);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <section className="min-h-screen">
      <div className="border-b border-edge">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase">
              ● Studio
            </div>
            <span className="hidden sm:inline-block h-3 w-px bg-edge" />
            <div className="font-display text-xl tracking-snug">
              The Open Tab <span className="text-ghost italic">admin</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/admin/vault"
              className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-signal hover:text-bone transition-colors"
            >
              Members vault →
            </a>
            <button
              onClick={logout}
              className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-ghost hover:text-signal transition-colors"
            >
              Sign out →
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12">
        {/* Status bar */}
        {(status || err) && (
          <div
            className={`mb-8 border px-5 py-4 font-mono text-xs ${
              err
                ? "border-signal/40 bg-signal/10 text-signal"
                : "border-edge bg-whisper text-bone"
            }`}
          >
            {err || status}
          </div>
        )}

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-3">
              Episodes · {episodes.length}
            </div>
            <h1 className="font-display text-4xl md:text-5xl leading-none tracking-snug">
              The <span className="italic text-signal">catalogue.</span>
            </h1>
          </div>
          {editingIdx === null && (
            <button
              onClick={startNew}
              disabled={loading || saving}
              className="font-mono text-[0.65rem] tracking-[0.22em] uppercase bg-signal text-ink px-5 py-3 hover:bg-bone transition-colors disabled:opacity-50"
            >
              + New episode
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="font-mono text-xs text-ghost py-12">
            Loading episodes from GitHub…
          </div>
        )}

        {/* Editor */}
        {editingIdx !== null && (
          <EpisodeEditor
            draft={draft}
            setDraft={setDraft}
            onSave={commitDraft}
            onCancel={cancelEdit}
            saving={saving}
            isNew={editingIdx === -1}
          />
        )}

        {/* Episode list */}
        {!loading && editingIdx === null && (
          <div className="space-y-0 border border-edge">
            {episodes.length === 0 && (
              <div className="px-6 py-12 font-mono text-xs text-ghost">
                No episodes yet. Hit "+ New episode" to add the first.
              </div>
            )}
            {episodes.map((ep, i) => (
              <div
                key={`${ep.number}-${ep.slug}`}
                className="border-b border-edge last:border-b-0 px-6 py-6 grid grid-cols-12 items-center gap-4 hover:bg-whisper transition-colors"
              >
                <div className="col-span-1 font-display text-3xl text-signal italic">
                  {ep.number}
                </div>
                <div className="col-span-5">
                  <div className="font-mono text-[0.6rem] tracking-[0.22em] text-ghost uppercase mb-1">
                    {ep.date}
                    {ep.duration ? ` · ${ep.duration}` : ""}
                  </div>
                  <div className="font-display text-lg leading-tight">
                    {ep.guest}
                  </div>
                  <div className="font-mono text-xs text-ghost mt-1 truncate">
                    {ep.title}
                  </div>
                </div>
                <div className="col-span-3 font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase">
                  /{ep.slug}
                </div>
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <button
                    onClick={() => move(i, -1)}
                    disabled={i === 0 || saving}
                    className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ghost hover:text-bone disabled:opacity-30 px-2 py-1"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === episodes.length - 1 || saving}
                    className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ghost hover:text-bone disabled:opacity-30 px-2 py-1"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => startEdit(i)}
                    disabled={saving}
                    className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-bone hover:text-signal px-3 py-1 border border-edge hover:border-signal transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEpisode(i)}
                    disabled={saving}
                    className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-ghost hover:text-signal px-3 py-1 border border-edge hover:border-signal transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-edge font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase">
          Saves commit to GitHub. Vercel auto-rebuilds. ~30–60 sec until live.
        </div>
      </div>
    </section>
  );
}

function nextNumber(episodes: Episode[]): string {
  const nums = episodes
    .map((e) => parseInt(e.number, 10))
    .filter((n) => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return String(max + 1).padStart(2, "0");
}

function EpisodeEditor({
  draft,
  setDraft,
  onSave,
  onCancel,
  saving,
  isNew,
}: {
  draft: Episode;
  setDraft: (e: Episode) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  isNew: boolean;
}) {
  function update<K extends keyof Episode>(k: K, v: Episode[K]) {
    setDraft({ ...draft, [k]: v });
  }

  return (
    <div className="border border-edge p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-1">
            {isNew ? "New" : "Edit"} · EP {draft.number || "—"}
          </div>
          <h2 className="font-display text-3xl tracking-snug">
            {isNew ? (
              <span>
                Drop a new <span className="italic text-signal">tape.</span>
              </span>
            ) : (
              <span>
                Edit <span className="italic text-signal">{draft.guest || "episode"}.</span>
              </span>
            )}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Number" hint="01, 02, etc.">
          <input
            value={draft.number}
            onChange={(e) => update("number", e.target.value)}
            className={inputCls}
            placeholder="02"
          />
        </Field>
        <Field label="Slug" hint="url-safe-name">
          <input
            value={draft.slug}
            onChange={(e) => update("slug", e.target.value)}
            className={inputCls}
            placeholder="jane-doe"
          />
        </Field>
        <Field label="Guest">
          <input
            value={draft.guest}
            onChange={(e) => update("guest", e.target.value)}
            className={inputCls}
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Date" hint="YYYY-MM-DD">
          <input
            type="date"
            value={draft.date}
            onChange={(e) => update("date", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Duration" hint="e.g. 1h 33m">
          <input
            value={draft.duration}
            onChange={(e) => update("duration", e.target.value)}
            className={inputCls}
            placeholder="1h 20m"
          />
        </Field>
        <Field label="City">
          <input
            value={draft.city}
            onChange={(e) => update("city", e.target.value)}
            className={inputCls}
            placeholder="Forbes, NSW"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Title" hint="One-line episode title">
          <input
            value={draft.title}
            onChange={(e) => update("title", e.target.value)}
            className={inputCls}
            placeholder="Jane Doe on the thing"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Tagline" hint="Short, italic-friendly subtitle">
          <input
            value={draft.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            className={inputCls}
            placeholder="What the conversation is really about."
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Description" hint="2–4 sentences for show notes">
          <textarea
            value={draft.description}
            onChange={(e) => update("description", e.target.value)}
            className={`${inputCls} min-h-[7rem] resize-y`}
            rows={4}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <Field label="Image path" hint="e.g. /ep3-cayden.jpg (file in /public)">
          <input
            value={draft.image}
            onChange={(e) => update("image", e.target.value)}
            className={inputCls}
            placeholder="/ep3-cayden.jpg"
          />
        </Field>
        <Field label="Status" hint="Released = live · off = coming soon">
          <button
            type="button"
            onClick={() => update("released", !draft.released)}
            className={`w-full text-left border px-3 py-2.5 font-mono text-sm transition-colors ${
              draft.released
                ? "border-signal text-signal"
                : "border-edge text-ghost hover:border-bone"
            }`}
          >
            {draft.released ? "● Released — live on site" : "○ Coming soon — hidden"}
          </button>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        <Field label="Spotify URL">
          <input
            value={draft.spotify}
            onChange={(e) => update("spotify", e.target.value)}
            className={inputCls}
            placeholder="https://open.spotify.com/..."
          />
        </Field>
        <Field label="Apple Podcasts URL">
          <input
            value={draft.apple}
            onChange={(e) => update("apple", e.target.value)}
            className={inputCls}
            placeholder="https://podcasts.apple.com/..."
          />
        </Field>
        <Field label="YouTube URL">
          <input
            value={draft.youtube}
            onChange={(e) => update("youtube", e.target.value)}
            className={inputCls}
            placeholder="https://youtube.com/watch?v=..."
          />
        </Field>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <div className="font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase">
            Highlights · short bullets shown on the episode page
          </div>
          <button
            onClick={() => update("highlights", [...draft.highlights, ""])}
            className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ghost hover:text-signal transition-colors"
          >
            + add
          </button>
        </div>
        <div className="space-y-2">
          {draft.highlights.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={h}
                onChange={(e) => {
                  const next = [...draft.highlights];
                  next[i] = e.target.value;
                  update("highlights", next);
                }}
                className={inputCls}
                placeholder="A standout moment"
              />
              <button
                onClick={() =>
                  update(
                    "highlights",
                    draft.highlights.filter((_, idx) => idx !== i)
                  )
                }
                className="px-3 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ghost hover:text-signal border border-edge hover:border-signal transition-colors"
              >
                ×
              </button>
            </div>
          ))}
          {draft.highlights.length === 0 && (
            <div className="font-mono text-[0.65rem] text-ghost">
              No highlights yet. Add one above.
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-edge flex items-center justify-between">
        <button
          onClick={onCancel}
          disabled={saving}
          className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-ghost hover:text-bone"
        >
          ← Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="font-mono text-[0.65rem] tracking-[0.22em] uppercase bg-signal text-ink px-6 py-3 hover:bg-bone transition-colors disabled:opacity-50"
        >
          {saving ? "Committing…" : isNew ? "Publish episode →" : "Save changes →"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono text-[0.6rem] tracking-[0.22em] text-ghost uppercase">
          {label}
        </span>
        {hint && (
          <span className="font-mono text-[0.55rem] text-ghost/60 italic">
            {hint}
          </span>
        )}
      </div>
      {children}
    </label>
  );
}

const inputCls =
  "w-full bg-transparent border border-edge focus:border-signal px-3 py-2.5 font-mono text-sm text-bone placeholder:text-ghost/60 focus:outline-none transition-colors";
