import { LoadingCard } from "@/components/loading-card";
import { ParticipantsSection } from "@/components/participants-section";
import { TestInfoSection } from "@/components/test-info-section";
import { View } from "@/components/view";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams?: Promise<{ q1?: string }>;
}) {
  const { id } = await params;
  const search = await searchParams;

  return (
    <View className="gap-4">
      <Suspense fallback={<LoadingCard />}>
        <TestInfoSection id={id} />
      </Suspense>
      <View>
        <ParticipantsSection id={id} searchParams={search} />
      </View>
    </View>
  );
}
