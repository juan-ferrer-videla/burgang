import { TProduct } from "@/types";
import React, { FC } from "react";

export const PriceCard: FC<{ price_card: number; price_cash: number }> = ({
  price_card,
  price_cash,
}) => (
  <div className="mb-2 flex gap-x-3">
    <div className="grid place-content-center rounded-full border-2 border-black px-6 py-1 font-semibold sm:text-lg  md:text-xl lg:text-2xl">
      <small className="text-xs">Efectivo</small>
      <p className="italic">${price_cash}</p>
    </div>
    {price_card > 0 && (
      <div className="grid place-content-center rounded-full border-2 border-black bg-black px-6 py-1 font-semibold text-primary sm:text-lg md:text-xl lg:text-2xl">
        <small className="text-xs">Otro método</small>
        <p className="italic">${price_card}</p>
      </div>
    )}
  </div>
);

const Price: FC<Pick<TProduct, "discount" | "price_card" | "price_cash">> = ({
  discount,
  price_card,
  price_cash,
}) => {
  return discount ? (
    <div className="mb-3 flex items-center justify-center gap-x-2 md:mb-4">
      <small className=" sm:text-base md:text-lg lg:text-xl">{discount}%</small>
      <PriceCard price_cash={price_cash} price_card={price_card} />
    </div>
  ) : (
    <div className="mb-3 md:mb-4">
      <PriceCard price_cash={price_cash} price_card={price_card} />
    </div>
  );
};

export default Price;
