import prisma from "../prisma";

export const getSections = async () => {
  const sections = await prisma.section.findMany({
    include: {
      products: { orderBy: { order: "asc" } },
      extras: { orderBy: { order: "asc" } },
    },
    orderBy: { order: "asc" },
  });
  return sections;
};

export const createSection = async (
  title: string,
  description: string,
  order: number,
) => {
  await prisma.section.create({
    data: {
      title,
      description,
      order,
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
) => {
  await prisma.section.update({
    where: { id },
    data: { title, description },
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
