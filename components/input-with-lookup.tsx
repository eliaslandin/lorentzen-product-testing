"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { createClient } from "@/utils/supabase/client";
import { Popover, PopoverAnchor, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { Spinner } from "./spinner";
import { useInputControl } from "@conform-to/react";
import { QueryData } from "@supabase/supabase-js";

const DEBOUNCE_TIME_MS = 2000;

export const InputWithLookup = ({
  table,
  column,
  field,
  setFieldNameAction,
  ...props
}: {
  table: "cities" | "companies";
  column: "name";
  field: ReturnType<typeof useInputControl<string>>;
  setFieldNameAction: Dispatch<SetStateAction<string | null>>;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [query, setQuery] = useState("");
  const supabase = createClient();
  const queryCall = supabase
    .schema("api")
    .from(table)
    .select()
    .ilike(column, `%${query}%`);
  const insertCall = supabase
    .schema("api")
    .from(table)
    .insert({
      [column]: query,
    })
    .select()
    .single();
  type InsertResponseType = QueryData<typeof insertCall>;
  type QueryResponseType = QueryData<typeof queryCall>;
  const [matches, setMatches] = useState<QueryResponseType>([]);
  const [isPending, setIsPending] = useState(false);

  const handleSelectValue = (
    id: string | number,
    insertedItem?: InsertResponseType,
  ) => {
    const item = insertedItem || matches.find((match) => match.id === id);

    if (!item) {
      throw new Error("Servererror");
    }

    setFieldNameAction(item[column]);
    field.change(String(id));
    setQuery("");
  };

  const insertIntoTable = async () => {
    setIsPending(true);
    const { data, error } = await insertCall;

    if (error || !data) {
      setIsPending(false);
      throw new Error("Servererror");
    }

    handleSelectValue(data.id, data);
    setIsPending(false);
  };

  const queryTable = async () => {
    const { data, error } = await queryCall;

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
        onBlur={field.blur}
        onFocus={field.focus}
        {...props}
      />
      <Popover open={Boolean(query)}>
        <PopoverAnchor />
        <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
          {isPending ? (
            <Spinner className="text-primary" />
          ) : (
            <ul className="flex flex-col w-full gap-2">
              {matches.map((match) => (
                <li key={match.id}>
                  <Button
                    variant="outline"
                    onClick={() => handleSelectValue(match.id)}
                    className="w-full"
                  >
                    {match[column]}
                  </Button>
                </li>
              ))}

              {!matches.some((match) => match[column] === query) && (
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
