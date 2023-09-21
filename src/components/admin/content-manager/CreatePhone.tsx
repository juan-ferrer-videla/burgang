"use client";

import Input from "@/components/common/Input";
import React, { useRef, useState } from "react";
import Modal from "@/components/common/Modal";
import CreateSectionSubmit from "./CreateSectionSubmit";
import { createPhoneAction } from "@/actions/phones";

export const CreatePhone = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const action = async (data: FormData) => {
    const phone = data.get("phone") as string;
    const title = data.get("title") as string;

    await createPhoneAction(phone, title);
    formRef.current?.reset();
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="mx-auto mb-4 block rounded-full border border-emerald-700 bg-emerald-900/40 px-6 py-2 hover:bg-emerald-900 enabled:active:scale-95 disabled:border-zinc-700 disabled:bg-zinc-800 sm:mb-6 md:mb-8"
      >
        Añadir telefono
      </button>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <form className="mb-4" action={action} ref={formRef}>
            <h2 className="my-6 mt-2 text-center">Crear nueva sección</h2>
            <Input label="Telefono" name="phone" required autoFocus />
            <Input label="Nombre" name="title" required />
            <div className="mt-8 flex items-center justify-between">
              <CreateSectionSubmit />
              <button onClick={handleClose} type="button">
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
