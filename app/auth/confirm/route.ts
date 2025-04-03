import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  console.log("tok", token_hash);
  console.log("typ", type);
  console.log("next", next);
  if (token_hash && type) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      console.log("DATA:", JSON.stringify(data));
      // redirect user to specified redirect URL or root of app
      redirect(next);
    } else {
      console.error(JSON.stringify(error));
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error");
}
