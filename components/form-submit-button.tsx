import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Spinner } from "./spinner";

export const FormSubmitButton = ({
  children,
  pending = false,
  ...props
}: {
  children: ReactNode;
  pending?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      className="items-center justify-center"
      disabled={pending}
      type="submit"
      {...props}
    >
      {pending ? <Spinner /> : children}
    </Button>
  );
};
