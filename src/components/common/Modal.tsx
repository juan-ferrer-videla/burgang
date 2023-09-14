"use client";

import React, { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal: FC<{
  children: ReactNode;
  handleClose: () => void;
  className?: string;
}> = ({ children, handleClose, className = "" }) => {
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
    <div className={"fixed inset-0 grid place-items-center isolate z-50"}>
      <div
        onClick={handleClose}
        className="bg-black/70 absolute inset-0 -z-10 backdrop-blur-sm"
      />
      <div
        className={`grid rounded self-start mt-[15vh] md:self-auto md:mt-0 bg-zinc-900 mx-4 min-w-[20rem] ${className}`}
      >
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
