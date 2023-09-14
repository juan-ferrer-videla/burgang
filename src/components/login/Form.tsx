"use client";

import Input from "@/components/common/Input";
import React, { useRef, useState } from "react";
import Submit from "./Submit";
import { parse, string } from "valibot";
import { login } from "@/actions/login";

const stringSchema = string();

export const Form = () => {
  const [badPassword, setBadPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const action = async (data: FormData) => {
    const user = parse(stringSchema, data.get("user"));
    const password = parse(stringSchema, data.get("password"));
    const res = await login(user, password);
    if (res?.error) {
      setBadPassword(true);
    }
  };
  return (
    <form
      action={action}
      ref={formRef}
      className="grid max-w-xl p-4 text-center mx-auto"
    >
      <h1 className="mt-4 mb-10">Inicia sesión</h1>
      <Input
        label="Usuario"
        name="user"
        maxLength={50}
        required
        autoComplete="username"
      />
      <Input
        label="Contraseña"
        name="password"
        maxLength={50}
        required
        password
        autoComplete="current-password"
      />
      <Submit />
      {badPassword && (
        <p role="alert" className="text-sm text-red-400">
          No existe un usuario con esa contraseña
        </p>
      )}
    </form>
  );
};
