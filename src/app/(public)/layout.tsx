import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealManager from "@/components/RevealManager";
import CustomCursor from "@/components/CustomCursor";

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
      <RevealManager />
      <CustomCursor />
    </>
  );
}
