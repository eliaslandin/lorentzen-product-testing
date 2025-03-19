"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Input } from "./ui/input";
import { createClient } from "@/utils/supabase/client";
import { Popover, PopoverAnchor, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { Spinner } from "./spinner";
import { useInputControl } from "@conform-to/react";
import { Database } from "@/lib/database.types";

const DEBOUNCE_TIME_MS = 2000;

type SupportedTables = "cities" | "companies";
type ItemDbType = Database["api"]["Tables"][SupportedTables]["Row"];

export const InputWithLookup = ({
  table,
  column,
  field,
  setFieldNameAction,
  defaultValue,
  ...props
}: {
  table: SupportedTables;
  column: "name";
  field: ReturnType<typeof useInputControl<string>>;
  setFieldNameAction: Dispatch<SetStateAction<string | null>>;
  defaultValue?: ItemDbType["id"];
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [query, setQuery] = useState("");
  const supabase = createClient();
  const [matches, setMatches] = useState<ItemDbType[]>([]);
  const [isPending, setIsPending] = useState(false);

  const handleSelectValue = async (
    id: ItemDbType["id"],
    insertedItem?: ItemDbType,
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
    const { data, error } = await supabase
      .schema("api")
      .from(table)
      .insert({
        [column]: query,
      })
      .select()
      .single();

    if (error || !data) {
      setIsPending(false);
      throw new Error("Servererror");
    }

    handleSelectValue(data.id, data);
    setIsPending(false);
  };

  const queryTable = useCallback(async () => {
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
  }, [query]);

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

  useEffect(() => {
    if (!defaultValue) {
      return;
    }

    const getLookupValueForDefaultValue = async () => {
      const { data } = await supabase
        .schema("api")
        .from(table)
        .select()
        .eq("id", defaultValue)
        .single();

      if (data) {
        setFieldNameAction(data[column]);
      }
    };

    getLookupValueForDefaultValue();
  }, []);

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
