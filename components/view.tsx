import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const View = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col w-full", className)}>{children}</div>
  );
};
