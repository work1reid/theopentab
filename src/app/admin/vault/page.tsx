import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import VaultManager from "./VaultManager";

export const dynamic = "force-dynamic";

export default async function VaultAdminPage() {
  if (!(await isAuthed())) redirect("/admin");
  return <VaultManager />;
}
