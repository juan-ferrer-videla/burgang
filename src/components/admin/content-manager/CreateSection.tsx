"use client";

import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import React, { type FC, useRef, useState } from "react";
import Modal from "@/components/common/Modal";
import CreateSectionSubmit from "./CreateSectionSubmit";
import { createSectionAction } from "@/actions/content-manager";

export const CreateSection: FC<{ max: number | null }> = ({ max }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const action = async (data: FormData) => {
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const special = data.get("special") === "special";
    console.log(data.get("special"));

    await createSectionAction(
      title,
      description,
      max === null ? 0 : max + 1,
      special,
    );
    formRef.current?.reset();
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="block rounded-full border border-emerald-700 bg-emerald-900/40 px-6 py-2 hover:bg-emerald-900 enabled:active:scale-95 disabled:border-zinc-700 disabled:bg-zinc-800"
      >
        Crear Sección
      </button>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <form className="mb-4" action={action} ref={formRef}>
            <h2 className="my-6 mt-2 text-center">Crear nueva sección</h2>
            <Input label="Titulo" name="title" required autoFocus />
            <Textarea label="Descripción" name="description" />
            <div className="mb-2 flex gap-x-2">
              <label htmlFor="special">Especial</label>
              <input
                type="radio"
                name="special"
                required
                id="special"
                value="special"
              />
            </div>
            <div className="mb-2 flex gap-x-2">
              <label htmlFor="normal">Normal</label>
              <input
                type="radio"
                name="special"
                required
                value={"normal"}
                id="normal"
                defaultChecked
              />
            </div>
            <div className="mt-8 flex items-center justify-between">
              <CreateSectionSubmit />
              <button onClick={handleClose} type="button">
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      )}
      <hr />
    </>
  );
};
