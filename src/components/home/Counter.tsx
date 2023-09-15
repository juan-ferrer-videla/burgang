"use client";

import React, { FC, useMemo } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { cartAtom } from "@/atoms";
import { PlusIcon } from "../Icons/PlusIcon";
import { MinusIcon } from "../Icons/MinusIcon";

export const Counter: FC<{
  id: string;
  title: string;
  price_cash: number;
  price_card: number;
}> = ({ id, title, price_card, price_cash }) => {
  const count = useAtomValue(cartAtom)[id]?.count || 0;
  const setCount = useSetAtom(cartAtom);
  const decrement = () => {
    if (count < 1) return;
    setCount((prev) => ({
      ...prev,
      [id]: { ...prev[id], count: prev[id].count - 1 },
    }));
  };
  const increment = () => {
    setCount((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        count: prev[id]?.count ? prev[id].count + 1 : 1,
        title,
        price_card,
        price_cash,
      },
    }));
  };

  return (
    <div className="mb-4 flex items-center justify-center gap-x-2">
      <button className="rounded bg-black p-1 text-primary" onClick={decrement}>
        <MinusIcon />
      </button>
      <p className="min-w-[3ch] text-lg font-semibold md:text-2xl">{count}</p>
      <button className="rounded bg-black p-1 text-primary" onClick={increment}>
        <PlusIcon />
      </button>
    </div>
  );
};
