import React, { ComponentProps, FC } from "react";
import { SVGContainer, type TSize } from "./SVGContainer";

interface Props extends ComponentProps<"svg"> {
  size?: TSize;
}

export const FoodIcon: FC<Props> = (props) => {
  return (
    <SVGContainer {...props} title="Menu">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
    </SVGContainer>
  );
};
