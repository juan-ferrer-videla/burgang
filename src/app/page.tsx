import Image from "next/image";
import burgang from "@/assets/Burgang.png";
import { Cart } from "@/components/home/Cart";
import { OpenButton } from "@/components/home/OpenButton";
import { InstagramIcon } from "@/components/Icons/InstagramIcon";
import OrderWrapper from "@/components/home/OrderWrapper";
import { LocationIcon } from "@/components/Icons/LocationIcon";

export const revalidate = 1800;

export default function Page() {
  return (
    <>
      <header className="sticky top-0 z-50  border-b border-b-zinc-500/30 bg-zinc-950 px-4 py-2 sm:py-4">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between">
          <OpenButton />
          <nav>
            <ul className="flex items-center gap-x-2">
              <li>
                <a href="https://www.instagram.com/burgang.ar/" target="_blank">
                  <InstagramIcon
                    className="h-auto stroke-primary"
                    size={"xl"}
                  />
                </a>
              </li>
              <li>
                <a href="#location">
                  <LocationIcon className="h-auto stroke-primary" size={"xl"} />
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
      <footer className="mx-auto max-w-screen-3xl px-4 pb-4 text-center font-inter text-sm text-zinc-400 sm:px-8 md:px-12 lg:px-16">
        <section id="location">
          <h2 className="mb-4 text-3xl font-black text-primary sm:mb-8 sm:text-4xl md:mb-12 md:text-5xl">
            Donde estamos?
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            <li>
              <h3 className="mb-1 text-primary ">Godoy Cruz</h3>
              <p>Patricias Mendocinas 598.</p>
            </li>
            <li>
              <h3 className="mb-1 text-primary">Chacras / Carrodilla</h3>
              <p>San Martin 6862.</p>
            </li>
            <li>
              <h3 className="mb-1 text-primary ">Nova Market</h3>
            </li>
          </ul>
          <div className="my-6">
            <p>Martes a sabado 12 a 16.</p>
            <p>Martes a domingo 20 a 00.</p>
          </div>
        </section>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://juan-ferrer.vercel.app/"
          className="text-xs text-primary"
        >
          powered by Juan Ferrer
        </a>
      </footer>
      <OrderWrapper />
    </>
  );
}
