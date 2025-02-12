import { ReactNode } from "react";

export const FormErrorMessage = ({ children }: { children: ReactNode }) => {
  return <p className="text-destructive">{children}</p>;
};
