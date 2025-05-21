import { H1 } from "@/components/H1";
import { PersonalInfoForm } from "@/components/personal-info-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPersonalInfoSubmission } from "@/lib/fetchers";
import { createClient } from "@/utils/supabase/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id: testId } = await params;

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw new Error("Servererror");
  }

  const { data: persInfoData, error: persInfoError } =
    await getPersonalInfoSubmission(userData.user.id, testId);

  if (persInfoError) {
    if (persInfoError.code !== "PGRST116") {
      throw new Error("Servererror");
    }
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
          userId={userData.user.id}
          testId={testId}
          initialData={persInfoData}
        />
      </CardContent>
    </Card>
  );
}
