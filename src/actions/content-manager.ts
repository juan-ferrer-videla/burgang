"use server";

import {
  createSection,
  deleteSection,
  getSections,
  moveSectionDown,
  moveSectionUp,
  updateSection,
} from "@/lib/services/sections";
import { revalidatePath } from "next/cache";
import {
  createProduct,
  deleteProduct,
  moveProductDown,
  moveProductUp,
  updateProduct,
} from "@/lib/services/products";

export const getSectionsAction = async () => {
  return await getSections();
};

export const createSectionAction = async (
  title: string,
  description: string,
  order: number,
  special: boolean,
  extras: boolean,
) => {
  await createSection(title, description, order, special, extras);
  revalidatePath("/admin/content-manager");
};

export const deleteSectionAction = async (id: string) => {
  await deleteSection(id);
  revalidatePath("/admin/content-manager");
};

export const updateSectionAction = async (
  id: string,
  title: string,
  description: string,
  special: boolean,
  extras: boolean,
) => {
  await updateSection(id, title, description, special, extras);
  revalidatePath("/admin/content-manager");
};

export const createProductAction = async (
  title: string,
  description: string,
  price_cash: number,
  price_card: number,
  sectionId: string,
  order: number,
  discount: number,
) => {
  await createProduct(
    { title, description, price_cash, price_card, order, discount },
    sectionId,
  );
  revalidatePath("/admin/content-manager");
};

export const deleteProductAction = async (id: string) => {
  await deleteProduct(id);
  revalidatePath("/admin/content-manager");
};

export const updateProductAction = async (
  id: string,
  title: string,
  description: string,
  price_cash: number,
  price_card: number,
  discount: number,
) => {
  await updateProduct(id, price_cash, price_card, title, description, discount);
  revalidatePath("/admin/content-manager");
};

export const moveSectionDownAction = async (
  order: number,
  id: string,
  nextId: string,
  nextOrder: number,
) => {
  await moveSectionDown(order, id, nextId, nextOrder);
  revalidatePath("/admin/content-manager");
};
export const moveSectionUpAction = async (
  order: number,
  id: string,
  prevId: string,
  prevOrder: number,
) => {
  await moveSectionUp(order, id, prevId, prevOrder);
  revalidatePath("/admin/content-manager");
};

export const moveProductDownAction = async (
  id: string,
  order: number,
  nextId: string,
  nextOrder: number,
) => {
  await moveProductDown(order, id, nextId, nextOrder);
  revalidatePath("/admin/content-manager");
};
export const moveProductUpAction = async (
  id: string,
  order: number,
  prevId: string,
  prevOrder: number,
) => {
  await moveProductUp(order, id, prevId, prevOrder);
  revalidatePath("/admin/content-manager");
};
