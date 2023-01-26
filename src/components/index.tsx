import clsx from "clsx";
import {
  ComponentPropsWithRef,
  forwardRef,
  ReactNode,
  ElementType,
} from "react";

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type ComponentProps<C extends ElementType> = {
  as?: C;
  children?: ReactNode;
} & ComponentPropsWithRef<C>;

export const createComponent = (tag: string, opts: { className: string }) => {
  const Comp = forwardRef(
    <C extends ElementType>(
      { as, className, ...props }: ComponentProps<C>,
      ref?: PolymorphicRef<C>
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const Component = as || tag;
      return (
        <Component
          ref={ref}
          {...props}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          className={clsx(opts.className, className)}
        />
      );
    }
  );
  Comp.displayName = tag;
  return Comp;
};
