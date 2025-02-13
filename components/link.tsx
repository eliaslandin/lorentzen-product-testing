import {
  AnchorHTMLAttributes,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from "react";
import { default as NextLink, LinkProps } from "next/link";

export const Link = forwardRef(
  (
    props: {
      children: ReactNode;
    } & LinkProps &
      AnchorHTMLAttributes<HTMLAnchorElement>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    return (
      <NextLink
        ref={ref}
        className="ring-offset-background transition-colors focus-visible:ring-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 rounded-sm"
        {...props}
      >
        {props.children}
      </NextLink>
    );
  },
);
