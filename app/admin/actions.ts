"use server";

import { createServiceRoleClient } from "@/utils/supabase/service-role";
import { AuthError, User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export type CustomError = {
  isCustom: true;
  message: string;
};

export type ServerErrorResponse<T> = {
  isError: true;
  isSuccess?: false;
  error: T;
};

export type ServerSuccessResponse<T> = {
  isSuccess: true;
  isError?: false;
  data: T;
};

export const createUserAction = async (
  prevState: any,
  formData: FormData,
): Promise<
  | ServerSuccessResponse<{ user: User }>
  | ServerErrorResponse<AuthError | CustomError>
> => {
  const name = formData.get("name");

  if (!name) {
    return {
      isError: true,
      error: {
        isCustom: true,
        message: "Input a name",
      },
    };
  }

  const supabase = await createServiceRoleClient();

  const { data: getUserData } = await supabase.auth.getUser();

  console.log("Got user: ", getUserData);

  if (
    !getUserData.user ||
    getUserData.user.id !== "c3936b27-ada1-4f72-b3cc-8db2ab18fe5b"
  ) {
    console.error("Unauthorized user!");
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: `tp-${crypto.randomUUID()}@lenalorentzendesign.se`,
    email_confirm: true,
    user_metadata: {
      name_at_creation: name,
    },
  });

  if (error) {
    return {
      isError: true,
      error,
    };
  }

  revalidatePath("/admin/test-persons");

  return {
    isSuccess: true,
    data: data,
  };
};
