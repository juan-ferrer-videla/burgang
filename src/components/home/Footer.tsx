import React from "react";

export const Footer = () => {
  return (
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
            <p>Rondeau, Adolfo Calle y, 5521 Guaymallén</p>
          </li>
        </ul>
        <div className="my-6">
          <h4 className="font-quicksands text-xl text-primary">Horarios</h4>
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
  );
};
