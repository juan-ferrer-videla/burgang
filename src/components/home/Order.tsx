"use client";

import { cartAtom, isOpenOrderAtom, payMethodAtom } from "@/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { FC, FormEventHandler, useId, useMemo, useState } from "react";
import { TOption, TPhone } from "@/types";
import ResetOrder from "./ResetOrder";
import { MinusIcon } from "../Icons/MinusIcon";
import Modal from "../common/Modal";

const Order: FC<{ phones: TPhone[] }> = ({ phones }) => {
  const [delivery, setDelivery] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [wspLink, setWspLink] = useState("");
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
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    const phone = formData.get("place") as string;
    /*     const address = formData.get("address") as string;
     */ const comment = formData.get("comment") as string;

    e.preventDefault();
    handleOpen();
    setWspLink(
      `https://wa.me/${phone}?text=${encodeURI(
        `${string}${comment ? `\nComentario: ${comment}` : ""}\n${
          delivery ? "Delivery" : "Takeaway"
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
        (
          acc,
          [id, { count, option, price_card, price_cash, title, itemId }],
        ) => {
          if (count) {
            acc.push({
              count,
              option,
              price_card,
              price_cash,
              title,
              id,
              itemId,
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
          itemId: string;
        }[],
      ),
    [order],
  );

  let string = useMemo(
    () =>
      Object.entries(order).reduce(
        (acc, [_, { count, option, title, itemId }]) => {
          if (count) {
            acc += `${title.toUpperCase()} - ${count} - ${option}`;
            acc += "\n------------------\n";
          }
          return acc;
        },
        "",
      ),
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
      <div className="max-h-full overflow-y-auto overscroll-y-contain px-4 pb-16 pt-24">
        {totalCash > 0 ? (
          <section className="mx-auto mb-4 max-w-3xl overflow-auto rounded border-8 border-dashed border-black bg-primary p-6 text-black shadow-lg shadow-primary/20 sm:mb-6 sm:p-8 md:mb-8 md:p-12 lg:mb-10 lg:p-16">
            <ul className="">
              {orderToBuy.map(({ count, id, title, option, itemId }) => (
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

              <fieldset className="my-4 sm:my-6 md:my-8 lg:my-10">
                <legend className="mb-2 text-lg font-black uppercase sm:text-xl md:text-2xl">
                  Donde consumir
                </legend>
                <div className="flex flex-col">
                  <div>
                    <input
                      className="accent-current"
                      type="radio"
                      value={"takeaway"}
                      name="mode"
                      id="takeaway"
                      onChange={(e) => {
                        setDelivery(false);
                      }}
                    />
                    <label
                      htmlFor="takeaway"
                      className="text pl-2 font-shadows font-black uppercase sm:text-lg md:text-xl"
                    >
                      Takeaway
                    </label>
                  </div>
                  <div>
                    <input
                      className="accent-current"
                      type="radio"
                      value={"delivery"}
                      name="mode"
                      id={"delivery"}
                      defaultChecked
                      onChange={(e) => {
                        setDelivery(true);
                      }}
                    />

                    <label
                      htmlFor="delivery"
                      className="text pl-2 font-shadows font-black uppercase sm:text-lg md:text-xl"
                    >
                      Delivery
                    </label>
                  </div>
                </div>
              </fieldset>
              {/*  {delivery && (
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-lg font-black uppercase sm:text-xl md:text-2xl"
                  >
                    Dirección de entrega:
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="w-full rounded bg-black/40 p-2 font-inter text-lg font-semibold  text-black"
                    required
                    minLength={4}
                    maxLength={255}
                  />
                </div>
              )} */}
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="mb-2 block text-lg font-black uppercase sm:text-xl md:text-2xl"
                >
                  Comentario:
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  className="w-full rounded bg-black/40 p-2 font-inter text-lg font-semibold text-black"
                  minLength={4}
                  maxLength={255}
                />
              </div>

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
      {openModal && (
        <Modal handleClose={handleClose} variant>
          <div className="text-center font-medium">
            <p>Generaremos un chat de Whatsapp.</p>
            <p className="mb-2">Envia el texto autogenerado.</p>
            {delivery && (
              <p className="font-bold">
                Luego de enviar el mensaje comparte la ubicación de entrega.
              </p>
            )}
            <div className="mt-6 flex items-center justify-between">
              <a
                className=" block cursor-pointer rounded bg-black px-10 py-2 text-lg font-bold uppercase text-primary active:scale-95"
                href={wspLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir
              </a>
              <button onClick={handleClose} type="button">
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </aside>
  );
};

export default Order;
