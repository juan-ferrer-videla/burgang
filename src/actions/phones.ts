"use server";

import {
  createPhone,
  deletePhone,
  getPhones,
  updatePhone,
} from "@/lib/services/phones";
import { revalidatePath } from "next/cache";

export const getPhonesAction = async () => {
  const phones = await getPhones();
  revalidatePath("/admin/content-manager");
  return phones;
};
export const deletePhoneAction = async (id: string) => {
  await deletePhone(id);
  revalidatePath("/admin/content-manager");
};
export const createPhoneAction = async (phone: string, name: string) => {
  await createPhone(phone, name);
  revalidatePath("/admin/content-manager");
};
export const updatePhoneAction = async (
  id: string,
  phone: string,
  name: string,
) => {
  await updatePhone(id, phone, name);
  revalidatePath("/admin/content-manager");
};
