"use client";
import React, { FC, useState, useTransition } from "react";
import Modal from "@/components/common/Modal";
import { DeleteIcon } from "@/components/Icons/DeleteIcon";
import { deletePhoneAction } from "@/actions/phones";

export const DeletePhone: FC<{ id: string }> = ({ id }) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    startTransition(async () => {
      await deletePhoneAction(id);
      handleClose();
    });
  };

  return (
    <>
      <button
        className="p-2 text-red-700 enabled:active:scale-95"
        disabled={isPending}
        onClick={handleOpen}
      >
        <DeleteIcon />
      </button>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <p>¿Estas seguro de que deseas eliminar el producto?</p>
          <ul className="mt-4 flex items-center justify-between space-x-4">
            <li>
              <button
                disabled={isPending}
                onClick={handleDelete}
                className="block rounded-full border border-red-700 bg-red-700/10 px-6 py-2 hover:bg-red-900 enabled:active:scale-95 disabled:border-zinc-700 disabled:bg-zinc-800"
              >
                {isPending ? "Borrando..." : "Borrar"}
              </button>
            </li>
            <li>
              <button onClick={handleClose}>Cancelar</button>
            </li>
          </ul>
        </Modal>
      )}
    </>
  );
};
