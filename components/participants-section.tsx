import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { H2 } from "./H2";
import { LoadingCard } from "./loading-card";
import { Suspense } from "react";
import { View } from "./view";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs";
import { TestAddedParticipants } from "./test-added-participants";
import { TestAddNewParticipant } from "./test-add-new-participant";

export const ParticipantsSection = ({ id }: { id: number }) => {
  return (
    <View>
      <H2>Testpersoner</H2>
      <Suspense fallback={<LoadingCard />}>
        <Card>
          <Tabs defaultValue="added">
            <CardHeader className="items-center">
              <TabsList>
                <TabsTrigger value="added">Tillagda</TabsTrigger>
                <TabsTrigger value="add-new">Lägg till</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="added">
                <TestAddedParticipants id={id} />
              </TabsContent>
              <TabsContent value="add-new">
                <TestAddNewParticipant id={id} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </Suspense>
    </View>
  );
};
