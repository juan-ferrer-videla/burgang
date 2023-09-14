"use client";

import React, { useState } from "react";
import { TickIcon } from "../Icons/TickIcon";
import { successAtom } from "@/atoms";
import { useAtom } from "jotai";

export const Success = () => {
  const [open, setOpen] = useAtom(successAtom);
  const close = () => setOpen(false);

  return open ? (
    <div className="fixed inset-0 grid place-items-center isolate z-50">
      <div className="bg-black/70 absolute inset-0 -z-10 backdrop-blur-sm" />
      <TickIcon
        size={102}
        className="stroke-emerald-500 animate-increase"
        onAnimationEnd={close}
      />
    </div>
  ) : null;
};
