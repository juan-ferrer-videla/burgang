import React, { ComponentProps, FC } from "react";
import { SVGContainer, type TSize } from "./SVGContainer";

interface Props extends ComponentProps<"svg"> {
  size?: TSize;
}

export const EditIcon: FC<Props> = (props) => {
  return (
    <SVGContainer {...props} title="Editar">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
      <path d="M13.5 6.5l4 4" />
    </SVGContainer>
  );
};
