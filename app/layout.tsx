import type { Metadata } from "next";
import { DM_Serif_Display, Inter, Allura } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThirdPartyScripts from "./components/third-party-scripts";
import "./globals.css";

// Meta Pixel NOVO — Casa da Chita / Faça Você Mesma 3.0
const META_PIXEL_ID = "1536814544717090";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
  display: "swap",
});

const SITE_URL = "https://casa-da-chita.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Faça Você Mesma 3.0 — Curso de Bolsas Bordadas em Chita | Casa da Chita",
  description:
    "Em 7 dias, sua primeira bolsa bordada — mesmo que você nunca tenha pegado uma agulha. Com a Jacira, da Casa da Chita.",
  openGraph: {
    title: "Faça Você Mesma 3.0 — Bolsa bordada em 7 dias",
    description:
      "Mesmo que você nunca tenha pegado uma agulha. Curso completo com a Jacira + Encontro Ao Vivo + 14 dias de garantia.",
    url: SITE_URL,
    siteName: "Casa da Chita",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og/og-image.png",
        width: 1080,
        height: 1080,
        alt: "Faça Você Mesma 3.0 — Curso de bolsas bordadas em chita com a Jacira, da Casa da Chita",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faça Você Mesma 3.0 — Bolsa bordada em 7 dias",
    description:
      "Mesmo que você nunca tenha pegado uma agulha. Com a Jacira, da Casa da Chita.",
    images: ["/og/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSerif.variable} ${inter.variable} ${allura.variable}`}
      // Extensões de navegador (LanguageTool, Grammarly, etc.) injetam
      // atributos no <html> antes do React hidratar. Esse flag silencia
      // só os atributos do próprio <html> — nada dentro dele é afetado.
      suppressHydrationWarning
    >
      <head />
      {/* Pixel + Clarity + Utmify carregam só na 1ª interação (ou após
          um timeout de segurança) — ver third-party-scripts.tsx.
          Isso tira ~900ms de execução de JS do caminho crítico do LCP. */}
      <ThirdPartyScripts />
      <body>
        {/* Fallback pra navegadores sem JavaScript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
