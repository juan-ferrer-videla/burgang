"use client";

import React, { type FC } from "react";
import { type TPhone } from "@/types";
import { DeletePhone } from "./DeletePhone";
import { UpdatePhone } from "./UpdatePhone";

export const Phone: FC<TPhone> = ({ id, name, phone }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{phone}</td>
      <td>
        <div className="flex gap-x-2">
          <DeletePhone id={id} />
          <UpdatePhone id={id} name={name} phone={phone} />
        </div>
      </td>
    </tr>
  );
};
