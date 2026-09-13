import { Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/common/JsonLd";
import CartDrawer from "@/features/cart/components/CartDrawer";
import AppProviders from "@/providers/AppProviders";
import { SITE_CONFIG } from "@/config/site";
import "@/styles/main.scss";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: { default: SITE_CONFIG.title, template: "%s | Yogi" },
  description: SITE_CONFIG.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "es_PE", siteName: "Yogi", title: SITE_CONFIG.title, description: SITE_CONFIG.description, images: [{ url: "/images/brand/hero.webp", width: 1536, height: 1024, alt: "Dulces Yogi" }] },
  twitter: { card: "summary_large_image", title: SITE_CONFIG.title, description: SITE_CONFIG.description, images: ["/images/brand/hero.webp"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-PE" className={montserrat.variable}>
      <body>
        <AppProviders>
          <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "Yogi", url: SITE_CONFIG.url, email: SITE_CONFIG.email, telephone: SITE_CONFIG.phone }} />
          <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: "Yogi", url: SITE_CONFIG.url, inLanguage: "es-PE" }} />
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </AppProviders>
      </body>
    </html>
  );
}
