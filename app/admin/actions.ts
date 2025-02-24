"use server";

import { checkIfUserIsAdmin } from "@/lib/dal";
import { createTestPersonSchema } from "@/lib/schemas";
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

  const addUser = await supabaseServiceRole
    .schema("api")
    .from("profiles")
    .insert({
      id: data.user.id,
      name: submission.value.name,
      personal_number: submission.value.personal_number,
    });

  if (addUser.error) {
    console.error(addUser.error);
    return submission.reply({
      formErrors: ["Servererror"],
    });
  }

  revalidatePath("/admin/test-persons");
  redirect("/admin/test-persons");
};
