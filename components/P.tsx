import { cn } from "@/lib/utils";

export const P = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-muted-foreground", className)} {...props}>
    {children}
  </p>
);
