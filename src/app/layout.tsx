import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { type Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const metadataTitle = "Yummy";
const metadataDescription = "Aqui podras pedir tu comida";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  colorScheme: "dark",
  creator: "Juan Ferrer",
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    locale: "es",
    url: "http://burgang.vercel.app/",
  },
  twitter: { title: metadataTitle, description: metadataDescription },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className}  min-h-screen `}>{children}</body>
    </html>
  );
}
