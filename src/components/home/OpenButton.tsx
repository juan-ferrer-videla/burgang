"use client";

import { isOpenOrderAtom } from "@/atoms";
import { useAtom } from "jotai";
import React from "react";

export const OpenButton = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenOrderAtom);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <button
      onClick={handleOpen}
      className="rounded bg-primary px-6 py-2 text-lg font-bold uppercase text-black active:scale-95 dark:border dark:border-primary dark:bg-zinc-950 dark:text-primary "
    >
      {isOpen ? "Volver" : "Tu pedido"}
    </button>
  );
};
