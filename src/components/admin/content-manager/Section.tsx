"use client";

import React, { type FC } from "react";
import DeleteSectionButton from "./DeleteSectionButton";
import CreateProduct from "./CreateProduct";
import UpdateSection from "./UpdateSection";
import { Product } from "./Product";
import type { TSection, TProduct, TExtra } from "@/types";
import {
  moveSectionUpAction,
  moveSectionDownAction,
} from "@/actions/content-manager";

import { MoveUpButton } from "./MoveUpButton";
import { MoveDownButton } from "./MoveDownButton";
import { CreateExtra } from "./CreateExtra";
import { DeleteExtra } from "./DeleteExtra";
import { UpdateExtra } from "./UpdateExtra";
import { ExtrasTable } from "./ExtrasTable";

export const Section: FC<{
  sectionId: string;
  title: string;
  order: number;
  description: string;
  products: TProduct[];
  isFirst: boolean;
  isLast: boolean;
  index: number;
  sections: TSection[];
  extras: TExtra[];
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
  extras,
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
      <div className="mb-6 flex items-center justify-center space-x-6">
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
          <table className="my-6 w-full min-w-[30rem] overflow-hidden rounded text-center">
            <caption className="sr-only">Productos</caption>
            <thead className="bg-emerald-950">
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Efectivo</th>
                <th>Otro método</th>
                <th>Descuento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(
                (
                  {
                    id,
                    title,
                    description,
                    price_cash,
                    price_card,
                    order,
                    discount,
                  },
                  index,
                ) => (
                  <Product
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    price_cash={price_cash}
                    price_card={price_card}
                    order={order}
                    discount={discount}
                    products={products}
                    index={index}
                  />
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="my-6 text-center">No tienes productos aún.</p>
      )}
      <CreateExtra sectionId={sectionId} extras={extras} />
      {extras.length > 0 && <ExtrasTable extras={extras} />}
      <DeleteSectionButton id={sectionId} />
    </section>
  );
};
