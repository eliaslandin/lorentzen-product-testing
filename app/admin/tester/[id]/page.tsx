import { LoadingCard } from "@/components/loading-card";
import { TestInfoSection } from "@/components/test-info-section";
import { View } from "@/components/view";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <View>
      <Suspense fallback={<LoadingCard />}>
        <TestInfoSection id={id} />
      </Suspense>
    </View>
  );
}
