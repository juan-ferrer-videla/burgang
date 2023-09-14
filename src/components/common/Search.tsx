"use client";

import { CloseIcon } from "@/components/Icons/CloseIcon";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { type TSection } from "@/types";
import React, { FC, useState } from "react";

export const Search: FC<{
  sections: Pick<TSection, "id" | "title">[];
}> = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scroll = (id: string) => {
    const element = document.getElementById(id);
    const header = document.querySelector("header");
    if (element && header) {
      scrollTo(0, element.offsetTop - header.offsetHeight - 24);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button onClick={handleOpen} className="p-2">
        <SearchIcon />
      </button>
      <aside
        className={`fixed inset-0 bg-zinc-950 transition-transform z-10 text-center ${
          isOpen ? "" : "translate-x-[100vw]"
        }`}
      >
        <div className="bg-primary shadow-md shadow-zinc-950 sticky z-10 top-0 overscroll-contain mb-10 px-4 py-2">
          <div className="max-w-screen-3xl flex justify-between items-center m-auto">
            <h2>La carta</h2>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="container">
          <ul>
            {sections.map(({ id, title }) => (
              <li key={id}>
                <button
                  className="uppercase p-2 text-lg"
                  onClick={() => {
                    scroll(id);
                    handleClose();
                  }}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};
