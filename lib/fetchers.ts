"server-only";

import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getTestPersons = cache(async (query: string = "") => {
  const supabase = await createClient();
  return await supabase
    .schema("api")
    .from("profiles")
    .select(
      `
      *, 
      cities:city_user_relations (
        ...cities (
          name
        )
      )
    `,
    )
    .ilike("name", `%${query}%`);
});

export const getTests = cache(async () => {
  const supabase = await createClient();
  return await supabase.schema("api").from("tests").select(`
    *,
    ...cities(city_name:name),
    ...companies(company_name:name)
  `);
});

export const getTest = cache(async (id: number) => {
  const supabase = await createClient();
  return await supabase
    .schema("api")
    .from("tests")
    .select(
      `
      *,
      ...cities(city_name:name),
      ...companies(company_name:name)
    `,
    )
    .eq("id", id)
    .single();
});

export const getTestsTestPersons = cache(
  async (id: number, query: string = "") => {
    const supabase = await createClient();
    return await supabase
      .schema("api")
      .from("user_test_relations")
      .select(
        `
      user_test_relation_id:id,
      ...profiles!inner (
        *, 
        cities:city_user_relations (
          ...cities (
            name
          )
        )
      )
      `,
      )
      .eq("test_id", id)
      .or(`name.ilike.%${query}%`, { referencedTable: "profiles" });
  },
);
