import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H2 } from "./H2";
import { LoadingCard } from "./loading-card";
import { Suspense } from "react";
import { View } from "./view";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs";

export const ParticipantsSection = () => {
  return (
    <View>
      <H2>Testpersoner</H2>
      <Suspense fallback={<LoadingCard />}>
        <Card>
          <Tabs defaultValue="added">
            <CardHeader className="items-center">
              <TabsList>
                <TabsTrigger value="added">Tillagda</TabsTrigger>
                <TabsTrigger value="add">Lägg till</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="added">Tillagda</TabsContent>
              <TabsContent value="add">Nya</TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </Suspense>
    </View>
  );
};
