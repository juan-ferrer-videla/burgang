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
    const price_cash = Number(data.get("cash"));
    const price_card = data.get("card") ? Number(data.get("card")) : 0;
    const sectionId = data.get("sectionId") as string;
    const discount = Number(data.get("discount"));

    await createProductAction(
      name,
      description,
      price_cash,
      price_card,
      sectionId,
      order,
      discount,
    );
    formRef.current?.reset();
    handleClose();
  };

  return (
    <>
      <button
        className="block rounded-full border border-emerald-700 bg-emerald-900/40 px-6 py-2 hover:bg-emerald-900 enabled:active:scale-95 disabled:border-zinc-700 disabled:bg-zinc-800"
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
            <Input label="Precio Efectivo" name="cash" type="number" required />
            <Input label="Precio otro método" name="card" type="number" />
            <Input
              label="Descuento"
              name="discount"
              type="number"
              max={100}
              min={0}
              defaultValue={0}
            />
            <input type="hidden" name="sectionId" value={sectionId} required />
            <div className="mt-8 flex items-center justify-between">
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
