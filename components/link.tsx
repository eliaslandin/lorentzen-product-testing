import {
  AnchorHTMLAttributes,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from "react";

export const Link = forwardRef(
  (
    props: {
      children: ReactNode;
    } & AnchorHTMLAttributes<HTMLAnchorElement>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    return (
      <Link
        ref={ref}
        className="ring-offset-background transition-colors focus-visible:ring-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 rounded-md"
        {...props}
      >
        {props.children}
      </Link>
    );
  },
);
