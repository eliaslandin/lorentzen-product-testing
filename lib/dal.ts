"server-only";

import { createClient } from "../utils/supabase/server";

export const getUserVerifiedAsAdmin = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(
      `Error getting invoking user. Error: ${JSON.stringify(error)}`,
    );
    throw new Error("Server Error.");
  }

  if (
    !data.user ||
    !data.user.app_metadata.user_role ||
    data.user.app_metadata.user_role !== "admin"
  ) {
    console.error(`Unauthorized. Get user response: ${JSON.stringify(data)}`);
    throw new Error("Unauthorized.");
  }

  return {
    id: data.user.id,
    email: data.user.email,
  };
};
