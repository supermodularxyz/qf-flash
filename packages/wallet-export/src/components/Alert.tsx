import { PropsWithChildren } from "react";

const alertVariants = {
  error: "border-red-400 bg-red-50",
  info: "border-blue-400 bg-blue-50",
};

type Props = { variant?: keyof typeof alertVariants } & PropsWithChildren;

export const Alert = ({ variant = "info", ...props }: Props) => (
  <div
    className={`flex items-center justify-center rounded border-2 p-8 print:hidden ${alertVariants[variant]}`}
    {...props}
  />
);
