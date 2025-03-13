"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { createClient } from "@/utils/supabase/client";
import { Popover, PopoverAnchor, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { Spinner } from "./spinner";

const DEBOUNCE_TIME_MS = 2000;

export const InputWithLookup = ({
  table,
  column,
  handleSelectValue,
  ...props
}: {
  table: "cities";
  column: "name";
  handleSelectValue(arg: any): void;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<any[] | null>(null);
  const [isPending, setIsPending] = useState(false);

  const supabase = createClient();

  const insertIntoTable = async () => {
    setIsPending(true);
    const { data, error } = await supabase
      .schema("api")
      .from(table)
      .insert({
        [column]: query,
      })
      .select()
      .single();

    if (error) {
      setIsPending(false);
      throw new Error("Servererror");
    }

    if (!data) {
      setIsPending(false);
      throw new Error("Servererror");
    }

    handleSelectValue(data.id);
    setQuery("");
    setIsPending(false);
  };

  const queryTable = async () => {
    const { data, error } = await supabase
      .schema("api")
      .from(table)
      .select()
      .ilike(column, `%${query}%`);

    if (error) {
      setIsPending(false);
      throw new Error("Servererror");
    }

    setMatches(data);
    setIsPending(false);
  };

  useEffect(() => {
    setIsPending(true);
    const debounce = setTimeout(() => {
      if (query.length === 0) {
        setIsPending(false);
        return;
      }

      queryTable();
    }, DEBOUNCE_TIME_MS);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        {...props}
      />
      <Popover open={Boolean(query)}>
        <PopoverAnchor />
        <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
          {isPending ? (
            <Spinner className="text-primary" />
          ) : (
            <ul className="flex flex-col w-full gap-2">
              {matches &&
                matches.map((match) => (
                  <li>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleSelectValue(match.id);
                        setQuery("");
                      }}
                      className="w-full"
                    >
                      {match[column]}
                    </Button>
                  </li>
                ))}

              {matches && !matches.some((match) => match[column] === query) && (
                <li>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={insertIntoTable}
                  >
                    <PlusIcon />
                    Skapa "{query}"
                  </Button>
                </li>
              )}
            </ul>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};
