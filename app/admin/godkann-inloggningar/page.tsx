import { View } from "@/components/view";
import { createClient } from "@/utils/supabase/server";
import { LoginApprovalCard } from "@/components/login-approval-card";

export default async function Page() {
  const supabase = await createClient();

  const { data: logReqData, error: logReqError } = await supabase
    .schema("api")
    .from("login_requests")
    .select()
    .order("created_at", { ascending: false });

  if (logReqError) {
    throw new Error("Servererror");
  }

  return (
    <View className="bg-muted gap-8 min-h-screen items-center">
      {logReqData.map((logInReq) => (
        <LoginApprovalCard
          key={logInReq.anonymous_user_id}
          personal_number={logInReq.personal_number}
          anon_uid={logInReq.anonymous_user_id}
          date={logInReq.created_at}
        />
      ))}
    </View>
  );
}
