import { getSections } from "@/lib/services/sections";
import React, { type FC } from "react";
import { BurgerOptionsButton } from "./BurgerOptionsButton";
import { TProduct } from "@/types";

export const BurgerOptions: FC<{
  product: Pick<TProduct, "title" | "price_cash" | "price_card">;
}> = async ({ product }) => {
  const extras = (await getSections()).find(({ extras }) => extras);
  if (!extras) return null;
  return <BurgerOptionsButton extras={extras} product={product} />;
};
