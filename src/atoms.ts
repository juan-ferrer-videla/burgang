import { atomWithStorage } from "jotai/utils";

export type TCartAtom = Record<string, { count: number; comment: string }>;

export const cartAtom = atomWithStorage<TCartAtom>("cartYummy", {});
