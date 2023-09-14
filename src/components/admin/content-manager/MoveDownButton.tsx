"use client";

import { DownIcon } from "@/components/Icons/DownIcon";
import React, { useState, type FC } from "react";

export const MoveDownButton: FC<{ moveDown: () => Promise<void> }> = ({
  moveDown,
}) => {
  const handleMove = async () => {
    setIsLoading(true);
    await moveDown();
    setIsLoading(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      className="p-2 disabled:cursor-not-allowed group"
      onClick={handleMove}
      disabled={isLoading}
    >
      <DownIcon className="group-disabled:stroke-zinc-500" />
    </button>
  );
};
