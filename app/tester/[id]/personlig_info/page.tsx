import { H1 } from "@/components/H1";
import { PersonalInfoForm } from "@/components/personal-info-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getMostRecentPersonalInfo,
  getPersonalInfoSubmission,
} from "@/lib/fetchers";
import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id: testId } = await params;
  let initialData: QueryData<
    ReturnType<typeof getPersonalInfoSubmission>
  > | null = null;

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Servererror");
  }

  const { data: persInfoData, error: persInfoError } =
    await getPersonalInfoSubmission(user.id, testId);

  if (persInfoError) {
    if (persInfoError?.code === "PGRST116") {
      const { data: prevPersInfoData, error: prevPersInfoError } =
        await getMostRecentPersonalInfo(user.id);

      initialData = prevPersInfoData;
    } else {
      throw new Error("Servererror");
    }
  } else {
    initialData = persInfoData;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <H1>Personlig information</H1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PersonalInfoForm
          userId={user.id}
          testId={testId}
          initialData={initialData}
        />
      </CardContent>
    </Card>
  );
}
