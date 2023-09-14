"use client";

import React, { FC, useState, useTransition } from "react";
import { deleteSectionAction } from "@/actions/content-manager";
import Modal from "@/components/common/Modal";

interface Props {
  id: string;
}

const DeleteSectionButton: FC<Props> = ({ id }) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteSectionAction(id);
      handleClose();
    });
  };
  return (
    <>
      <button
        onClick={handleOpen}
        className="block px-6 py-2 bg-red-700/10 rounded-full border border-red-700 hover:bg-red-900 ml-auto enabled:active:scale-95"
      >
        Borrar sección
      </button>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <p>¿Estas seguro que deseas borrar la sección?</p>
          <ul className="flex space-x-3 justify-between items-center mt-4">
            <li>
              <button
                disabled={isPending}
                className="block px-6 py-2 bg-red-700/10 rounded-full border border-red-700 hover:bg-red-900 disabled:border-zinc-700 disabled:bg-zinc-800 enabled:active:scale-95"
                onClick={handleDelete}
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

export default DeleteSectionButton;
