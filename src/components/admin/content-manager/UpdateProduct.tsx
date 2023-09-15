"use client";

import Modal from "@/components/common/Modal";
import React, { FC, useState } from "react";
import { updateProductAction } from "@/actions/content-manager";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import { EditIcon } from "@/components/Icons/EditIcon";
import UpdateProductSubmit from "./UpdateProductSubmit";
import { TProduct } from "@/types";

interface Props {
  defaultProduct: Omit<TProduct, "order">;
}

export const UpdateProduct: FC<Props> = ({
  defaultProduct: { description, id, price_cash, price_card, title, discount },
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
    const price_cash = Number(data.get("cash"));
    const price_card = Number(data.get("card"));
    const discount = Number(data.get("discount"));
    await updateProductAction(
      id,
      title,
      description,
      price_cash,
      price_card,
      discount,
    );
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
              label="Precio Efectivo"
              required
              defaultValue={price_cash}
              name="cash"
              type="number"
            />
            <Input
              label="Precio otro método"
              required
              defaultValue={price_card}
              name="card"
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
