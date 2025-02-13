import { ForwardedRef, forwardRef, ReactNode } from "react";
import NextLink, { LinkProps } from "next/link";

export const Link = forwardRef(
  (
    props: {
      children: ReactNode;
    } & LinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    return (
      <NextLink
        ref={ref}
        className="ring-offset-background transition-colors focus-visible:ring-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 rounded-md"
        {...props}
      >
        {props.children}
      </NextLink>
    );
  },
);
