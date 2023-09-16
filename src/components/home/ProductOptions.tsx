"use client";

import { cartAtom } from "@/atoms";
import { useSetAtom } from "jotai";
import React, { type FC, useId, type ChangeEvent } from "react";

const ProductOptions: FC<{ id: string }> = ({ id }) => {
  const setProduct = useSetAtom(cartAtom);
  const taccId = useId();
  const veggieId = useId();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    setProduct((prev) => ({ ...prev, [id]: { ...prev[id], [name]: checked } }));
  };
  return (
    <div className="flex justify-between gap-x-8 sm:text-lg">
      <div className="my-3 flex items-center gap-x-1">
        <input
          onChange={handleChange}
          type="checkbox"
          id={taccId}
          name="isCeliac"
          className="relative block h-5 w-5 accent-black after:absolute after:inset-0 after:bg-black after:checked:hidden"
        />
        <label htmlFor={taccId} className="font-inter font-bold uppercase">
          Sin Tacc
        </label>
      </div>
      <div className="my-3 flex items-center gap-x-2">
        <input
          onChange={handleChange}
          type="checkbox"
          id={veggieId}
          name="isVeggie"
          className="relative block h-5 w-5 accent-black after:absolute after:inset-0 after:bg-black after:checked:hidden"
        />
        <label htmlFor={veggieId} className="font-inter font-bold uppercase">
          Veggie
        </label>
      </div>
    </div>
  );
};

export default ProductOptions;
