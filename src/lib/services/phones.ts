import prisma from "../prisma";

export const createPhone = async (phone: string, name: string) => {
  await prisma.phone.create({ data: { phone, name } });
};

export const getPhones = async () => {
  return await prisma.phone.findMany();
};

export const updatePhone = async (id: string, phone: string, name: string) => {
  await prisma.phone.update({
    where: { id },
    data: { phone, name },
  });
};
export const deletePhone = async (id: string) => {
  await prisma.phone.delete({
    where: { id },
  });
};
