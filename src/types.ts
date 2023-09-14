export type TSection = {
  id: string;
  title: string;
  description: string;
  order: number;
  products: TProduct[];
};

export type TProduct = {
  id: string;
  description: string;
  discount: number;
  title: string;
  price: number;
  order: number;
};
