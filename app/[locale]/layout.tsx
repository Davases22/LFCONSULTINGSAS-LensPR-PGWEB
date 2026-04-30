import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { hasBlogsAvailable } from "./(helpers)/getBlogs";

export const metadata = {
  title: "LensPR",
  description:
    "Firma boutique de relaciones públicas especializada en el sector tecnología, startups y finanzas.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  // Intent: mostrar la pestaña de Blog en el header cuando haya blogs publicados.
  // Pero si la comprobación contra Supabase falla por entorno (dev) o no hay blogs
  // queremos permitir mostrar la pestaña de todas formas para facilitar el flujo
  // de trabajo. Por eso usamos un fallback a `true` cuando ocurra un error.
  let showBlogInNav = true;
  try {
    const available = await hasBlogsAvailable();
    // Si explicitamente no hay blogs, por ahora dejamos la pestaña visible
    // para que el enlace funcione y la funcionalidad pueda ser testeada.
    showBlogInNav = available ?? true;
  } catch (err) {
    console.error(
      "Error comprobando disponibilidad de blogs, mostrando la pestaña por defecto",
      err
    );
    showBlogInNav = true;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Rubik+Vinyl&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="flex flex-col h-[100dvh] font-roboto bg-white dark:bg-zinc-900 dark:text-white">
          <Header showBlog={showBlogInNav} />
          <main className="flex-grow pt-32 md:pt-36">{children}</main>
          <Footer locale={locale} />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
