import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { createClient } from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { Popover, PopoverAnchor, PopoverContent } from "./ui/popover";

const DEBOUNCE_TIME_MS = 2000;

export const InputWithLookup = ({
  table,
  column,
  ...props
}: {
  table: "cities";
  column: "name";
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<any[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  const supabase = createClient();

  const queryTable = async () => {
    const { data, error } = await supabase
      .schema("api")
      .from(table)
      .select()
      .ilike(column, `%${query}%`);

    if (error) {
      setError(error);
      return;
    }

    setMatches(data);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.length === 0) {
        return;
      }

      queryTable();
    }, DEBOUNCE_TIME_MS);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <>
      <Input onChange={(e) => setQuery(e.target.value)} {...props} />
      <Popover open={Boolean(query)}>
        <PopoverAnchor />
        <PopoverContent>
          <ul>{matches && matches.map((match) => <li>{match[column]}</li>)}</ul>
        </PopoverContent>
      </Popover>
    </>
  );
};
