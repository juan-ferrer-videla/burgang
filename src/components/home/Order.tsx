"use client";

import { cartAtom, isOpenOrderAtom, payMethodAtom } from "@/atoms";
import { useAtom, useAtomValue } from "jotai";
import React, { FC, FormEventHandler, useId, useMemo } from "react";
import { TOption, TPhone } from "@/types";
import ResetOrder from "./ResetOrder";

const Order: FC<{ phones: TPhone[] }> = ({ phones }) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    const phone = formData.get("place") as string;
    const address = formData.get("address") as string;
    const comment = formData.get("comment") as string;

    e.preventDefault();
    window.open(
      `https://wa.me/${phone}?text=${encodeURI(
        `${string}\ndirección de envío: ${address}${
          comment ? `\nComentario:${comment}` : ""
        }`,
      )}`,
    );
  };
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
        (acc, [id, { count, option, price_card, price_cash, title }]) => {
          if (count) {
            acc.push({
              count,
              option,
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
          option: TOption;
          price_card: number;
          price_cash: number;
          id: string;
        }[],
      ),
    [order],
  );

  let string = useMemo(
    () =>
      Object.entries(order).reduce((acc, [_, { count, option, title }]) => {
        if (count) {
          acc += `${title.toUpperCase()} - ${count} - ${option}`;
          acc += "\n------------------\n";
        }
        return acc;
      }, ""),
    [order],
  );
  string += `\nMétodo de pago: ${
    payMethod === "cash" ? "Efectivo" : "Otro método"
  }`;

  return (
    <aside
      className={`fixed inset-0 h-screen w-full bg-zinc-950 transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } text-white`}
    >
      <div className="max-h-full overflow-y-auto overscroll-y-contain px-4 pb-4 pt-24">
        {totalCash > 0 ? (
          <section className="mx-auto mb-4 max-w-3xl overflow-auto rounded border-8 border-dashed border-black bg-primary p-6 text-black shadow-lg shadow-primary/20 sm:mb-6 sm:p-8 md:mb-8 md:p-12 lg:mb-10 lg:p-16">
            <ul className="">
              {orderToBuy.map(({ count, id, title, option }) => (
                <li key={id} className="mb-4 border-b-2 border-b-black pb-2">
                  <div className="mb-2 flex items-center justify-between gap-x-4">
                    <h3 className="text-xl font-black uppercase">{title}</h3>
                    <p className="text-xl font-black">{count}</p>
                  </div>
                  <div className="flex gap-x-3 font-shadows font-semibold">
                    {option}
                  </div>
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit}>
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
              <fieldset className="my-4 sm:my-6 md:my-8 lg:my-10">
                <legend className="mb-2 text-lg font-black uppercase sm:text-xl md:text-2xl">
                  Local:
                </legend>
                {phones.map(({ id, name, phone }) => (
                  <div key={id} className="flex items-center">
                    <input
                      type="radio"
                      name="place"
                      id={id}
                      value={phone}
                      required
                      className="accent-current"
                    />
                    <label
                      className="text pl-2 font-shadows font-black uppercase sm:text-lg md:text-xl"
                      htmlFor={id}
                    >
                      {name}
                    </label>
                  </div>
                ))}
              </fieldset>
              <label
                htmlFor="address"
                className="mb-2 block text-lg font-black uppercase sm:text-xl md:text-2xl"
              >
                Dirección de entrega:
              </label>
              <textarea
                id="address"
                name="address"
                className="w-full rounded bg-black p-2 font-inter text-primary"
                required
                minLength={4}
                maxLength={255}
              />
              <label
                htmlFor="comment"
                className="mb-2 block text-lg font-black uppercase sm:text-xl md:text-2xl"
              >
                Comentario:
              </label>
              <textarea
                id="comment"
                name="comment"
                className="w-full rounded bg-black p-2 font-inter text-primary"
                required
                minLength={4}
                maxLength={255}
              />
              <button className="mt-6 w-full rounded bg-black px-6 py-2 text-lg font-bold uppercase text-primary active:scale-95">
                pedir
              </button>
              <ResetOrder />
            </form>
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
