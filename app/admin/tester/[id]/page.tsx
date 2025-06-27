import { LoadingCard } from "@/components/loading-card";
import { ParticipantsSection } from "@/components/participants-section";
import { ProductsSection } from "@/components/products-section";
import { TestInfoSection } from "@/components/test-info-section";
import { View } from "@/components/view";
import { Suspense } from "react";

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

  return (
    <View className="gap-4 items-center">
      <Suspense fallback={<LoadingCard />}>
        <TestInfoSection id={id} />
      </Suspense>
      <View className="flex-row gap-4">
        <ParticipantsSection id={id} searchParams={search} />
        <ProductsSection />
      </View>
    </View>
  );
}
