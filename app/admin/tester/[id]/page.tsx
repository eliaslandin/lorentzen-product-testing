import { LoadingCard } from "@/components/loading-card";
import { ParticipantsSection } from "@/components/participants-section";
import { ProductsSection } from "@/components/products-section";
import { TestAddNewParticipant } from "@/components/test-add-new-participant";
import { TestAddedParticipants } from "@/components/test-added-participants";
import { TestInfoSection } from "@/components/test-info-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    addProduct?: string;
  }>;
}) {
  const { id } = await params;
  const search = await searchParams;

  return (
    <View className="gap-4 items-center">
      <Suspense fallback={<LoadingCard />}>
        <TestInfoSection id={id} />
      </Suspense>
      <Tabs className="w-full" defaultValue="participants">
        <TabsList>
          <TabsTrigger value="participants">Testpersoner</TabsTrigger>
          <TabsTrigger value="products">Produkter</TabsTrigger>
        </TabsList>
        <TabsContent value="participants">
          <View className="lg:flex-row gap-4">
            <Suspense fallback={<LoadingCard />}>
              <TestAddedParticipants
                id={id}
                query={search?.q1}
                page={search?.p1}
              />
            </Suspense>
            <Suspense fallback={<LoadingCard />}>
              <TestAddNewParticipant
                id={id}
                query={search?.q2}
                page={search?.p2}
              />
            </Suspense>
          </View>
        </TabsContent>
        <TabsContent value="products">
          <Suspense fallback={<LoadingCard />}>
            <ProductsSection testId={id} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </View>
  );
}
