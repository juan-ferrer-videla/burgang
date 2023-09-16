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
    <div className="flex justify-between gap-x-8 sm:text-lg md:text-xl lg:text-2xl">
      <div className="my-3 flex items-center">
        <input
          onChange={handleChange}
          type="checkbox"
          id={taccId}
          name="isCeliac"
          className="relative block h-5 w-5 accent-black after:absolute after:inset-0 after:bg-black after:checked:hidden sm:h-6 sm:w-6 md:h-7 md:w-7"
        />
        <label htmlFor={taccId} className="pl-2 font-inter font-bold uppercase">
          Sin Tacc
        </label>
      </div>
      <div className="my-3 flex items-center">
        <input
          onChange={handleChange}
          type="checkbox"
          id={veggieId}
          name="isVeggie"
          className="relative block h-5 w-5 accent-black after:absolute after:inset-0 after:bg-black after:checked:hidden sm:h-6 sm:w-6 md:h-7 md:w-7"
        />
        <label
          htmlFor={veggieId}
          className="pl-2 font-inter font-bold uppercase"
        >
          Veggie
        </label>
      </div>
    </div>
  );
};

export default ProductOptions;
