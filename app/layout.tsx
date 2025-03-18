import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ENGJATO | Soluções industriais",
  description: "soluções industriais em Tarumã Sp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
