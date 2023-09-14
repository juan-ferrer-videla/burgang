"use client";
import React, { FC, useState, useTransition } from "react";
import Modal from "@/components/common/Modal";
import { DeleteIcon } from "@/components/Icons/DeleteIcon";
import { deleteProductAction } from "@/actions/content-manager";

interface Props {
  id: string;
}

const DeleteProductButton: FC<Props> = ({ id }) => {
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
      await deleteProductAction(id);
      handleClose();
    });
  };

  return (
    <>
      <button
        className="text-red-700 enabled:active:scale-95 p-2"
        disabled={isPending}
        onClick={handleOpen}
      >
        <DeleteIcon />
      </button>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <p>¿Estas seguro de que deseas eliminar el producto?</p>
          <ul className="flex mt-4 space-x-4 justify-between items-center">
            <li>
              <button
                disabled={isPending}
                onClick={handleDelete}
                className="block px-6 py-2 bg-red-700/10 rounded-full border border-red-700 hover:bg-red-900 disabled:border-zinc-700 disabled:bg-zinc-800 enabled:active:scale-95"
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

export default DeleteProductButton;
