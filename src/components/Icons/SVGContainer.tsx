import React, { ComponentProps, FC, ReactNode } from "react";

export type TSize = keyof typeof iconSize | number;

interface Props extends ComponentProps<"svg"> {
  title: string;
  size?: TSize;
  children: ReactNode;
}

const iconSize = {
  xs: 20,
  sm: 24,
  md: 28,
  lg: 32,
  xl: 36,
  "2xl": 40,
  "3xl": 48,
  "4xl": 52,
  "5xl": 56,
  "6xl": 60,
  "7xl": 64,
};
export const SVGContainer: FC<Props> = ({
  size = "md",
  children,
  title,
  ...props
}) => {
  const sizeToNumber = typeof size === "number" ? size : iconSize[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeToNumber}
      height={sizeToNumber}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
};
