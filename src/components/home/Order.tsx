"use client";

import { cartAtom, isOpenOrderAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import React, { useMemo } from "react";
import { PriceCard } from "./Price";

const Order = () => {
  const order = useAtomValue(cartAtom);
  const isOpen = useAtomValue(isOpenOrderAtom);
  const totalCash = useMemo(
    () =>
      Object.values(order).reduce(
        (acc, { count, price_cash }) =>
          count > 0 ? acc + price_cash * count : acc,
        0,
      ),
    [order],
  );
  const totalCard = useMemo(
    () =>
      Object.values(order).reduce(
        (acc, { count, price_card, price_cash }) =>
          count > 0 ? acc + (price_card || price_cash) * count : acc,
        0,
      ),
    [order],
  );
  const orderToBuy = useMemo(
    () =>
      Object.entries(order).reduce(
        (
          acc,
          [id, { count, isCeliac, isVeggie, price_card, price_cash, title }],
        ) => {
          if (count) {
            acc.push({
              count,
              isCeliac,
              isVeggie,
              price_card,
              price_cash,
              title,
              id,
            });
          }
          return acc;
        },
        [] as {
          count: number;
          title: string;
          isCeliac: boolean;
          isVeggie: boolean;
          price_card: number;
          price_cash: number;
          id: string;
        }[],
      ),
    [order],
  );
  return (
    <aside
      className={`fixed inset-0 min-h-screen w-full bg-zinc-950 pt-20 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } text-white `}
    >
      <ul>
        {orderToBuy.map(({ count, id, isCeliac, title, isVeggie }) => (
          <li key={id}>
            <h3>{title}</h3>
            <p>{count}</p>
            {isCeliac && <p>Sin TACC</p>}
            {isVeggie && <p>Veggie</p>}
          </li>
        ))}
      </ul>

      <PriceCard price_card={totalCard} price_cash={totalCash} />
    </aside>
  );
};

export default Order;
