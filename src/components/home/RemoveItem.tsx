"use client";

import React, { type FC } from "react";
import { MinusIcon } from "../Icons/MinusIcon";
import { useSetAtom } from "jotai";
import { cartAtom } from "@/atoms";

export const RemoveItem: FC<{ itemId: string }> = ({ itemId }) => {
  const setItem = useSetAtom(cartAtom);

  const decrementItem = (itemId: string) => {
    setItem((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        count: prev[itemId].count - 1,
      },
    }));
  };
  return (
    <button
      onClick={() => {
        decrementItem(itemId);
      }}
      className="rounded border border-primary bg-black "
    >
      <MinusIcon size={"sm"} className="stroke-primary" />
    </button>
  );
};
