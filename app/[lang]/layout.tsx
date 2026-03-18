import Navbar from '@/components/ui/Navbar';

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
      <Navbar lang={lang} />
      <main className="flex-1 w-full mx-auto max-w-[1600px] px-6 py-8 md:px-12 md:py-16">
        {children}
      </main>
    </div>
  );
}
