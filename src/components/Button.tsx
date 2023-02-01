import { ComponentPropsWithoutRef } from "react";

import clsx from "clsx";
import { cva, VariantProps } from "class-variance-authority";

const btnStyles = cva(
  [
    "disabled:cursor-default disabled:opacity-50 inline-flex items-center justify-center px-4 py-2 cursor-pointer transition-colors rounded",
  ],
  {
    variants: {
      intent: {
        solid: [
          "text-gray-800 bg-gray-100 border-gray-300 hover:bg-gray-200 disabled:hover:bg-gray-100",
        ],
        primary: [
          "text-gray-50 bg-gray-900 hover:bg-gray-700 disabled:hover:bg-gray-900",
        ],
        ghost: [""],
      },
      size: {
        sm: ["py-1 px-2"],
        md: ["py-2 px-4"],
      },
    },
    defaultVariants: {
      intent: "solid",
      size: "md",
    },
  }
);

export type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof btnStyles>;

export const Button = ({ className, size, intent, ...props }: ButtonProps) => (
  <button
    type="button"
    className={clsx(btnStyles({ size, intent }), className)}
    {...props}
  />
);
