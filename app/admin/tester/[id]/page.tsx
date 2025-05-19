import { LoadingCard } from "@/components/loading-card";
import { ParticipantsSection } from "@/components/participants-section";
import { TestInfoSection } from "@/components/test-info-section";
import { UnlockTestButton } from "@/components/unlock-test-button";
import { View } from "@/components/view";
import { Suspense } from "react";
import { getTest } from "@/lib/fetchers";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams?: Promise<{
    q1?: string;
    q2?: string;
    p1?: string;
    p2?: string;
  }>;
}) {
  const { id } = await params;
  const search = await searchParams;
  const { data: test, error } = await getTest(id);

  if (error) {
    console.error(`Couldn't get test. Error: ${JSON.stringify(error)}`);
    throw new Error("Servererror");
  }

  return (
    <View className="gap-4">
      <Suspense fallback={<LoadingCard />}>
        <TestInfoSection test={test} />
      </Suspense>
      <UnlockTestButton testId={test.id} testIsActive={test.active} />
      <View>
        <ParticipantsSection id={id} searchParams={search} />
      </View>
    </View>
  );
}
