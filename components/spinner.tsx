import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <Loader2 className={cn("w-6 h-6 animate-spin text-white", className)} />
  );
};
