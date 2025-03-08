import { useEffect, useState } from "react";
import { Input } from "./ui/input";

const DEBOUNCE_TIME_MS = 2000;

export const InputWithLookup = ({
  table,
  ...props
}: {
  table: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.length === 0) {
        return;
      }

      console.log("Looking up term", query);
      console.log("In table", table);
    }, DEBOUNCE_TIME_MS);

    return () => clearTimeout(debounce);
  }, [query]);

  return <Input onChange={(e) => setQuery(e.target.value)} {...props} />;
};
