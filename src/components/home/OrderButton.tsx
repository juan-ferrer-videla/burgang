"use client";

import { payMethodAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import React, { FC } from "react";

export const OrderButton: FC<{
  order: {
    count: number;
    title: string;
    isCeliac: boolean;
    isVeggie: boolean;
    price_card: number;
    price_cash: number;
    id: string;
  }[];
}> = ({ order }) => {
  const payMethod = useAtomValue(payMethodAtom);
  let string = order.reduce((acc, { count, isCeliac, isVeggie, title }) => {
    acc += `${title.toUpperCase()} -- ${isCeliac ? "Sin TACC -- " : ""} ${
      isVeggie ? "Veggie -- " : ""
    }${count}\n`;
    return acc;
  }, "");
  string += `\nMétodo de pago: ${
    payMethod === "cash" ? "Efectivo" : "Otro método"
  }`;
  const text = encodeURI(string);
  return (
    <a
      href={`https://wa.me/+5492615332607?text=${text}`}
      className="mx-auto mt-6 flex max-w-xs justify-center rounded bg-black px-6 py-2 text-lg font-bold uppercase text-primary active:scale-95"
      target="_blank"
    >
      Pedir
    </a>
  );
};
