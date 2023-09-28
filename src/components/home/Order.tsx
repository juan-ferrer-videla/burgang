"use client";

import { cartAtom, isOpenOrderAtom, orderAtom, totalCashAtom } from "@/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import React, { type FC } from "react";
import { type TPhone } from "@/types";
import { MinusIcon } from "../Icons/MinusIcon";
import OrderForm from "./OrderForm";

const Order: FC<{ phones: TPhone[] }> = ({ phones }) => {
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

  const isOpen = useAtomValue(isOpenOrderAtom);
  const totalCash = useAtomValue(totalCashAtom);
  const orderToBuy = useAtomValue(orderAtom);

  return (
    <aside
      className={`fixed inset-0 h-screen w-full bg-zinc-950 transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } text-white`}
    >
      <div className="max-h-full overflow-y-auto overscroll-y-contain px-4 pb-16 pt-24">
        {totalCash > 0 ? (
          <section className="mx-auto mb-4 max-w-3xl overflow-auto rounded border-8 border-dashed border-black bg-primary p-6 text-black shadow-lg shadow-primary/20 sm:mb-6 sm:p-8 md:mb-8 md:p-12 lg:mb-10 lg:p-16">
            <ul className="">
              {orderToBuy.map(
                ({ count, id, title, option, itemId, comment }) => (
                  <li key={id} className="mb-4 border-b-2 border-b-black pb-2">
                    <div className="mb-2 flex items-center justify-between gap-x-4">
                      <h3 className="text-xl font-black uppercase">{title}</h3>
                      <div className="flex items-center gap-x-4">
                        <button
                          onClick={() => {
                            decrementItem(itemId);
                          }}
                          className="rounded border border-primary bg-black "
                        >
                          <MinusIcon size={"sm"} className="stroke-primary" />
                        </button>
                        <p className="text-xl font-black">{count}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-shadows font-semibold">{option}</p>
                      {comment && (
                        <p className="flex gap-x-3 font-inter font-medium">
                          <span className="font-shadows font-bold">
                            Comentario:
                          </span>{" "}
                          {comment}
                        </p>
                      )}
                    </div>
                  </li>
                ),
              )}
            </ul>
            <OrderForm phones={phones} />
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
