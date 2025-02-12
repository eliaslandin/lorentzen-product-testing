import { ReactNode } from "react";
import { View } from "./view";
import { cn } from "@/lib/utils";

export const FormContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <View className={cn("gap-4", className)}>{children}</View>;
};
