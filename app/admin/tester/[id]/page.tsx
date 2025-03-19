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
import { getTest } from "@/lib/fetchers";
import { Building2Icon, CalendarIcon, MapPinIcon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const { data, error } = await getTest(id);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        {error.message}
      </div>
    );
  }

  return (
    <View>
      <Card>
        <CardHeader>
          <CardTitle>
            <H1>{data.name}</H1>
          </CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <View className="md:flex-row md:justify-between gap-4">
            <View>
              <H2>Stad</H2>
              <View className="flex-row gap-2 items-center">
                <MapPinIcon className="w-4 h-4" />
                <P>{data.city_name}</P>
              </View>
            </View>
            <View>
              <H2>Företag</H2>
              <View className="flex-row gap-2 items-center">
                <Building2Icon className="w-4 h-4" />
                <P>{data.company_name}</P>
              </View>
            </View>
            <View>
              <H2>Datum</H2>
              <View className="flex-row gap-2 items-center">
                <CalendarIcon className="w-4 h-4" />
                <P>
                  {data.date
                    ? new Date(data.date).toLocaleDateString()
                    : "Inget datum valt"}
                </P>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
