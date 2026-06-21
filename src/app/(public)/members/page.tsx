import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatDate } from "@/lib/episodes";
import MemberAuth from "./MemberAuth";
import SignOutButton from "./SignOutButton";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  // If Supabase isn't configured on this deploy, show a graceful state
  // instead of crashing the page.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <Shell status="Members · Coming soon">
        <h1 className="font-display font-black tracking-tightest leading-[0.86] text-display-sm">
          <span className="block">The other</span>
          <span className="block italic text-signal font-normal">
            conversation.
          </span>
        </h1>
        <p className="mt-8 font-display text-xl md:text-2xl leading-snug text-bone/85 tracking-snug max-w-2xl">
          A second tape — longer, heavier, unreleased. Member access is opening
          soon.
        </p>
      </Shell>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ── Logged OUT: pitch + auth ──────────────────────────────
  if (!user) {
    return (
      <Shell status="Locked · Members only">
        <h1 className="font-display font-black tracking-tightest leading-[0.86] text-display-sm">
          <span className="block">The other</span>
          <span className="block italic text-signal font-normal">
            conversation.
          </span>
        </h1>
        <p className="mt-8 font-display text-xl md:text-2xl leading-snug text-bone/85 tracking-snug max-w-2xl">
          A second tape. Always longer. Often heavier. Members get the
          unreleased cuts, raw tapes, behind-the-scenes, and every episode
          before it drops publicly.
        </p>
        <div className="mt-12">
          <MemberAuth />
        </div>
      </Shell>
    );
  }

  // ── Logged IN: check subscription ─────────────────────────
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_subscriber, full_name")
    .eq("id", user.id)
    .single();

  if (!profile?.is_subscriber) {
    return (
      <Shell status="Signed in · Not a member yet">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.72rem] tracking-[0.22em] text-ghost uppercase">
            {user.email}
          </span>
          <SignOutButton />
        </div>
        <h1 className="mt-8 font-display font-black tracking-tightest leading-[0.86] text-display-sm">
          <span className="block">One step</span>
          <span className="block italic text-signal font-normal">away.</span>
        </h1>
        <p className="mt-8 font-display text-xl md:text-2xl leading-snug text-bone/85 tracking-snug max-w-2xl">
          Become a member for <span className="text-signal">$5/month</span> to
          unlock the vault — raw tapes, behind-the-scenes, and early access.
        </p>
        <form action="/api/checkout" method="POST" className="mt-10">
          <button
            type="submit"
            className="bg-signal text-ink px-7 py-4 font-mono text-[0.74rem] tracking-[0.22em] uppercase hover:bg-bone transition-colors"
          >
            Become a member · $5/mo →
          </button>
        </form>
        <p className="mt-4 font-mono text-[0.78rem] text-ghost">
          Secure checkout. Cancel anytime.
        </p>
      </Shell>
    );
  }

  // ── Subscriber: the vault ─────────────────────────────────
  const { data: posts } = await supabase
    .from("posts")
    .select("*, post_files(*)")
    .eq("published", true)
    .order("created_at", { ascending: false });

  // Sign time-limited download links for attached files (subscriber confirmed above)
  const admin = createAdminClient();
  const signedUrls: Record<string, string> = {};
  for (const p of posts ?? []) {
    for (const f of (p.post_files ?? []) as {
      id: string;
      file_path: string;
    }[]) {
      const { data } = await admin.storage
        .from("member-content")
        .createSignedUrl(f.file_path, 3600);
      if (data?.signedUrl) signedUrls[f.id] = data.signedUrl;
    }
  }

  return (
    <Shell status="Member · Vault open">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.72rem] tracking-[0.22em] text-signal uppercase">
          ● Member access
        </span>
        <SignOutButton />
      </div>
      <h1 className="mt-8 font-display font-black tracking-tightest leading-[0.86] text-display-sm">
        The <span className="italic text-signal font-normal">vault.</span>
      </h1>

      {!posts || posts.length === 0 ? (
        <p className="mt-10 font-mono text-sm text-ghost">
          Nothing here yet — new drops coming soon.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <article
              key={p.id}
              className="border border-edge p-6 hover:border-signal transition-colors"
            >
              <div className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.22em] text-ghost uppercase">
                <span className="text-signal">{p.kind}</span>
                <span>·</span>
                <span>{formatDate(p.created_at)}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl leading-tight">
                {p.title}
              </h2>
              {p.body && (
                <p className="mt-3 font-mono text-[0.85rem] text-ghost leading-relaxed whitespace-pre-wrap">
                  {p.body}
                </p>
              )}
              {p.video_url && (
                <a
                  href={p.video_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block font-mono text-[0.72rem] tracking-[0.22em] uppercase text-signal hover:text-bone transition-colors"
                >
                  Watch →
                </a>
              )}
              {(p.post_files ?? []).map(
                (f: { id: string; file_name: string }) =>
                  signedUrls[f.id] ? (
                    <a
                      key={f.id}
                      href={signedUrls[f.id]}
                      className="mt-2 block font-mono text-[0.72rem] text-ghost hover:text-signal transition-colors"
                    >
                      ↓ {f.file_name}
                    </a>
                  ) : null
              )}
            </article>
          ))}
        </div>
      )}
    </Shell>
  );
}

function Shell({
  status,
  children,
}: {
  status: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative scanlines vignette min-h-[80vh]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-14 pb-24">
        <div className="flex items-center justify-between font-mono text-[0.74rem] tracking-[0.22em] text-ghost uppercase">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-signal rounded-full animate-flicker" />
            Members
          </span>
          <span>{status}</span>
        </div>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
