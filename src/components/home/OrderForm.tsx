"use client";

import React, { FC, FormEventHandler, useId, useState } from "react";
import ResetOrder from "./ResetOrder";
import Modal from "../common/Modal";
import { useAtom, useAtomValue } from "jotai";
import {
  orderStringAtom,
  payMethodAtom,
  totalCardAtom,
  totalCashAtom,
} from "@/atoms";
import { TPhone } from "@/types";

const OrderForm: FC<{ phones: TPhone[] }> = ({ phones }) => {
  const idCash = useId();
  const idCard = useId();
  const [delivery, setDelivery] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [wspLink, setWspLink] = useState("");
  const orderString = useAtomValue(orderStringAtom);
  const [payMethod, setPayMethod] = useAtom(payMethodAtom);
  const totalCash = useAtomValue(totalCashAtom);
  const totalCard = useAtomValue(totalCardAtom);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    const phone = formData.get("place") as string;
    const comment = formData.get("comment") as string;

    e.preventDefault();
    handleOpen();
    setWspLink(
      `https://wa.me/${phone}?text=${encodeURI(
        `${orderString}${comment ? `\nComentario: ${comment}` : ""}\n${
          delivery ? "Delivery" : "Takeaway"
        }`,
      )}`,
    );
  };

  return (
    <>
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
                className="text font-quicksands pl-2 font-black uppercase sm:text-lg md:text-xl"
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
                className="text font-quicksands pl-2 font-black uppercase sm:text-lg md:text-xl"
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
                className="text font-quicksands pl-2 font-black uppercase sm:text-lg md:text-xl"
              >
                Delivery
              </label>
            </div>
          </div>
        </fieldset>
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
    </>
  );
};

export default OrderForm;
