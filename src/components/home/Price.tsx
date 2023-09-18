import { TProduct } from "@/types";
import React, { FC } from "react";

export const PriceCard: FC<{
  price_card: number;
  price_cash: number;
  discount: number;
}> = ({ price_card, price_cash, discount }) => (
  <div className="mb-2 flex gap-x-5 sm:gap-x-6 md:gap-x-8 lg:gap-x-10">
    <div className="grid place-content-center rounded-full font-semibold sm:text-lg  md:text-xl lg:text-2xl">
      <small className="font-bold sm:text-lg md:text-xl lg:text-2xl">
        Efectivo
      </small>
      <p className="text-lg font-black sm:text-xl md:text-2xl">
        ${((100 - discount) * price_cash) / 100}
      </p>
    </div>
    {price_card > 0 && (
      <div className="grid place-content-center rounded-full font-semibold sm:text-lg md:text-xl lg:text-2xl">
        <small className="font-bold sm:text-lg md:text-xl lg:text-2xl">
          Otro método
        </small>
        <p className="text-lg font-black sm:text-xl md:text-2xl">
          ${((100 - discount) * price_card) / 100}
        </p>
      </div>
    )}
  </div>
);

const Price: FC<Pick<TProduct, "discount" | "price_card" | "price_cash">> = ({
  discount,
  price_card,
  price_cash,
}) => {
  return (
    <>
      {discount > 0 && (
        <small className="mb-4 rounded-full bg-black px-2 py-1 text-primary sm:text-base md:text-lg lg:text-xl">
          {discount}% OFF
        </small>
      )}
      <div className="mb-3 flex items-center justify-center gap-x-2 md:mb-4">
        <PriceCard
          price_cash={price_cash}
          price_card={price_card}
          discount={discount}
        />
      </div>
    </>
  );
};

export default Price;
