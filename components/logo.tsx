import Image from "next/image";
import logo from "@/public/lll-icon-red.png";
import { cn } from "@/lib/utils";
import { ImageOptionalProps } from "@/lib/types";

export const Logo = ({
  className,
  ...props
}: { className?: string } & ImageOptionalProps) => {
  return (
    <Image
      {...props}
      src={logo}
      alt="Lena Lorentzen Design logga"
      quality={100}
      className={cn("object-cover", className)}
    />
  );
};
