"use server";

import { getUserVerifiedAsAdmin } from "@/lib/dal";
import { creatTestPersonSchema } from "@/lib/schemas";
import { ServerErrorResponse, ServerSuccessResponse } from "@/lib/types";
import { createServiceRoleClient } from "@/utils/supabase/service-role";
import { User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const createTestPersonAction = async (
  prevState: any,
  formData: FormData,
): Promise<ServerSuccessResponse<{ user: User }> | ServerErrorResponse> => {
  const { name } = creatTestPersonSchema.parse({
    name: formData.get("name"),
  });

  const invokingAdmin = await getUserVerifiedAsAdmin();
  console.log(`Invoked by: ${invokingAdmin.email || invokingAdmin.id}`);

  const supabaseServiceRole = await createServiceRoleClient();
  const { data, error } = await supabaseServiceRole.auth.admin.createUser({
    email: `tp-${crypto.randomUUID()}@lenalorentzendesign.se`,
    email_confirm: true,
    user_metadata: {
      name_at_creation: name,
    },
  });

  if (error) {
    console.error(JSON.stringify(error));
    return {
      data: null,
      error: "Kunde inte lägga till ny testperson.",
    };
  }

  revalidatePath("/admin/test-persons");

  return {
    error: null,
    data: data,
  };
};
