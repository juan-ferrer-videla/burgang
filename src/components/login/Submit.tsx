"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import React from "react";

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="mb-4 mt-3 rounded-full border border-emerald-700 bg-emerald-900/40 px-6 py-2 hover:bg-emerald-900 disabled:border-zinc-800 disabled:bg-zinc-800"
    >
      {pending ? "Cargando..." : "Confirmar"}
    </button>
  );
};

export default Submit;
