import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "채움 - 생활용품 재고 관리",
  description: "생활용품 재고를 직관적으로 관리하고, 품절 시 바로 주문할 수 있는 앱",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "채움",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
