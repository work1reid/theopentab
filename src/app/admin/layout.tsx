import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio · The Open Tab",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-ink text-bone min-h-screen">{children}</div>;
}
