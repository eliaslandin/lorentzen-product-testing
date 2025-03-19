import { cn } from "@/lib/utils";

export const H2 = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg", className)} {...props}>
    {children}
  </h2>
);
