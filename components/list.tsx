import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const List = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <ul className={cn("flex flex-col gap-3", className)}>{children}</ul>;
};
