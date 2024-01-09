"use client";

import Modal from "@/components/common/Modal";
import React, { FC, useState } from "react";
import { updateExtraAction } from "@/actions/content-manager";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import { EditIcon } from "@/components/Icons/EditIcon";
import UpdateProductSubmit from "./UpdateProductSubmit";
import type { TExtra } from "@/types";
import { parse, string, number } from "valibot";

interface Props {
  defaultProduct: Omit<TExtra, "order">;
}

export const UpdateExtra: FC<Props> = ({
  defaultProduct: { description, id, price, title },
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleAction = async (data: FormData) => {
    const title = parse(string(), data.get("title"));
    const description = parse(string(), data.get("description"));
    const price = parse(number(), Number(data.get("price")));
    await updateExtraAction({ description, id, price, title });

    handleClose();
  };

  return (
    <>
      <button onClick={handleOpen} className="p-2 enabled:active:scale-95">
        <EditIcon />
      </button>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <form action={handleAction}>
            <h2 className="mb-8 mt-2 text-center">Editar Producto</h2>
            <Input
              label="Titulo"
              required
              defaultValue={title}
              name="title"
              autoFocus
            />
            <Textarea
              label="Descripción"
              defaultValue={description}
              name="description"
            />
            <Input
              label="Precio"
              required
              defaultValue={price}
              name="price"
              type="number"
            />
            <div className="mt-8 flex items-center justify-between">
              <UpdateProductSubmit />
              <button type="button" onClick={handleClose}>
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
