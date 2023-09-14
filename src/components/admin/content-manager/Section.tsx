"use client";

import React, { type FC } from "react";
import DeleteSectionButton from "./DeleteSectionButton";
import CreateProduct from "./CreateProduct";
import UpdateSection from "./UpdateSection";
import { Product } from "./Product";
import { type TProduct } from "@/types";
import {
  moveSectionUpAction,
  moveSectionDownAction,
} from "@/actions/content-manager";

import { MoveUpButton } from "./MoveUpButton";
import { MoveDownButton } from "./MoveDownButton";

export const Section: FC<{
  sectionId: string;
  title: string;
  order: number;
  description: string;
  products: TProduct[];
  isFirst: boolean;
  isLast: boolean;
  index: number;
  sections: {
    id: string;
    title: string;
    description: string;
    order: number;
    products: {
      id: string;
      description: string;
      title: string;
      price: number;
      discount: number;
    }[];
  }[];
}> = ({
  description,
  products,
  sectionId,
  title,
  order,
  index,
  isFirst,
  isLast,
  sections,
}) => {
  const next = sections[index + 1];
  const prev = sections[index - 1];
  const moveDown = async () => {
    await moveSectionDownAction(order, sectionId, next.id, next.order);
  };
  const moveUp = async () => {
    await moveSectionUpAction(order, sectionId, prev.id, prev.order);
  };

  return (
    <section className="my-10">
      <div className="flex space-x-6 justify-center items-center mb-6">
        <div>
          <h2 className="text-center">{title}</h2>
          {description && <p className="text-center">{description}</p>}
        </div>
        <UpdateSection
          sectionId={sectionId}
          title={title}
          description={description}
        />
        <div className="grid">
          {!isFirst && <MoveUpButton moveUp={moveUp} />}
          {!isLast && <MoveDownButton moveDown={moveDown} />}
        </div>
      </div>
      <CreateProduct sectionId={sectionId} products={products} />
      {products.length > 0 ? (
        <div className="overflow-auto">
          <table className="w-full text-center my-6 min-w-[30rem] rounded overflow-hidden">
            <caption className="sr-only">Productos</caption>
            <thead className="bg-emerald-950">
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Descuento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(
                ({ id, title, description, price, order, discount }, index) => (
                  <Product
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    price={price}
                    order={order}
                    discount={discount}
                    products={products}
                    index={index}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center my-6">No tienes productos aún.</p>
      )}

      <DeleteSectionButton id={sectionId} />
    </section>
  );
};
