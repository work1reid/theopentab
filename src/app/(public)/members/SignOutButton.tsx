"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ghost hover:text-signal transition-colors"
    >
      Sign out
    </button>
  );
}
