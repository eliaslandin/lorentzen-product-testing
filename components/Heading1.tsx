import { cn } from "@/lib/utils";

export const Heading1 = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: string;
} & React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn("text-lg", className)} {...props}>
    {children}
  </h1>
);
