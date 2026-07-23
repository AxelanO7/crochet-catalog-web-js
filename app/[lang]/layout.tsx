import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppFab from '@/components/ui/WhatsAppFab';

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="grain-overlay" />
      <Navbar lang={lang} />
      <main className="flex-1 w-full">{children}</main>
      <Footer lang={lang} />
      <WhatsAppFab />
    </div>
  );
}
