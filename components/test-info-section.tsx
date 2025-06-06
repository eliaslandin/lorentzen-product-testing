import { H1 } from "@/components/H1";
import { H2 } from "@/components/H2";
import { P } from "@/components/P";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { View } from "@/components/view";
import { Building2Icon, CalendarIcon, MapPinIcon } from "lucide-react";
import { getTest } from "@/lib/fetchers";
import { UnlockTestButton } from "./unlock-test-button";

export const TestInfoSection = async ({ id }: { id: number }) => {
  const { data: test, error } = await getTest(id);

  if (error) {
    console.error(`Couldn't get test. Error: ${JSON.stringify(error)}`);
    throw new Error("Servererror");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <H1>{test.name}</H1>
        </CardTitle>
        <CardDescription>{test.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <View className="md:flex-row md:justify-between gap-4">
          <View>
            <H2>Stad</H2>
            <View className="flex-row gap-2 items-center">
              <MapPinIcon className="w-4 h-4" />
              <P>{test.city_name}</P>
            </View>
          </View>
          <View>
            <H2>Företag</H2>
            <View className="flex-row gap-2 items-center">
              <Building2Icon className="w-4 h-4" />
              <P>{test.company_name}</P>
            </View>
          </View>
          <View>
            <H2>Datum</H2>
            <View className="flex-row gap-2 items-center">
              <CalendarIcon className="w-4 h-4" />
              <P>
                {test.date
                  ? new Date(test.date).toLocaleDateString()
                  : "Inget datum valt"}
              </P>
            </View>
          </View>
        </View>
        <View className="items-center mt-8">
          <UnlockTestButton testId={id} testIsActive={test.active} />
        </View>
      </CardContent>
    </Card>
  );
};
