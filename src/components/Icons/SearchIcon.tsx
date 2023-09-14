import React, { ComponentProps, FC } from "react";
import { SVGContainer, type TSize } from "./SVGContainer";

interface Props extends ComponentProps<"svg"> {
  size?: TSize;
}

export const SearchIcon: FC<Props> = (props) => {
  return (
    <SVGContainer {...props} title="Buscar">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </SVGContainer>
  );
};
