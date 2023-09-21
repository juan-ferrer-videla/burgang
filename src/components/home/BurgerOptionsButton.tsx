"use client";

import React, { FC, FormEventHandler, useState } from "react";
import Modal from "../common/Modal";
import { TProduct, type TSection } from "@/types";
import { useSetAtom } from "jotai";
import { cartAtom } from "@/atoms";

export const BurgerOptionsButton: FC<{
  extras: TSection;
  product: Pick<TProduct, "title" | "price_cash" | "price_card">;
}> = ({ extras, product }) => {
  const VARIETALS = ["Veggie", "Sin TACC"] as const;
  const setItem = useSetAtom(cartAtom);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData);
    const extraValue = Object.values(formDataObj).reduce(
      (acc, value) => acc + Number(value),
      0,
    );
    console.log(extraValue);
    const varietalNames = Object.keys(formDataObj);

    const itemTitle =
      product.title +
      (varietalNames.length ? `-${varietalNames.join("-")}` : "");
    setItem((prev) => ({
      ...prev,
      [itemTitle]: {
        comment: prev[itemTitle]?.comment || "",
        count: prev[itemTitle]?.count ? prev[itemTitle].count + 1 : 1,
        option: varietalNames.join(" - "),
        price_card: product.price_card + extraValue,
        price_cash: product.price_cash + extraValue,
        title: product.title,
        itemId: itemTitle,
      },
    }));
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="mx-auto mt-4 w-full max-w-xs rounded bg-black px-6 py-2 text-lg font-bold uppercase text-primary active:scale-95 dark:border dark:border-primary"
      >
        Agregar
      </button>
      {open && (
        <Modal variant handleClose={handleClose}>
          <h3 className="mb-4 text-center font-shadows text-xl font-black uppercase sm:text-2xl">
            Opciones Adicionales
          </h3>
          <form onSubmit={handleSubmit} className="font-bold sm:text-xl">
            <fieldset>
              <legend className="sr-only">Variedad</legend>
              <div className="flex justify-between">
                {VARIETALS.map((varietal, i) => (
                  <div className="mb-2 flex" key={i}>
                    <label className="pr-2" htmlFor={i.toString()}>
                      {varietal}
                    </label>
                    <input
                      className="h-auto accent-black sm:w-5"
                      name={varietal}
                      type="checkbox"
                      value={0}
                      id={i.toString()}
                    />
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-4">
              <legend className="mb-2 font-shadows text-lg font-black sm:text-xl">
                Extras:
              </legend>
              {extras.products.map(({ title, id, price_cash }) => (
                <div className="mb-2 flex" key={id}>
                  <label
                    className="pr-2"
                    htmlFor={id}
                  >{`${title} ($${price_cash})`}</label>
                  <input
                    className="h-auto accent-black sm:w-5"
                    type="checkbox"
                    value={price_cash}
                    id={id}
                    name={title}
                  />
                </div>
              ))}
            </fieldset>
            <div className="mt-6 flex items-center justify-between gap-x-4">
              <button className="max-w-xs rounded bg-black px-6 py-2 text-lg font-bold uppercase text-primary active:scale-95 dark:border dark:border-primary sm:text-xl">
                Agregar
              </button>
              <button
                type="button"
                className="font-medium uppercase sm:text-xl"
                onClick={handleClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
