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
