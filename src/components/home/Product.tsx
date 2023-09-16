import { TProduct, TSection } from "@/types";
import React, { type FC } from "react";
import Price from "./Price";
import { Counter } from "./Counter";
import ProductOptions from "./ProductOptions";

export const Product: FC<TProduct & { special: TSection["special"] }> = ({
  description,
  discount,
  id,
  price_card,
  price_cash,
  special,
  title,
}) => {
  return (
    <li
      key={id}
      className="mb-4 flex flex-col items-center border-b-2 border-black pb-6 last-of-type:border-b-0"
    >
      <div className="mb-4">
        <h3
          className={`mb-1 font-black uppercase ${
            special
              ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          }`}
        >
          {title}
        </h3>
        {description && (
          <p
            className={
              special
                ? "font-shadows font-semibold uppercase italic sm:text-lg md:text-xl lg:text-2xl"
                : "font-shadows text-sm font-semibold uppercase italic sm:text-base md:text-lg lg:text-xl"
            }
          >
            {description}
          </p>
        )}
      </div>
      <Price
        discount={discount}
        price_cash={price_cash}
        price_card={price_card}
      />
      <Counter
        id={id}
        title={title}
        price_card={price_card}
        price_cash={price_cash}
      />
      {special && <ProductOptions id={id} />}
    </li>
  );
};