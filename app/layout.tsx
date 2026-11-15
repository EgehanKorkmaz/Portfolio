import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Egehan Korkmaz | Front-End & Full-Stack Developer",
  description:
    "Portfolio of Egehan Korkmaz, Computer Engineer and Full-Stack Developer specializing in React.js, Next.js, and TypeScript.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/exp1.svg" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Egehan Korkmaz",
              url: "https://egehankorkmaz.me",
              jobTitle: "Front-End & Full-Stack Software Developer",
              sameAs: [
                "https://github.com/EgehanKorkmaz",
                "https://www.linkedin.com/in/egehan-korkmaz/",
              ],
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
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>

        <GoogleAnalytics gaId="G-PPY1J0MG1W" />
      </body>
    </html>
  );
}