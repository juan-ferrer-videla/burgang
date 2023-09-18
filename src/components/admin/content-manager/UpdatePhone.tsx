"use client";

import Modal from "@/components/common/Modal";
import React, { FC, useState } from "react";
import Input from "@/components/common/Input";
import { EditIcon } from "@/components/Icons/EditIcon";
import UpdateProductSubmit from "./UpdateProductSubmit";
import { type TPhone } from "@/types";
import { updatePhoneAction } from "@/actions/phones";

export const UpdatePhone: FC<TPhone> = ({ id, name, phone }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleAction = async (data: FormData) => {
    const name = data.get("title") as string;
    const phone = data.get("phone") as string;

    await updatePhoneAction(id, phone, name);
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
              label="Nombre"
              required
              defaultValue={name}
              name="title"
              autoFocus
            />
            <Input
              label="Telefono"
              required
              defaultValue={phone}
              name="phone"
              type="text"
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
