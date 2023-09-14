import React, { ComponentProps, FC } from "react";
import { SVGContainer, type TSize } from "./SVGContainer";

interface Props extends ComponentProps<"svg"> {
  size?: TSize;
}

export const MinusIcon: FC<Props> = (props) => {
  return (
    <SVGContainer {...props} title="Remover">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
    </SVGContainer>
  );
};
