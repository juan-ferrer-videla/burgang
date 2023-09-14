import React, { ComponentProps, FC } from "react";
import { SVGContainer, type TSize } from "./SVGContainer";

interface Props extends ComponentProps<"svg"> {
  size?: TSize;
}

export const CartIcon: FC<Props> = (props) => {
  return (
    <SVGContainer {...props} title="Mi pedido">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M17 17h-11v-14h-2" />
      <path d="M6 5l14 1l-1 7h-13" />
    </SVGContainer>
  );
};
