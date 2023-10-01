import Image from "next/image";
import burgang from "@/assets/Burgang.png";
import { Menu } from "@/components/home/Menu";
import OrderWrapper from "@/components/home/OrderWrapper";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

export const revalidate = 3600;

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-3xl px-4 font-inter sm:px-8 md:px-12 lg:px-16">
        <h1 className="sr-only">Burgang</h1>
        <Image
          src={burgang}
          alt="Burgang logo"
          className="lg:py-18 mx-auto w-full max-w-4xl py-6 drop-shadow-custom sm:py-10 md:py-14"
        />
        <Menu />
      </main>
      <Footer />
      <OrderWrapper />
    </>
  );
}
