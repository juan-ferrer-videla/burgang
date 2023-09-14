"use client";

import Input from "@/components/common/Input";
import React, { useRef, useState } from "react";
import { changePasswordAction } from "@/actions/login";
import { Submit } from "./Submit";
import { useRouter } from "next/navigation";

export const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const action = async () => {
    await changePasswordAction(password, "burgang");
    formRef.current?.reset();
    router.push("/admin");
  };

  return (
    <form action={action} ref={formRef} className="max-w-lg w-full mx-auto">
      <Input
        label="Nueva contraseña"
        name="password"
        required
        autoFocus
        password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        label="Confirma tu contraseña"
        name="confirmPassword"
        required
        password
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={password !== confirmPassword ? "ring-1 ring-red-500" : ""}
      />
      <Submit invalid={password !== confirmPassword} />
    </form>
  );
};
