import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export const Skeleton = ({
  isLoading,
  children,
  className,
}: { isLoading: boolean } & ComponentPropsWithoutRef<"div">) =>
  isLoading ? (
    <span
      className={clsx(
        "relative top-0.5 inline-flex h-3 flex-1 animate-pulse items-center bg-gray-200",
        className
      )}
    />
  ) : (
    <>{children}</>
  );
