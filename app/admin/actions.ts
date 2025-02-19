"use server";

import { getUserVerifiedAsAdmin } from "@/lib/dal";
import { createTestPersonSchema } from "@/lib/schemas";
import { createClient } from "@/utils/supabase/server";
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

  const invokingAdmin = await getUserVerifiedAsAdmin();
  console.log(`Invoked by: ${invokingAdmin.email || invokingAdmin.id}`);

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

  const supabase = await createClient();
  const { data: profileData, error: profileError } = await supabase
    .from("profile")
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
