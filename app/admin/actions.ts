"use server";

import { checkIfUserIsAdmin } from "@/lib/dal";
import { createTestPersonSchema } from "@/lib/schemas";
import { createServiceRoleClient } from "@/utils/supabase/service-role";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";

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

  console.log("User is admin", userIsAdmin);

  if (!userIsAdmin) {
    console.error("User is not admin!");
    return submission.reply({
      formErrors: ["Servererror."],
    });
  }

  const supabaseServiceRole = await createServiceRoleClient();
  const { data, error } = await supabaseServiceRole.auth.admin.createUser({
    email: `tp-${submission.value.personal_number}@lenalorentzendesign.se`,
    email_confirm: true,
  });

  if (error) {
    console.error(JSON.stringify(error));
    return submission.reply({
      formErrors: ["Servererror."],
    });
  }

  console.log(`User with ID ${data.user.id} added to auth.users table.`);

  const { data: profileData, error: profileError } = await supabaseServiceRole
    .schema("api")
    .from("profiles")
    .insert({
      id: data.user.id,
      name: submission.value.name,
      personal_number: submission.value.personal_number,
    });

  if (profileError) {
    console.error(JSON.stringify(profileError));
    return submission.reply({
      formErrors: ["Servererror."],
    });
  }

  revalidatePath("/admin/test-persons");
};
