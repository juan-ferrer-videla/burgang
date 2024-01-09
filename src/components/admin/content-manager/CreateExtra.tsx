"use client";

import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import React, { FC, useRef, useState } from "react";
import Modal from "@/components/common/Modal";
import CreateProductSubmit from "./CreateProductSubmit";
import { createExtraAction } from "@/actions/content-manager";
import { type TExtra } from "@/types";

export const CreateExtra: FC<{ extras: TExtra[]; sectionId: string }> = ({
  extras,
  sectionId,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const order = extras.length === 0 ? 0 : extras[extras.length - 1].order + 1;

  const action = async (data: FormData) => {
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const price = Number(data.get("price"));

    await createExtraAction({ order, price, description, title }, sectionId);
    formRef.current?.reset();
    handleClose();
  };

  return (
    <>
      <button
        className="mx-auto block rounded-full border border-emerald-700 bg-emerald-900/40 px-6 py-2 hover:bg-emerald-900 enabled:active:scale-95 disabled:border-zinc-700 disabled:bg-zinc-800"
        onClick={handleOpen}
      >
        Añadir extra
      </button>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <form action={action} ref={formRef}>
            <h2 className="my-2 mb-6">Crear nuevo producto</h2>
            <Input label="Titulo" name="title" required autoFocus />
            <Textarea label="Descripción" name="description" />
            <Input label="Precio" name="price" type="number" required />
            <div className="mt-8 flex items-center justify-between">
              <CreateProductSubmit />
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
