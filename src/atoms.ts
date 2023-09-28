import { atom } from "jotai";
import { TOption } from "./types";

export type TCartProduct = {
  count: number;
  comment: string;
  title: string;
  price_cash: number;
  price_card: number;
  option: TOption;
  itemId: string;
};

export type TCartAtom = Record<string, TCartProduct>;

export const cartAtom = atom<TCartAtom>({});

export const isOpenOrderAtom = atom(false);

export const payMethodAtom = atom<"cash" | "card">("cash");

export const totalCashAtom = atom((get) =>
  Object.values(get(cartAtom)).reduce(
    (acc, { count, price_cash }) =>
      count > 0 ? acc + price_cash * count : acc,
    0,
  ),
);

export const totalCardAtom = atom((get) =>
  Object.values(get(cartAtom)).reduce(
    (acc, { count, price_card, price_cash }) =>
      count > 0 ? acc + (price_card || price_cash) * count : acc,
    0,
  ),
);

export const orderAtom = atom((get) =>
  Object.entries(get(cartAtom)).reduce(
    (
      acc,
      [id, { count, option, price_card, price_cash, title, itemId, comment }],
    ) => {
      if (count) {
        acc.push({
          count,
          option,
          price_card,
          price_cash,
          title,
          id,
          itemId,
          comment,
        });
      }
      return acc;
    },
    [] as (TCartProduct & { id: string })[],
  ),
);

export const orderStringAtom = atom((get) => {
  let string = Object.entries(get(cartAtom)).reduce(
    (acc, [_, { count, option, title, comment }]) => {
      if (count) {
        acc += `${title.toUpperCase()} - ${count} - ${option}`;
        if (comment) {
          acc += `\nComentario: ${comment}`;
        }
        acc += "\n------------------\n";
      }
      return acc;
    },
    "",
  );
  string += `\nMétodo de pago: ${
    get(payMethodAtom) === "cash" ? "Efectivo" : "Otro método"
  }`;
  return string;
});
