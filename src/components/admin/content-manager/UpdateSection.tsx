"use client";

import Modal from "@/components/common/Modal";
import React, { FC, useState } from "react";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import { EditIcon } from "@/components/Icons/EditIcon";
import UpdateSectionSubmit from "./UpdateSectionSubmit";
import { updateSectionAction } from "@/actions/content-manager";

interface Props {
  sectionId: string;
  title: string;
  description: string;
}

const UpdateSection: FC<Props> = ({ sectionId, title, description }) => {
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
    await updateSectionAction(sectionId, title, description);
    handleClose();
  };

  return (
    <>
      <button onClick={handleOpen} className="enabled:active:scale-95">
        <EditIcon />
      </button>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <form action={handleAction}>
            <h2 className="mt-2 mb-8 text-center">Editar Seccion</h2>
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
            <div className="flex items-center justify-between mt-8">
              <UpdateSectionSubmit />
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

export default UpdateSection;
