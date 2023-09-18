import "./globals.css";
import { Inter, Merienda } from "next/font/google";
import { type Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const shadows = Merienda({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-shadows",
});

const metadataTitle = "Burgang";
const metadataDescription =
  "Los que conocen saben, #Burgang campeón de la mejor hamburguesa de Argentina · Burgers premium & con estilo ⛓️ · Pocas cosas tan piolas como BG con la Gang ...";

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
    <html lang="es" suppressHydrationWarning>
      <body className={`${shadows.variable} ${inter.variable}  min-h-screen `}>
        {children}
      </body>
    </html>
  );
}
