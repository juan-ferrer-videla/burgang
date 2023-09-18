import { TProduct, TSection } from "@/types";
import React, { type FC } from "react";
import Price from "./Price";
import { Counter } from "./Counter";

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
      className="md:b sm mb-4 flex flex-col items-center border-b-2 border-black pb-6 last-of-type:border-b-0 md:border-b-4"
    >
      <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-7 ">
        <h3
          className={`mb-1 font-black uppercase sm:mb-2 md:mb-3 ${
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

      {special ? (
        <div className="grid md:grid-cols-2 md:gap-x-14 md:gap-y-4">
          <Counter
            option="carne"
            id={id}
            title={title}
            price_card={price_card}
            price_cash={price_cash}
          />
          <Counter
            option="sin tacc"
            id={id}
            title={title}
            price_card={price_card}
            price_cash={price_cash}
          />
          <Counter
            option="veggie"
            id={id}
            title={title}
            price_card={price_card}
            price_cash={price_cash}
          />
          <Counter
            option="veggie y sin tacc"
            id={id}
            title={title}
            price_card={price_card}
            price_cash={price_cash}
          />
        </div>
      ) : (
        <Counter
          option=""
          id={id}
          title={title}
          price_card={price_card}
          price_cash={price_cash}
        />
      )}
    </li>
  );
};
