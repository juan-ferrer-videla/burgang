import { atom } from "jotai";

export type TCartAtom = Record<
  string,
  {
    count: number;
    comment: string;
    title: string;
    price_cash: number;
    price_card: number;
    isVeggie: boolean;
    isCeliac: boolean;
  }
>;

export const cartAtom = atom<TCartAtom>({});

export const isOpenOrderAtom = atom(false);
