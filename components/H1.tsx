import { cn } from "@/lib/utils";

export const H1 = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn("text-xl", className)} {...props}>
    {children}
  </h1>
);
