import { TExtra } from "@/types";
import React, { type FC } from "react";
import { DeleteExtra } from "./DeleteExtra";
import { UpdateExtra } from "./UpdateExtra";
import { MoveDownButton } from "./MoveDownButton";
import { MoveUpButton } from "./MoveUpButton";
import {
  moveExtraDownAction,
  moveExtraUpAction,
} from "@/actions/content-manager";

export const ExtrasTable: FC<{ extras: TExtra[] }> = ({ extras }) => {
  const moveUp = async (...args: Parameters<typeof moveExtraUpAction>) => {
    await moveExtraUpAction(...args);
  };
  const moveDown = async (...args: Parameters<typeof moveExtraDownAction>) => {
    await moveExtraDownAction(...args);
  };

  return (
    <div className="overflow-auto">
      <table className="my-6 w-full min-w-[30rem] overflow-hidden rounded text-center">
        <caption className="sr-only">Extras</caption>
        <thead className="bg-emerald-950">
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {extras.map(
            (
              { id, title, description, price, sectionId, order },
              index,
              arr,
            ) => (
              <tr key={id}>
                <td>{title}</td>
                <td>{description}</td>
                <td>{price}</td>
                <td>
                  <div className="flex justify-center gap-x-2">
                    <DeleteExtra id={id} />
                    <UpdateExtra
                      defaultProduct={{
                        id,
                        title,
                        description,
                        price,
                        sectionId,
                      }}
                    />
                    {extras.length > 1 && index !== extras.length - 1 && (
                      <MoveDownButton
                        moveDown={() =>
                          moveDown({
                            id,
                            nextId: arr[index + 1].id,
                            nextOrder: arr[index + 1].order,
                            order,
                          })
                        }
                      />
                    )}
                    {extras.length > 1 && index > 0 && (
                      <MoveUpButton
                        moveUp={() =>
                          moveUp({
                            id,
                            prevId: arr[index - 1].id,
                            prevOrder: arr[index - 1].order,
                            order,
                          })
                        }
                      />
                    )}
                  </div>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};
