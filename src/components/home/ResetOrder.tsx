"use client";

import { cartAtom, isOpenOrderAtom } from "@/atoms";
import { useSetAtom } from "jotai";
import React, { useState } from "react";
import Modal from "../common/Modal";

const ResetOrder = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const setOrder = useSetAtom(cartAtom);
  const setOpenOrder = useSetAtom(isOpenOrderAtom);
  const handleReset = () => {
    setOrder({});
    setOpenOrder(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="mt-6 w-full rounded bg-black px-6 py-2 text-lg font-bold uppercase text-primary active:scale-95"
      >
        Terminar pedido
      </button>
      {open && (
        <Modal handleClose={handleClose}>
          <p
            role="alert"
            className="mb-4 text-center text-primary sm:mb-5 sm:text-lg md:mb-6 md:text-xl"
          >
            Al dar click a resetear se borraran todos los items del carrito
          </p>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="rounded bg-black px-6 py-2 text-lg font-bold uppercase text-primary active:scale-95"
            >
              Resetear
            </button>
            <button
              onClick={handleClose}
              className="px-6 py-2 text-lg font-bold uppercase text-primary active:scale-95"
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ResetOrder;
