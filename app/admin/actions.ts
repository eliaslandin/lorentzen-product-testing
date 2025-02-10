"use server";

import { getUserVerifiedAsAdmin } from "@/lib/dal";
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

  const invokingAdmin = await getUserVerifiedAsAdmin();
  console.log(`Invoked by: ${invokingAdmin.email || invokingAdmin.id}`);

  const supabaseServiceRole = await createServiceRoleClient();
  const { data, error } = await supabaseServiceRole.auth.admin.createUser({
    email: `tp-${crypto.randomUUID()}@lenalorentzendesign.se`,
    email_confirm: true,
    user_metadata: {
      name_at_creation: submission.value.name,
    },
  });

  if (error) {
    console.error(JSON.stringify(error));
    return submission.reply({
      formErrors: ["Servererror."],
    });
  }

  console.log(`Test Person successfully created with ID: ${data.user.id}`);

  revalidatePath("/admin/test-persons");
};
