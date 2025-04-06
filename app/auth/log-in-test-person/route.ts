import { type NextRequest } from "next/server";

import { redirect } from "next/navigation";
import { createServiceRoleClient } from "@/utils/supabase/service-role";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const anon_uid = searchParams.get("anon_uid");

  if (!anon_uid) {
    console.error("No anonymous user id in url search params");
    redirect("/");
  }

  const supabaseServiceRole = await createServiceRoleClient();

  const { data: logReqData, error: logReqError } = await supabaseServiceRole
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

  const { data: profileData, error: profileError } = await supabaseServiceRole
    .schema("api")
    .from("profiles")
    .select()
    .eq("personal_number", logReqData.personal_number)
    .single();

  if (profileError) {
    console.error(JSON.stringify(profileError));
    redirect("/");
  }

  const { data: userData, error: userError } =
    await supabaseServiceRole.auth.admin.getUserById(profileData.id);

  if (userError) {
    console.error(JSON.stringify(userError));
    redirect("/");
  }

  if (!userData.user.email) {
    console.error("No email registered on test person in auth users table.");
    redirect("/");
  }

  // Sign in test person with magic link
  const { data: magicLinkData, error: magicLinkError } =
    await supabaseServiceRole.auth.admin.generateLink({
      type: "magiclink",
      email: userData.user.email,
    });

  if (magicLinkError) {
    console.error(JSON.stringify(magicLinkError));
    redirect("/");
  }

  redirect(
    `${origin}/auth/redirect?type=email&token_hash=${magicLinkData.properties.hashed_token}&next=${encodeURIComponent("/protected")}`,
  );
}
