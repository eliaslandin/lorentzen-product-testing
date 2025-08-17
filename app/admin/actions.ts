"use server";

import { checkIfUserIsAdmin } from "@/lib/dal";
import {
  approveLoginSchema,
  createProductSchema,
  createTestPersonSchema,
  createTestSchema,
  updateTestSchema,
} from "@/lib/schemas";
import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/service-role";
import { parseWithZod } from "@conform-to/zod/v4";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/client/components/navigation";

export const createTestPersonAction = async (
  _: unknown,
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
        `Failed to add user profile. Error: ${JSON.stringify(addUserRes.error)}`,
      );
    addUserCityRes?.error &&
      console.error(
        `Failed to add user city relation. Error: ${JSON.stringify(addUserCityRes.error)}`,
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

export const createTestAction = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: createTestSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const supabase = await createClient();

  const { error } = await supabase
    .schema("api")
    .from("tests")
    .insert({
      name: submission.value.name,
      city: submission.value.city,
      company: submission.value.company,
      description: submission.value.description,
      date: submission.value.date && submission.value.date.toISOString(),
    });

  if (error) {
    console.error(`Failed to create test. Error: ${JSON.stringify(error)}`);
    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  revalidatePath("/admin/tester");
  redirect("/admin/tester");
};

export const updateTestAction = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: updateTestSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const supabase = await createClient();
  const { error } = await supabase
    .schema("api")
    .from("tests")
    .update({
      name: submission.value.name,
      city: submission.value.city,
      company: submission.value.company,
      description: submission.value.description,
      date: submission.value.date && submission.value.date.toISOString(),
    })
    .eq("id", submission.value.id);

  if (error) {
    console.error(`Failed to update test. Error: ${JSON.stringify(error)}`);
    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  revalidatePath(`/admin/tester/${submission.value.id}`);
  redirect(`/admin/tester/${submission.value.id}`);
};

export const removeTestAction = async ({
  id,
}: {
  id: number;
}): Promise<{ error: string } | void> => {
  const supabase = await createClient();
  const { error } = await supabase
    .schema("api")
    .from("tests")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Failed to remove test. Error: ${JSON.stringify(error)}`);
    return {
      error: "Servererror",
    };
  }

  revalidatePath("/admin/tester");
  redirect("/admin/tester");
};

export const addPersonToTestAction = async (
  _: unknown,
  { testId, userId }: { testId: number; userId: string },
): Promise<{ error: string | null }> => {
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
    console.error(JSON.stringify(error));
  }

  return {
    error: error ? (status === 409 ? "Redan tillagd" : "Servererror") : null,
  };
};

export const removePersonFromTestAction = async (
  _: unknown,
  { id, testId }: { id: number; testId: number },
): Promise<{ error: string | null }> => {
  const supabase = await createClient();
  const { error } = await supabase
    .schema("api")
    .from("user_test_relations")
    .delete()
    .eq("id", id);

  revalidatePath(`/admin/tester/${testId}`);

  if (error) {
    console.error(JSON.stringify(error));
  }

  return {
    error: error ? "Servererror" : null,
  };
};

export const approveLoginRequestAction = async (
  _: unknown,
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
    console.error(JSON.stringify(logReqError));
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
    console.error(JSON.stringify(error));
    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  revalidatePath("/admin/godkann-inloggningar");
};

export const removeLoginReqAction = async (
  _: unknown,
  { anon_uid }: { anon_uid: string },
): Promise<{ error: string | null }> => {
  const supabase = await createClient();
  const { error } = await supabase
    .schema("api")
    .from("login_requests")
    .delete()
    .eq("anonymous_user_id", anon_uid);

  if (error) {
    console.error(JSON.stringify(error));
  }

  return {
    error: error ? "Servererror" : null,
  };
};

export const toggleTestActiveAction = async (_: unknown, id: number) => {
  const supabase = await createClient();
  const { data: testData, error: testError } = await supabase
    .schema("api")
    .from("tests")
    .select("id, active")
    .eq("id", id)
    .single();

  if (testError) {
    console.error(
      `Failed to retrieve test. Error: ${JSON.stringify(testError)}`,
    );
    throw new Error("Servererror");
  }

  const { error: oldActiveError } = await supabase
    .schema("api")
    .from("tests")
    .update({ active: false })
    .eq("active", true)
    .neq("id", testData.id);

  if (oldActiveError) {
    console.error(
      `Failed to deactivate potentially active test. Error: ${JSON.stringify(oldActiveError)}`,
    );
    throw new Error("Servererror");
  }

  const { error } = await supabase
    .schema("api")
    .from("tests")
    .update({ active: !testData.active })
    .eq("id", id);

  if (error) {
    console.error(
      `Failed to update test's active status. Error: ${JSON.stringify(error)}`,
    );
    throw new Error("Servererror");
  }

  revalidatePath("/admin/tester");
};

export const createProductAction = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: createProductSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const supabase = await createClient();

  let imageName;
  if (submission.value.image?.size) {
    console.log("Attempting to upload image...");
    const { error: storageError } = await supabase.storage
      .from("test_assets")
      .upload(
        `${submission.value.testId}/${submission.value.image.name}`,
        submission.value.image,
      );

    if (storageError) {
      console.error(
        "Failed to upload image. Error:" + JSON.stringify(storageError),
      );

      return submission.reply({
        formErrors: ["Servererror"],
      });
    }

    imageName = `${submission.value.testId}/${submission.value.image.name}`;
  }

  const { error } = await supabase.schema("api").from("products").insert({
    name: submission.value.name,
    description: submission.value.description,
    test_id: submission.value.testId,
    image_name: imageName,
  });

  if (error) {
    console.error("Failed to add product. Error:" + JSON.stringify(error));

    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  revalidatePath("/admin/tester/[id]", "page");
  redirect(`/admin/tester/${submission.value.testId}`);
};

export const removeProductAction = async ({
  id,
}: {
  id: number;
}): Promise<{ error: string } | void> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("api")
    .from("products")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Failed to remove product. Error: ${JSON.stringify(error)}`);
    return {
      error: "Servererror",
    };
  }

  if (data.image_name) {
    const { error: storageError } = await supabase.storage
      .from("test_assets")
      .remove([data.image_name]);

    if (storageError) {
      console.error(
        `Failed to remove product image from storage. Error: ${JSON.stringify(error)}`,
      );
      return {
        error: "Servererror",
      };
    }
  }

  revalidatePath("/admin/tester/[id]", "page");
};
