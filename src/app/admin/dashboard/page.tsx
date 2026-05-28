import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import Dashboard from "./Dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!(await isAuthed())) redirect("/admin");
  return <Dashboard />;
}
