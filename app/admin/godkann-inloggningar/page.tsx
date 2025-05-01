import { View } from "@/components/view";
import { createClient } from "@/utils/supabase/server";
import { LoginRequestList } from "@/components/login-request-list";

export default async function Page() {
  const supabase = await createClient();

  const { data: logReqData, error: logReqError } = await supabase
    .schema("api")
    .from("login_requests")
    .select(
      `*,
      ...profiles(name)
    `,
    )
    .order("created_at", { ascending: false });

  if (logReqError) {
    throw new Error("Servererror");
  }

  return (
    <View className="bg-muted gap-8 min-h-screen items-center">
      <LoginRequestList initialData={logReqData ?? []} />
    </View>
  );
}
