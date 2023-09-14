"use server";

import { SPLITTER } from "@/constants";
import { changePassword, getUser } from "@/lib/services/user";
import { compare } from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (user: string, password: string) => {
  const userFromDB = await getUser(user);
  if (userFromDB === null) return { error: true };
  if (await compare(password, userFromDB.password)) {
    const accessToken =
      process.env.TOKEN_LOGIN + SPLITTER + Date.now().toString(16);
    cookies().set("token_login", accessToken, {
      secure: true,
      sameSite: "strict",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
    redirect(`/admin `);
  } else {
    return { error: true };
  }
};

export const changePasswordAction = async (password: string, user: string) => {
  await changePassword(password, user);
};
