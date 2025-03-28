import { cn } from "@/lib/utils";
import { InputOTPSlot } from "./ui/input-otp";

export const InputOTPSlotBig = ({
  index,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { index: number }) => (
  <InputOTPSlot
    index={index}
    className={cn("h-14 w-14 text-2xl", className)}
    {...props}
  />
);
