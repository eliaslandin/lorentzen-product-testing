"server-only";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export const checkIfUserIsAdmin = async (): Promise<boolean> => {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError);
    redirect("/sign-in");
  }

  console.log(`Checking if user ${user.email || user.id} is admin...`);

  const { data: userRoles, error } = await supabase.schema("api").from("role_user_relations").select().eq("user_id", user.id);

  if (error) {
    console.error(error);
    throw new Error("Servererror");
  }

  console.log(`User's roles: ${JSON.stringify(userRoles)}`);

  const adminRole = userRoles.some(role => role.role === "admin");

  if (adminRole) {
    console.log("User verified as admin!");
    return true;
  } else {
    console.log("User is not admin!");
    return false;
  }
};
