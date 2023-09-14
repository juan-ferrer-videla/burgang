"use client";

import Modal from "@/components/common/Modal";
import React, { FC, useState } from "react";
import { updateProductAction } from "@/actions/content-manager";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import { EditIcon } from "@/components/Icons/EditIcon";
import UpdateProductSubmit from "./UpdateProductSubmit";

interface Props {
  defaultProduct: {
    id: string;
    title: string;
    description: string;
    price: number;
    discount: number;
  };
}

export const UpdateProduct: FC<Props> = ({
  defaultProduct: { description, id, price, title, discount },
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleAction = async (data: FormData) => {
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const price = Number(data.get("price"));
    const discount = Number(data.get("discount"));
    await updateProductAction(id, title, description, price, discount);
    handleClose();
  };

  return (
    <>
      <button onClick={handleOpen} className="enabled:active:scale-95 p-2">
        <EditIcon />
      </button>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <form action={handleAction}>
            <h2 className="mt-2 mb-8 text-center">Editar Producto</h2>
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
            <Input
              label="Descuento"
              required
              defaultValue={discount}
              name="discount"
              type="number"
              min={0}
              max={100}
            />
            <div className="flex items-center justify-between mt-8">
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
