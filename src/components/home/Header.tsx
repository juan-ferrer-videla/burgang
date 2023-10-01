import React from "react";
import { OpenButton } from "./OpenButton";
import { InstagramIcon } from "../Icons/InstagramIcon";
import { LocationIcon } from "../Icons/LocationIcon";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50  border-b border-b-zinc-500/30 bg-zinc-950 px-4 py-2 sm:py-4">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        <OpenButton />
        <nav>
          <ul className="flex items-center gap-x-2">
            <li>
              <a href="https://www.instagram.com/burgang.ar/" target="_blank">
                <InstagramIcon className="h-auto stroke-primary" size={"xl"} />
              </a>
            </li>
            <li>
              <a href="#location">
                <LocationIcon className="h-auto stroke-primary " size={"xl"} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
