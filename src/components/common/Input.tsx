"use client";

import React, { ComponentProps, forwardRef, useState } from "react";
import { EyeOpenIcon } from "../Icons/EyeOpenIcon";
import { EyeCloseIcon } from "../Icons/EyeCloseIcon";

interface Props extends Omit<ComponentProps<"input">, "id" | "ref"> {
  label: string;
  password?: true;
  labelClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      password,
      labelClassName,
      className,
      type = "text",
      required,
      ...props
    },
    ref
  ) => {
    const id = label.toLowerCase().replace(" ", "-");

    const [isPassword, setIsPassword] = useState(password ?? false);
    const handleClick = () => setIsPassword((prev) => !prev);

    return (
      <div
        className={`${
          type === "checkbox"
            ? "flex space-x-4 items-center justify-center"
            : "grid"
        } mb-4`}
      >
        <label
          htmlFor={id}
          className={`${type === "checkbox" ? "" : "mb-2"} ${labelClassName}`}
        >
          {required && (
            <span className="text-red-500" title="requerido">
              *
            </span>
          )}{" "}
          {label}
        </label>
        <div className="relative flex items-center">
          <input
            className={`w-full ${
              type === "checkbox" ? "w-4 h-4" : ""
            } p-2 rounded ${password ? "pr-12" : ""} ${className}`}
            type={isPassword ? "password" : type}
            id={id}
            ref={ref}
            required
            {...props}
          />
          {password && (
            <button
              className="absolute right-0 p-2"
              type="button"
              onClick={handleClick}
            >
              {isPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
