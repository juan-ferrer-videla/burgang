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
import { cache } from "react";

export const getSectionsAction = cache(async () => {
  return await getSections();
});

export const createSectionAction = async (
  title: string,
  description: string,
  order: number
) => {
  await createSection(title, description, order);
  revalidatePath("/admin/content-manager");
};

export const deleteSectionAction = async (id: string) => {
  await deleteSection(id);
  revalidatePath("/admin/content-manager");
};

export const updateSectionAction = async (
  id: string,
  title: string,
  description: string
) => {
  await updateSection(id, title, description);
  revalidatePath("/admin/content-manager");
};

export const createProductAction = async (
  title: string,
  description: string,
  price: number,
  sectionId: string,
  order: number,
  discount: number
) => {
  await createProduct(
    { title, description, price, order, discount },
    sectionId
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
  price: number,
  discount: number
) => {
  await updateProduct(id, price, title, description, discount);
  revalidatePath("/admin/content-manager");
};

export const moveSectionDownAction = async (
  order: number,
  id: string,
  nextId: string,
  nextOrder: number
) => {
  await moveSectionDown(order, id, nextId, nextOrder);
  revalidatePath("/admin/content-manager");
};
export const moveSectionUpAction = async (
  order: number,
  id: string,
  prevId: string,
  prevOrder: number
) => {
  await moveSectionUp(order, id, prevId, prevOrder);
  revalidatePath("/admin/content-manager");
};

export const moveProductDownAction = async (
  id: string,
  order: number,
  nextId: string,
  nextOrder: number
) => {
  await moveProductDown(order, id, nextId, nextOrder);
  revalidatePath("/admin/content-manager");
};
export const moveProductUpAction = async (
  id: string,
  order: number,
  prevId: string,
  prevOrder: number
) => {
  await moveProductUp(order, id, prevId, prevOrder);
  revalidatePath("/admin/content-manager");
};
