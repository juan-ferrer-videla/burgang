import { genSalt, hash } from "bcrypt";
import prisma from "../prisma";

export const changePassword = async (password: string, user: string) => {
  const salt = await genSalt();
  const hashPassword = await hash(password, salt);
  await prisma.user.update({
    where: { user },
    data: { password: hashPassword },
  });
};

export const getUser = async (user: string) => {
  return prisma.user.findUnique({
    where: {
      user,
    },
  });
};
