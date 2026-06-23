import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealManager from "@/components/RevealManager";
import ScrollProgress from "@/components/ScrollProgress";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      {/* Clearance so the fixed scrubber doesn't cover the footer */}
      <div aria-hidden className="h-11" />
      <RevealManager />
      <ScrollProgress />
    </>
  );
}
