import { getSections } from "./lib/services/sections";

export type TSection = Awaited<ReturnType<typeof getSections>>[number];

export type TProduct = {
  id: string;
  description: string;
  discount: number;
  title: string;
  price_cash: number;
  price_card: number;
  order: number;
};

export type TPhone = {
  id: string;
  phone: string;
  name: string;
};
export type TOption = string;

export type TExtra = TSection["extras"][number];
