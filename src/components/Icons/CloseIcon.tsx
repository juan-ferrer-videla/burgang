import React, { ComponentProps, FC } from "react";
import { SVGContainer, type TSize } from "./SVGContainer";

interface Props extends ComponentProps<"svg"> {
  size?: TSize;
}

export const CloseIcon: FC<Props> = (props) => {
  return (
    <SVGContainer {...props} title="Cerrar">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </SVGContainer>
  );
};
