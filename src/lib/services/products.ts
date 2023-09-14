import prisma from "../prisma";

export const createProduct = async (
  product: {
    order: number;
    price: number;
    title: string;
    description: string;
    discount: number;
  },
  sectionId: string
) => {
  if (product.discount < 0 || product.discount > 100) return;
  await prisma.product.create({
    data: { ...product, section: { connect: { id: sectionId } } },
  });
};

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

export const updateProduct = async (
  id: string,
  price: number,
  title: string,
  description: string,
  discount: number
) => {
  if (discount < 0 || discount > 100) return;
  await prisma.product.update({
    where: {
      id,
    },
    data: { price, title, description, discount },
  });
};

export const moveProductDown = async (
  order: number,
  id: string,
  nextId: string,
  nextOrder: number
) => {
  await Promise.all([
    prisma.product.update({ where: { id }, data: { order: nextOrder } }),
    prisma.product.update({ where: { id: nextId }, data: { order } }),
  ]);
};
export const moveProductUp = async (
  order: number,
  id: string,
  prevId: string,
  prevOrder: number
) => {
  await Promise.all([
    prisma.product.update({ where: { id }, data: { order: prevOrder } }),
    prisma.product.update({ where: { id: prevId }, data: { order } }),
  ]);
};
