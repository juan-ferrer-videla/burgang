import { atom } from "jotai";
import { TOption } from "./types";

export type TCartAtom = Record<
  string,
  {
    count: number;
    comment: string;
    title: string;
    price_cash: number;
    price_card: number;
    option: TOption;
    itemId: string;
  }
>;

export const cartAtom = atom<TCartAtom>({});

export const isOpenOrderAtom = atom(false);

export const payMethodAtom = atom<"cash" | "card">("cash");
