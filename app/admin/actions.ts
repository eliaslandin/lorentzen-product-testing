"use server";

import { checkIfUserIsAdmin } from "@/lib/dal";
import {
  approveLoginSchema,
  createTestPersonSchema,
  createTestSchema,
} from "@/lib/schemas";
import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/service-role";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/client/components/navigation";

export const createTestPersonAction = async (
  prevState: unknown,
  formData: FormData,
) => {
  const submission = parseWithZod(formData, {
    schema: createTestPersonSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const userIsAdmin = await checkIfUserIsAdmin();

  if (!userIsAdmin) {
    console.error("Non-admin trying to perform admin action.");
    return submission.reply({
      formErrors: ["Behörighet saknas"],
    });
  }

  // Create a user for test person to be used for authentication
  const supabaseServiceRole = await createServiceRoleClient();
  const { data, error } = await supabaseServiceRole.auth.admin.createUser({
    email: `tp-${submission.value.personal_number}@lenalorentzendesign.se`,
    email_confirm: true,
  });

  if (error) {
    console.error(JSON.stringify(error));
    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  console.log(`User with ID ${data.user.id} added to auth.users table.`);

  // Add test person to profiles and city_user_relations table
  const supabase = await createClient();
  const addUserRes = await supabase.schema("api").from("profiles").insert({
    id: data.user.id,
    name: submission.value.name,
    personal_number: submission.value.personal_number,
  });

  let addUserCityRes;
  if (submission.value.city) {
    addUserCityRes = await supabase
      .schema("api")
      .from("city_user_relations")
      .insert({
        user_id: data.user.id,
        city_id: submission.value.city,
      });
  }

  if (addUserRes.error || addUserCityRes?.error) {
    addUserRes.error &&
      console.error(
        JSON.stringify("Add user profile error:" + addUserRes.error),
      );
    addUserCityRes?.error &&
      console.error(
        "Add user city relation error:" + JSON.stringify(addUserCityRes.error),
      );
    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  console.log(
    `User with ID ${data.user.id} added to profiles and city_user_relations table.`,
  );

  revalidatePath("/admin/testpersoner");
  revalidatePath("/admin/tester/[id]", "page");
  redirect("/admin/testpersoner");
};

export const createTestAction = async (
  prevState: unknown,
  formData: FormData,
) => {
  const submission = parseWithZod(formData, {
    schema: createTestSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const supabase = await createClient();

  const addTest = await supabase
    .schema("api")
    .from("tests")
    .insert({
      name: submission.value.name,
      city: submission.value.city,
      company: submission.value.company,
      description: submission.value.description,
      date: submission.value.date && submission.value.date.toISOString(),
    });

  if (addTest.error) {
    console.error(addTest.error);
    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  revalidatePath("/admin/tester");
  redirect("/admin/tester");
};

export const addPersonToTestAction = async (
  prevState: { error: string | null } | null,
  { testId, userId }: { testId: number; userId: string },
) => {
  const supabase = await createClient();
  const { error, status } = await supabase
    .schema("api")
    .from("user_test_relations")
    .insert({
      test_id: testId,
      user_id: userId,
    })
    .select()
    .single();

  revalidatePath(`/admin/tester/${testId}`);

  if (error) {
    console.error(error);
  }

  return {
    error: error ? (status === 409 ? "Redan tillagd" : "Servererror") : null,
  };
};

export const removePersonFromTestAction = async (
  prevState: { error: string | null } | null,
  { id, testId }: { id: number; testId: number },
) => {
  const supabase = await createClient();
  const { error } = await supabase
    .schema("api")
    .from("user_test_relations")
    .delete()
    .eq("id", id);

  revalidatePath(`/admin/tester/${testId}`);

  if (error) {
    console.error(error);
  }

  return {
    error: error ? "Servererror" : null,
  };
};

export const approveLoginRequestAction = async (
  prevState: unknown,
  formData: FormData,
) => {
  const submission = parseWithZod(formData, {
    schema: approveLoginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const supabase = await createClient();
  const { data: logReqData, error: logReqError } = await supabase
    .schema("api")
    .from("login_requests")
    .select()
    .eq("anonymous_user_id", submission.value.anon_uid)
    .single();

  if (logReqError) {
    console.error(logReqError);
    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  if (logReqData.pair_code !== submission.value.pair_code) {
    console.error(
      `Pair code is wrong. Code in DB: ${logReqData.pair_code}. Received code: ${submission.value.pair_code}`,
    );
    return submission.reply({
      formErrors: ["Fel bekräftelsekod"],
    });
  }

  const { error } = await supabase
    .schema("api")
    .from("login_requests")
    .update({ approved: true })
    .eq("anonymous_user_id", submission.value.anon_uid);

  if (error) {
    console.error(error);
    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  revalidatePath("/admin/godkann-inloggningar");
};

export const removeLoginReqAction = async (
  prevState: { error: string | null } | null,
  { anon_uid }: { anon_uid: string },
) => {
  const supabase = await createClient();
  const { error } = await supabase
    .schema("api")
    .from("login_requests")
    .delete()
    .eq("anonymous_user_id", anon_uid);

  revalidatePath("/admin/godkann-inloggningar");

  if (error) {
    console.error(error);
  }

  return {
    error: error ? "Servererror" : null,
  };
};
