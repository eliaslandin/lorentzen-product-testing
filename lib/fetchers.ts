"server-only";

import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getTestPersons = cache(async () => {
  const supabase = await createClient();
  const res = await supabase.schema("api").from("profiles").select();

  return res;
});
