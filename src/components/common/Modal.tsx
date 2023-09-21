"use client";

import React, { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal: FC<{
  variant?: true;
  children: ReactNode;
  handleClose: () => void;
  className?: string;
}> = ({ children, handleClose, className = "", variant }) => {
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [handleClose]);

  return createPortal(
    <div className={"fixed inset-0 isolate z-50 grid place-items-center"}>
      <div
        onClick={handleClose}
        className="absolute inset-0 -z-10 bg-black/70 backdrop-blur-sm"
      />
      <div
        className={`mx-4 mt-[15vh] grid min-w-[20rem] self-start rounded
        ${
          variant
            ? "border-8 border-dashed border-black bg-primary text-black"
            : "bg-zinc-900"
        }  md:mt-0 md:self-auto ${className}`}
      >
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
