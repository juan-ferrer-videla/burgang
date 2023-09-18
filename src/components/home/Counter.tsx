"use client";

import React, { type FC } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { cartAtom } from "@/atoms";
import { PlusIcon } from "../Icons/PlusIcon";
import { MinusIcon } from "../Icons/MinusIcon";
import { TOption } from "@/types";

export const Counter: FC<{
  option: TOption ;
  id: string;
  title: string;
  price_cash: number;
  price_card: number;
}> = ({ title, price_card, price_cash, option }) => {
  const count = useAtomValue(cartAtom)[title + option]?.count || 0;
  const setCount = useSetAtom(cartAtom);
  const decrement = () => {
    if (count < 1) return;
    setCount((prev) => ({
      ...prev,
      [title + option]: {
        ...prev[title + option],
        count: prev[title + option].count - 1,
        option,
      },
    }));
  };
  const increment = () => {
    setCount((prev) => ({
      ...prev,
      [title + option]: {
        ...prev[title + option],
        count: prev[title + option]?.count ? prev[title + option].count + 1 : 1,
        title,
        price_card,
        price_cash,
        option,
      },
    }));
  };

  return (
    <div className="mb-4">
      <h3 className="mb-1 font-shadows font-bold">{option}</h3>
      <div className="flex items-center justify-center gap-x-2">
        <button
          className="rounded bg-black p-1 text-primary"
          onClick={decrement}
        >
          <MinusIcon />
        </button>
        <p className="min-w-[3ch] text-xl font-black sm:text-2xl md:text-3xl">
          {count}
        </p>
        <button
          className="rounded bg-black p-1 text-primary"
          onClick={increment}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};
