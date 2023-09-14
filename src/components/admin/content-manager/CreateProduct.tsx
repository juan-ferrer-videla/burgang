"use client";

import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import React, { FC, useRef, useState } from "react";
import Modal from "@/components/common/Modal";
import CreateProductSubmit from "./CreateProductSubmit";
import { createProductAction } from "@/actions/content-manager";
import { type TProduct } from "@/types";

const CreateProduct: FC<{ sectionId: string; products: TProduct[] }> = ({
  sectionId,
  products,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const order =
    products.length === 0 ? 0 : products[products.length - 1].order + 1;

  const action = async (data: FormData) => {
    const name = data.get("title") as string;
    const description = data.get("description") as string;
    const price = Number(data.get("price"));
    const sectionId = data.get("sectionId") as string;
    const discount = Number(data.get("discount"));

    await createProductAction(
      name,
      description,
      price,
      sectionId,
      order,
      discount
    );
    formRef.current?.reset();
    handleClose();
  };

  return (
    <>
      <button
        className="block px-6 py-2 bg-emerald-900/40 rounded-full border border-emerald-700 hover:bg-emerald-900 disabled:border-zinc-700 disabled:bg-zinc-800 enabled:active:scale-95"
        onClick={handleOpen}
      >
        Crear producto
      </button>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <form action={action} ref={formRef}>
            <h2 className="my-2 mb-6">Crear nuevo producto</h2>
            <Input label="Titulo" name="title" required autoFocus />
            <Textarea label="Descripción" name="description" />
            <Input label="Precio" name="price" type="number" required />
            <Input
              label="Descuento"
              name="discount"
              type="number"
              max={100}
              min={0}
              defaultValue={0}
            />
            <input type="hidden" name="sectionId" value={sectionId} required />
            <div className="flex items-center justify-between mt-8">
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

export default CreateProduct;
