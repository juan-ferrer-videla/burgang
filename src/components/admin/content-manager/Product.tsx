import React, { type FC } from "react";
import DeleteProductButton from "./DeleteProductButton";
import { UpdateProduct } from "./UpdateProduct";
import { MoveUpButton } from "./MoveUpButton";
import { MoveDownButton } from "./MoveDownButton";
import {
  moveProductUpAction,
  moveProductDownAction,
} from "@/actions/content-manager";
import { TProduct } from "@/types";

export const Product: FC<
  TProduct & { products: TProduct[]; index: number }
> = ({
  description,
  id,
  price_cash,
  price_card,
  title,
  order,
  products,
  index,
  discount,
}) => {
  const prev = products[index - 1];
  const next = products[index + 1];

  const moveUp = async () => {
    await moveProductUpAction(id, order, prev.id, prev.order);
  };
  const moveDown = async () => {
    await moveProductDownAction(id, order, next.id, next.order);
  };

  const isFirst = index === 0;
  const isLast = index === products.length - 1;

  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>
        {discount > 0 ? (
          <div className="flex items-center justify-center gap-x-4">
            <p
              aria-label="price without discount"
              className="text-red-500 line-through"
            >
              {price_cash}
            </p>
            <p aria-label="price with discount">
              {((100 - discount) * price_cash) / 100}
            </p>
          </div>
        ) : (
          price_cash
        )}
      </td>
      <td>{price_card || "-"}</td>
      <td>{discount ? discount + "%" : "-"}</td>
      <td>
        <ul className="flex items-center justify-center">
          <li>
            <DeleteProductButton id={id} />
          </li>
          <li>
            <UpdateProduct
              defaultProduct={{
                id,
                title,
                description,
                price_cash,
                price_card,
                discount,
              }}
            />
          </li>
          {!isFirst && (
            <li>
              <MoveUpButton moveUp={moveUp} />
            </li>
          )}
          {!isLast && (
            <li>
              <MoveDownButton moveDown={moveDown} />
            </li>
          )}
        </ul>
      </td>
    </tr>
  );
};
