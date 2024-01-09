import prisma from "../prisma";

export const createExtra = async (
  extra: {
    order: number;
    price: number;
    title: string;
    description: string;
  },
  sectionId: string,
) => {
  await prisma.extra.create({
    data: { ...extra, section: { connect: { id: sectionId } } },
  });
};

export const deleteExtra = async (id: string) => {
  await prisma.extra.delete({
    where: {
      id,
    },
  });
};

export const updateExtra = async ({
  description,
  id,
  price,
  title,
}: {
  id: string;
  price: number;
  title: string;
  description: string;
}) => {
  await prisma.extra.update({
    where: {
      id,
    },
    data: { price, title, description },
  });
};

export const moveExtraDown = async ({
  order,
  id,
  nextId,
  nextOrder,
}: {
  order: number;
  id: string;
  nextId: string;
  nextOrder: number;
}) => {
  await Promise.all([
    prisma.extra.update({ where: { id }, data: { order: nextOrder } }),
    prisma.extra.update({ where: { id: nextId }, data: { order } }),
  ]);
};
export const moveExtraUp = async ({
  id,
  order,
  prevId,
  prevOrder,
}: {
  order: number;
  id: string;
  prevId: string;
  prevOrder: number;
}) => {
  await Promise.all([
    prisma.extra.update({ where: { id }, data: { order: prevOrder } }),
    prisma.extra.update({ where: { id: prevId }, data: { order } }),
  ]);
};
