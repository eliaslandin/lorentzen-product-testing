import { cn } from "@/lib/utils";
import { InputOTPSlot } from "./ui/input-otp";

export const InputOTPSlotBig = ({
  index,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { index: number }) => (
  <InputOTPSlot
    index={index}
    className={cn("md:h-14 md:w-14 md:text-2xl", className)}
    {...props}
  />
);
