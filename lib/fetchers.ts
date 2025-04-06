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
    .order("date", { ascending: false });
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

export const loginTestPerson = async (anonUserId: string) => {
  const supabase = await createClient();
  const { data: logReqData, error: logReqError } = await supabase
    .schema("api")
    .from("login_requests")
    .select()
    .eq("anonymous_user_id", anonUserId)
    .single();

  if (logReqError) {
    console.error(JSON.stringify(logReqError));
    throw new Error("Servererror");
  }

  if (!logReqData.approved) {
    console.error(
      `Error: Attempt to log in user request that is not approved by admin.`,
    );
    throw new Error("Servererror");
  }

  const { data: profileData, error: profileError } = await supabase
    .schema("api")
    .from("profiles")
    .select()
    .eq("personal_number", logReqData.personal_number)
    .single();

  if (profileError) {
    console.error(JSON.stringify(profileError));
    throw new Error("Servererror");
  }

  console.log(`Logging in test person ${profileData.name}`);
};
