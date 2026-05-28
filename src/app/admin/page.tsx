import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminEntry() {
  if (await isAuthed()) redirect("/admin/dashboard");
  return (
    <section className="relative scanlines min-h-[80vh]">
      <div className="mx-auto max-w-md px-6 pt-20 pb-32">
        <div className="font-mono text-[0.62rem] tracking-[0.22em] text-ghost uppercase mb-12 flex items-center justify-between">
          <span>● Restricted</span>
          <span>Admin · v1</span>
        </div>

        <h1 className="font-display text-5xl md:text-6xl leading-[0.92] tracking-snug mb-12">
          Studio<span className="italic text-signal">.</span>
        </h1>

        <LoginForm />

        <p className="mt-10 font-mono text-[0.65rem] text-ghost leading-relaxed">
          The site is public. This page is not. If you're here by accident — go
          back to <a href="/" className="text-bone hover:text-signal">the front of house</a>.
        </p>
      </div>
    </section>
  );
}
