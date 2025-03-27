"server-only";

import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getTestPersons = cache(
  async (
    query: string = "",
    {
      page = 1,
      pageSize = 20,
    }: {
      page?: number;
      pageSize?: number;
    } = {},
  ) => {
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
        { count: "exact" },
      )
      .ilike("name", `%${query}%`)
      .range((page - 1) * pageSize, (page - 1) * pageSize + pageSize - 1);
  },
);

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
  async (
    id: number,
    query: string = "",
    {
      page = 1,
      pageSize = 20,
    }: {
      page?: number;
      pageSize?: number;
    } = {},
  ) => {
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
        { count: "exact" },
      )
      .eq("test_id", id)
      .or(`name.ilike.%${query}%`, { referencedTable: "profiles" })
      .range((page - 1) * pageSize, (page - 1) * pageSize + pageSize - 1);
  },
);
