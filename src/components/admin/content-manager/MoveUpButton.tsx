"use client";

import { UpIcon } from "@/components/Icons/UpIcon";
import React, { useState, type FC } from "react";

export const MoveUpButton: FC<{ moveUp: () => Promise<void> }> = ({
  moveUp,
}) => {
  const handleMove = async () => {
    setIsLoading(true);
    await moveUp();
    setIsLoading(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      className="p-2 disabled:cursor-not-allowed group"
      onClick={handleMove}
      disabled={isLoading}
    >
      <UpIcon className="group-disabled:stroke-zinc-500" />
    </button>
  );
};
