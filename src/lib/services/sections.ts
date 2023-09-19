import prisma from "../prisma";
import { cache } from "react";

export const revalidate = 1800; // revalidate the data at most every hour

export const getSections = cache(async () => {
  const sections = await prisma.section.findMany({
    include: { products: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });
  return sections;
});

export const createSection = async (
  title: string,
  description: string,
  order: number,
  special: boolean,
) => {
  await prisma.section.create({
    data: {
      title,
      description,
      order,
      special,
    },
  });
};

export const deleteSection = async (id: string) => {
  await prisma.section.delete({
    where: {
      id,
    },
  });
};

export const updateSection = async (
  id: string,
  title: string,
  description: string,
  special: boolean,
) => {
  await prisma.section.update({
    where: { id },
    data: { title, description, special },
  });
};

export const moveSectionDown = async (
  order: number,
  id: string,
  nextId: string,
  nextOrder: number,
) => {
  await Promise.all([
    prisma.section.update({ where: { id }, data: { order: nextOrder } }),
    prisma.section.update({ where: { id: nextId }, data: { order } }),
  ]);
};
export const moveSectionUp = async (
  order: number,
  id: string,
  prevId: string,
  prevOrder: number,
) => {
  await Promise.all([
    prisma.section.update({ where: { id }, data: { order: prevOrder } }),
    prisma.section.update({ where: { id: prevId }, data: { order } }),
  ]);
};
