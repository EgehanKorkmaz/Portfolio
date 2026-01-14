import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/exp1.svg" sizes="any" />
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
      </body>
    </html>
  );
}
