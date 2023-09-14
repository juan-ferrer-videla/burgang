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
    await createSectionAction(title, description, max === null ? 0 : max + 1);
    formRef.current?.reset();
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="block px-6 py-2 bg-emerald-900/40 rounded-full border border-emerald-700 hover:bg-emerald-900 disabled:border-zinc-700 disabled:bg-zinc-800 enabled:active:scale-95"
      >
        Crear Sección
      </button>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <form className="mb-4" action={action} ref={formRef}>
            <h2 className="text-center mt-2 my-6">Crear nueva sección</h2>
            <Input label="Titulo" name="title" required autoFocus />
            <Textarea label="Descripción" name="description" />
            <div className="flex items-center justify-between mt-8">
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
