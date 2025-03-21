"server-only";

import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getTestPersons = cache(async () => {
  const supabase = await createClient();
  return await supabase.schema("api").from("profiles").select();
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

export const getTestsTestPersons = cache(async (id: number) => {
  const supabase = await createClient();
  return await supabase
    .schema("api")
    .from("user_test_relations")
    .select(
      `
      user_id,
      ...profiles(*)
      `,
    )
    .eq("test_id", id);
});

export const addTestPersonToTest = async (testId: number, userId: string) => {
  const supabase = await createClient();
  await supabase.schema("api").from("user_test_relations").insert({
    test_id: testId,
    user_id: userId,
  });
};
