import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export const Skeleton = ({
  isLoading,
  children,
  className,
}: { isLoading: boolean } & ComponentPropsWithoutRef<"div">) =>
  isLoading ? (
    <div className={clsx("h-4 flex-1 animate-pulse bg-gray-200", className)} />
  ) : (
    <>{children}</>
  );
