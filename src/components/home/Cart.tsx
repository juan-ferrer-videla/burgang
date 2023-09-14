import { getSections } from "@/lib/services/sections";
import React from "react";
import { Counter } from "./Counter";

export const Cart = async () => {
  const sections = await getSections();

  return (
    <ul className="mx-auto my-10 grid max-w-7xl gap-y-3 rounded bg-primary p-4 text-center text-black sm:p-8 md:p-12 lg:p-16">
      {sections.map(({ id, title, description, products }) => (
        <li key={id}>
          <h2 className=" mb-8 text-5xl font-black uppercase sm:mb-12 sm:text-6xl md:mb-14 md:text-7xl lg:mb-16 lg:text-8xl">
            {title}
          </h2>
          {description && <p>{description}</p>}
          <ul className="grid gap-y-4">
            {products.map(({ title, description, price, discount, id }) => (
              <li
                key={id}
                className="mb-4 border-b border-black pb-6 last-of-type:border-b-0"
              >
                <h3 className="mb-2 text-2xl font-black uppercase sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl">
                  {title}
                </h3>
                {description && (
                  <p className="mb-2 font-semibold italic sm:text-xl md:mb-4 md:text-2xl lg:text-3xl">
                    {description}
                  </p>
                )}
                {discount ? (
                  <div className="mb-2 flex items-center justify-center gap-x-2 md:mb-4">
                    <small className="line-through sm:text-base md:text-lg lg:text-xl">
                      ${price}
                    </small>
                    <p className="font-semibold sm:text-lg  md:text-xl lg:text-2xl">
                      ${((100 - discount) * price) / 100}
                    </p>
                  </div>
                ) : (
                  <p className="mb-2 font-semibold sm:text-lg md:mb-4 md:text-xl lg:text-2xl">
                    ${price}
                  </p>
                )}
                <Counter id={id} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
