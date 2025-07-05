"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod/v4";
import { addPersonalInfoSchema, requestLoginSchema } from "@/lib/schemas";
import { createServiceRoleClient } from "@/utils/supabase/service-role";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/logga-in", error.message);
  }

  return redirect("/admin");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
};

export const requestLoginAction = async (
  prevState: unknown,
  formData: FormData,
) => {
  const submission = parseWithZod(formData, {
    schema: requestLoginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log(
    `Personal number ${submission.value.personal_number} requesting login...`,
  );

  const supabaseServiceRole = await createServiceRoleClient();

  console.log(
    "Attempting to retrieve user with matching personal number from db...",
  );
  const { data: getUserData, error: getUserError } = await supabaseServiceRole
    .schema("api")
    .from("profiles")
    .select("name, id, personal_number")
    .eq("personal_number", submission.value.personal_number)
    .single();

  if (getUserError) {
    console.error(JSON.stringify(getUserError));
    // 0 or more than 1 item returned when requesting single item
    if (getUserError.code === "PGRST116") {
      return submission.reply({
        formErrors: ["Testpersonen hittades inte i databasen"],
      });
    } else {
      return submission.reply({
        formErrors: ["Servererror"],
      });
    }
  }

  console.log(
    `User found in database! User ID: ${getUserData.id}. User's name: ${getUserData.name}`,
  );

  // Create temp user to use for auth until login req is approved
  const randomUUID = crypto.randomUUID();
  const anonUserEmail = `login-req-anon-user-${randomUUID}@lenalorentzendesign.se`;
  const { data: anonUserData, error: anonUserError } =
    await supabaseServiceRole.auth.admin.createUser({
      email: anonUserEmail,
      email_confirm: true,
    });

  if (anonUserError) {
    console.error(JSON.stringify(anonUserError));
    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  console.log(
    `Anonymous user successfully created. Anonymous user ID is: ${anonUserData.user.id}`,
  );

  // Add login request to db
  const loginReqItemWithOutPairCode = {
    anonymous_user_id: anonUserData.user.id,
    personal_number: submission.value.personal_number,
  };

  const PAIR_CODE_MAX_VALUE = 99;
  let loginReqInserted = false;
  let i = 0;

  // Retry insert if pair code is not unique in database
  while (!loginReqInserted && i < 100) {
    const pairCode = Math.floor(Math.random() * PAIR_CODE_MAX_VALUE);
    const loginReqItem = {
      ...loginReqItemWithOutPairCode,
      pair_code: pairCode,
    };

    const { error: logReqError } = await supabaseServiceRole
      .schema("api")
      .from("login_requests")
      .insert(loginReqItem);

    i += 1;

    if (!logReqError) {
      loginReqInserted = true;

      console.log(
        `Login request successfully added to login requests table as: ${JSON.stringify(loginReqItem)}`,
      );
    } else {
      if (logReqError.code === "23505" && i < 100) {
        console.log(
          `Login request with same pair code already exists. Attempting to add item again with new pair code. Attempt: ${i}`,
        );
      } else {
        console.error(JSON.stringify(logReqError));
        return submission.reply({
          formErrors: ["Servererror"],
        });
      }
    }
  }

  // Sign in user as anonymous user with magic link
  const { data: magicLinkData, error: magicLinkError } =
    await supabaseServiceRole.auth.admin.generateLink({
      type: "magiclink",
      email: anonUserEmail,
    });

  if (magicLinkError) {
    console.error(JSON.stringify(magicLinkError));
    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  console.log("Magic link for anonymous sign in successfully created.");

  console.log(
    "Redirecting user to confirm page to get logged in with magic link.",
  );
  const origin = (await headers()).get("origin");
  redirect(
    `${origin}/auth/redirect?type=email&token_hash=${magicLinkData.properties.hashed_token}&next=${encodeURIComponent("/invanta-bekraftning")}`,
  );
};

export const addPersonalInfoAction = async (
  prevState: unknown,
  formData: FormData,
) => {
  const submission = parseWithZod(formData, { schema: addPersonalInfoSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log("Input successfully validated.");

  // Adding personal info submission to database
  console.log("Attempting to add personal info submission to database...");
  const supabase = await createClient();
  const { error } = await supabase
    .schema("api")
    .from("personal_info_submissions")
    .upsert(
      {
        ...submission.value,
      },
      {
        onConflict: "user_id, test_id",
      },
    );

  if (error) {
    console.error(
      `Failed to add personal info to database. Error: ${JSON.stringify(error)}`,
    );
    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  console.log("Successfully added personal info submission to database!");
};
