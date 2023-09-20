import Image from "next/image";
import burgang from "@/assets/Burgang.png";
import { Cart } from "@/components/home/Cart";
import { Suspense } from "react";
import { OpenButton } from "@/components/home/OpenButton";
import { InstagramIcon } from "@/components/Icons/InstagramIcon";
import OrderWrapper from "@/components/home/OrderWrapper";

export const revalidate = 20;

export default function Page() {
  return (
    <>
      <header className="sticky top-0 z-50  border-b border-b-zinc-500/30 bg-zinc-950 px-4 py-2 sm:py-4">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between">
          <OpenButton />
          <nav>
            <ul>
              <li>
                <a href="https://www.instagram.com/burgang.ar/" target="_blank">
                  <InstagramIcon className="stroke-primary" size={"lg"} />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-screen-3xl px-4 font-inter sm:px-8 md:px-12 lg:px-16">
        <h1 className="sr-only">Burgang</h1>
        <Image
          src={burgang}
          alt="Burgang logo"
          className="lg:py-18 mx-auto w-full max-w-4xl py-6 drop-shadow-custom sm:py-10 md:py-14"
        />
        <Cart />
      </main>
      <footer className="my-2 text-center font-inter text-sm text-primary">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://juan-ferrer.vercel.app/"
        >
          powered by Juan Ferrer
        </a>
      </footer>
      <OrderWrapper />
    </>
  );
}
