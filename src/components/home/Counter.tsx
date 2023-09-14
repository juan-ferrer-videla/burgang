"use client";

import React, { FC, useMemo } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { cartAtom } from "@/atoms";
import { PlusIcon } from "../Icons/PlusIcon";
import { MinusIcon } from "../Icons/MinusIcon";

export const Counter: FC<{ id: string }> = ({ id }) => {
  const productCountAtom = useMemo(
    () => atom((get) => get(cartAtom)[id]?.count || 0),
    [id],
  );
  const count = useAtomValue(productCountAtom);
  const setCount = useSetAtom(cartAtom);
  const decrement = () => {
    setCount((prev) => ({
      ...prev,
      [id]: { ...prev[id], count: prev[id].count - 1 },
    }));
  };
  const increment = () => {
    setCount((prev) => ({
      ...prev,
      [id]: { ...prev[id], count: prev[id]?.count ? prev[id].count + 1 : 1 },
    }));
  };

  return (
    <div className="flex items-center justify-center gap-x-2">
      <button
        className="rounded bg-black p-1 text-primary"
        disabled={count < 1}
        onClick={decrement}
      >
        <MinusIcon />
      </button>
      <p className="min-w-[3ch] text-lg font-semibold md:text-2xl">{count}</p>
      <button className="rounded bg-black p-1 text-primary" onClick={increment}>
        <PlusIcon />
      </button>
    </div>
  );
};
