"use client";

import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const Submit = ({ invalid }: { invalid: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending || invalid}
      className="mx-auto mt-8 block rounded-full border border-emerald-700 bg-emerald-900/40  px-6 py-2 font-medium uppercase hover:bg-emerald-900 enabled:active:scale-95 disabled:border-zinc-700 disabled:bg-zinc-800"
    >
      {pending ? "Cambiando..." : "Cambiar"}
    </button>
  );
};
