"use client";

import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const UpdateProductSubmit = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="block px-6 py-2 bg-emerald-900/40 rounded-full border border-emerald-700 hover:bg-emerald-900 disabled:border-zinc-700 disabled:bg-zinc-800 enabled:active:scale-95"
    >
      {pending ? "Editando..." : "Editar"}
    </button>
  );
};

export default UpdateProductSubmit;
