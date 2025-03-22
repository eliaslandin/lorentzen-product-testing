import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H2 } from "./H2";
import { LoadingCard } from "./loading-card";
import { Suspense } from "react";
import { View } from "./view";

export const ParticipantsSection = () => {
  return (
    <View>
      <H2>Testpersoner</H2>
      <Suspense fallback={<LoadingCard />}>
        <Card>
          <CardHeader></CardHeader>
          <CardContent></CardContent>
        </Card>
      </Suspense>
    </View>
  );
};
