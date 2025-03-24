"use client";

import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DEBOUNCE_TIME_MS = 300;

export const SearchInput = ({
  queryKey,
  ...props
}: { queryKey: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (query) {
        params.set(queryKey, query);
      } else {
        params.delete(queryKey);
      }

      replace(`${pathname}?${params.toString()}`);
    }, DEBOUNCE_TIME_MS);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="search"
      defaultValue={searchParams.get(queryKey) || ""}
      autoComplete="off"
      {...props}
    />
  );
};
