"server-only";

import { createClient } from "../utils/supabase/server";
import * as jwt from "jsonwebtoken";

type AuthTokenClaims = {
  app_metadata: {
    user_roles?: string[];
  };
};

export const checkIfUserIsAdmin = async () => {
  const supabase = await createClient();

  await supabase.auth.getUser();
  const session = await supabase.auth.getSession();

  if (session.error || !session.data.session) {
    console.error(session.error?.message || "Session error");
    throw new Error("Session error");
  }

  const payload = jwt.verify(session.data.session.access_token, process.env.SUPABASE_JWT_SECRET_KEY!) as AuthTokenClaims;

  console.log("Payload", payload);

  if (payload.app_metadata?.user_roles && payload.app_metadata?.user_roles.includes("admin")) {
    return true;
  } else {
    return false;
  }
};
