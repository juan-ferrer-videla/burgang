"use client";

import { cartAtom, isOpenOrderAtom, payMethodAtom } from "@/atoms";
import { useAtom, useAtomValue } from "jotai";
import React, { useId, useMemo } from "react";
import { OrderButton } from "./OrderButton";

const Order = () => {
  const [payMethod, setPayMethod] = useAtom(payMethodAtom);
  const idCash = useId();
  const idCard = useId();
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
      className={`fixed inset-0 h-screen w-full bg-zinc-950 transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } text-white`}
    >
      <div className="max-h-full overflow-y-auto overscroll-contain px-4 pb-4 pt-24">
        {totalCash > 0 ? (
          <section className="mx-auto mb-4 max-w-3xl overflow-scroll rounded border-8 border-dashed border-black bg-primary p-6 text-black shadow-lg shadow-primary/20 sm:mb-6 sm:p-8 md:mb-8 md:p-12 lg:mb-10 lg:p-16">
            <ul className="">
              {orderToBuy.map(({ count, id, isCeliac, title, isVeggie }) => (
                <li key={id} className="mb-4 border-b-2 border-b-black pb-2">
                  <div className="mb-2 flex items-center justify-between gap-x-4">
                    <h3 className="text-xl font-black uppercase">{title}</h3>
                    <p className="text-xl font-black">{count}</p>
                  </div>
                  <div className="flex gap-x-3 font-shadows font-semibold">
                    {isCeliac && <p>Sin TACC</p>}
                    {isVeggie && <p>Veggie</p>}
                  </div>
                </li>
              ))}
            </ul>
            <fieldset className="flex justify-center gap-x-6">
              <label
                htmlFor={idCash}
                className={`flex flex-col items-center rounded-full border-2 border-black px-4 py-1 ${
                  payMethod === "cash" ? "bg-black text-primary" : ""
                }`}
              >
                <span className="font-semibold">Efectivo</span>
                <span className="text-lg font-bold">{totalCash}</span>
              </label>
              <input
                type="radio"
                name="paymethod"
                id={idCash}
                className="sr-only"
                value="cash"
                onChange={() => {
                  setPayMethod("cash");
                }}
              />
              <label
                htmlFor={idCard}
                className={`flex flex-col items-center rounded-full border-2 border-black px-4 py-1 ${
                  payMethod === "card" ? "bg-black text-primary" : ""
                }`}
              >
                <span className="font-semibold">Otro método</span>
                <span className="text-lg font-bold"> {totalCard}</span>
              </label>
              <input
                type="radio"
                name="paymethod"
                id={idCard}
                className="sr-only"
                value={"card"}
                onChange={() => {
                  setPayMethod("card");
                }}
              />
            </fieldset>
            <OrderButton order={orderToBuy} />
          </section>
        ) : (
          <p className="text-center text-xl font-bold text-primary">
            No has seleccionado productos.
          </p>
        )}
      </div>
    </aside>
  );
};

export default Order;
