import { type NextRequest } from "next/server";

import { redirect } from "next/navigation";
import { createServiceRoleClient } from "@/utils/supabase/service-role";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const anon_uid = searchParams.get("anon_uid");

  if (!anon_uid) {
    console.error("No anonymous user id in url search params");
    redirect("/");
  }

  const supabase = await createServiceRoleClient();

  const { data: logReqData, error: logReqError } = await supabase
    .schema("api")
    .from("login_requests")
    .select()
    .eq("anonymous_user_id", anon_uid)
    .single();

  if (logReqError) {
    console.error(JSON.stringify(logReqError));
    throw new Error("Servererror");
  }

  if (!logReqData.approved) {
    console.error(
      `Error: Attempt to log in user request that is not approved by admin.`,
    );
    redirect("/");
  }

  const { data: profileData, error: profileError } = await supabase
    .schema("api")
    .from("profiles")
    .select()
    .eq("personal_number", logReqData.personal_number)
    .single();

  if (profileError) {
    console.error(JSON.stringify(profileError));
    redirect("/");
  }

  console.log(`Logging in test person ${profileData.name}`);
  redirect("/protected");
}
