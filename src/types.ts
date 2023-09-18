export type TSection = {
  id: string;
  title: string;
  description: string;
  order: number;
  special: boolean;
  products: TProduct[];
};

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
export type TOption =
  | "carne"
  | "sin tacc"
  | "veggie"
  | "veggie y sin tacc"
  | "";
