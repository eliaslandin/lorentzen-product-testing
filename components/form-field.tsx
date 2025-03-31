import { ReactNode } from "react";
import { Label } from "./ui/label";
import { View } from "./view";
import { cn } from "@/lib/utils";

export const FormField = ({
  children,
  inputId,
  errorMessage,
  label,
  orientation = "vertical",
}: {
  children: ReactNode;
  label?: string;
  inputId: string;
  errorMessage?: string | string[];
  orientation?: "vertical" | "horizontal";
}) => {
  return (
    <div>
      <View
        className={cn(
          "gap-2",
          orientation === "horizontal" && "flex-row items-center gap-4",
        )}
      >
        {label && <Label htmlFor={inputId}>{label}</Label>}
        {children}
      </View>
      <p className="mt-2 md:text-lg text-destructive">{errorMessage}</p>
    </div>
  );
};
