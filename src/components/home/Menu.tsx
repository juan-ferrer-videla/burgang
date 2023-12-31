import { getSections } from "@/lib/services/sections";
import React from "react";
import { Product } from "./Product";

export const Menu = async () => {
  const sections = await getSections();

  return (
    <ul className="mx-auto my-10 grid max-w-7xl gap-y-5 text-center text-black sm:gap-y-6 md:gap-y-7 lg:gap-y-8">
      {sections.map(({ id, title, description, products, extras }) => (
        <li
          key={id}
          className="mb-4 rounded border-8 border-dashed border-black bg-primary p-6 shadow-lg shadow-primary/20  sm:mb-6 sm:p-8 md:mb-8 md:p-12 lg:mb-10 lg:p-16"
        >
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <h2
              className={`mb-2 font-black uppercase sm:mb-3 md:mb-4 lg:mb-5 ${
                extras.length > 0
                  ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                  : "font-quicksands text-4xl sm:text-5xl md:text-6xl  lg:text-7xl"
              }`}
            >
              {title}
            </h2>
            {description && (
              <p className="font-quicksands text-lg font-black uppercase italic sm:text-xl md:text-2xl lg:text-3xl">
                {description}
              </p>
            )}
          </div>
          <ul className="grid gap-y-4">
            {products.map((product) => (
              <Product
                extras={extras}
                key={product.id}
                {...product}
                special={extras.length > 0}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
