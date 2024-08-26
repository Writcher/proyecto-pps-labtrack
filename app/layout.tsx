import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./components/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMS",
  description: "Proyecto PPS Gimenez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        
          {children}
        
      </body>
    </html>
  );
}
