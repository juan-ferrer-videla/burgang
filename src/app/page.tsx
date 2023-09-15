import Image from "next/image";
import burgang from "@/assets/Burgang.png";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { Cart } from "@/components/home/Cart";
import { Suspense } from "react";
import Order from "@/components/home/Order";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50  border-b border-b-zinc-500/30 bg-zinc-950 px-4 py-2">
        <div className="mx-auto flex max-w-screen-3xl items-center justify-between">
          <button className="rounded bg-primary px-6 py-2  font-bold uppercase text-black active:scale-95">
            Tu pedido
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-screen-3xl px-4 font-inter sm:px-8 md:px-12 lg:px-16">
        <h1 className="sr-only">Burgang</h1>
        <Image
          src={burgang}
          alt="Burgang logo"
          className="lg:py-18 mx-auto w-full max-w-4xl py-6 drop-shadow-custom sm:py-10 md:py-14"
        />
        <Suspense fallback="loading...">
          <Cart />
        </Suspense>
      </main>
      <Order />
    </>
  );
}
