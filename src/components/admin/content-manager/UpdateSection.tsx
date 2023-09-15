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
  special: boolean;
}

const UpdateSection: FC<Props> = ({
  sectionId,
  title,
  description,
  special,
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
    const special = data.get("special") === "special";
    await updateSectionAction(sectionId, title, description, special);
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
            <h2 className="mb-8 mt-2 text-center">Editar Seccion</h2>
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
            <div className="mb-2 flex gap-x-2">
              <label htmlFor="special">Especial</label>
              <input
                type="radio"
                name="special"
                required
                id="special"
                value="special"
                defaultChecked={special}
              />
            </div>
            <div className="mb-2 flex gap-x-2">
              <label htmlFor="normal">Normal</label>
              <input
                type="radio"
                name="special"
                required
                id="normal"
                value="normal"
                defaultChecked={!special}
              />
            </div>
            <div className="mt-8 flex items-center justify-between">
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
