import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const LoadingCard = ({ className }: { className?: string }) => (
  <Skeleton className={cn("w-full h-40", className)} />
);
