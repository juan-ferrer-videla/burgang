"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import React from "react";

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="px-6 py-2 bg-emerald-900/40 rounded-full mb-4 mt-3 border border-emerald-700 hover:bg-emerald-900 disabled:bg-zinc-800 disabled:border-zinc-800"
    >
      {pending ? "Cargando..." : "Cambiar"}
    </button>
  );
};

export default Submit;
