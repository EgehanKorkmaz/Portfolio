import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google"; // 1. Yeni kütüphane eklendi

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Egehan Korkmaz | Kişisel Portfolyo & Yazılım Projeleri",
  description:
    "Egehan Korkmaz'ın kişisel web sitesi. Yazılım projeleri, blog yazıları ve iletişim bilgileri.",
  other: {
    "google-site-verification": "Zck4Vy6_J6qHsJeGIpv1Zn5-VBuYhxygai-1bMMmzis",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Eğer içeriğin Türkçe ise lang="tr" yapman SEO için daha iyidir.
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/exp1.svg" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Egehan Korkmaz",
              // KRİTİK: Eski Vercel linkini yeni .me domaininle güncelledim
              "url": "https://egehankorkmaz.me", 
              "jobTitle": "Computer Engineering Student & Software Developer",
              "sameAs": [
                "https://github.com/EgehanKorkmaz", // Buraya gerçek GitHub kullanıcı adını yazmalısın
                "https://www.linkedin.com/in/egehankorkmaz/" // Buraya gerçek LinkedIn kullanıcı adını yazmalısın
              ]
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        
        {/* 2. Manuel Script etiketlerini sildim, bu tek satır hepsinin yerini tutuyor ve daha hızlı çalışıyor */}
        <GoogleAnalytics gaId="G-PPY1J0MG1W" />
      </body>
    </html>
  );
}