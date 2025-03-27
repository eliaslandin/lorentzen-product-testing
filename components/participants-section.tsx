import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { H2 } from "./H2";
import { LoadingCard } from "./loading-card";
import { Suspense } from "react";
import { View } from "./view";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs";
import { TestAddedParticipants } from "./test-added-participants";
import { TestAddNewParticipant } from "./test-add-new-participant";

export const ParticipantsSection = ({
  id,
  searchParams,
}: {
  id: number;
  searchParams?: { q1?: string; q2?: string; p1?: string; p2?: string };
}) => {
  return (
    <View>
      <H2 className="px-4">Testpersoner</H2>
      <Suspense fallback={<LoadingCard />}>
        <Card>
          <Tabs defaultValue="added">
            <CardHeader className="items-center">
              <TabsList>
                <TabsTrigger value="added">Tillagda</TabsTrigger>
                <TabsTrigger value="add-new">Lägg till</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="px-2 pt-1">
              <TabsContent value="added">
                <TestAddedParticipants id={id} query={searchParams?.q1} />
              </TabsContent>
              <TabsContent value="add-new">
                <TestAddNewParticipant
                  id={id}
                  query={searchParams?.q2}
                  page={searchParams?.p2}
                />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </Suspense>
    </View>
  );
};
