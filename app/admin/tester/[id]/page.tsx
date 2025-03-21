import { LoadingCard } from "@/components/LoadingCard";
import { TestInfoSection } from "@/components/TestInfoSection";
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
