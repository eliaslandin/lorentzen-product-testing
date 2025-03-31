import { ReactNode } from "react";

export const FormErrorMessage = ({ children }: { children: ReactNode }) => {
  return <p className="md:text-lg text-destructive">{children}</p>;
};
