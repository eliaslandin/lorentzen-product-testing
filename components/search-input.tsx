"use client";

import { Input } from "./ui/input";

export const SearchInput = ({
  queryKey,
  ...props
}: { queryKey: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <Input
      onChange={(e) => handleChange(e.target.value)}
      type="search"
      autoComplete="off"
      {...props}
    />
  );
};
