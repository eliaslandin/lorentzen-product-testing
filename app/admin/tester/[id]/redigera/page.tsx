import { View } from "@/components/view";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreateTestForm } from "@/components/create-test-form";
import { H1 } from "@/components/H1";
import { getTest } from "@/lib/fetchers";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const { data, error } = await getTest(id);

  if (error) {
    throw new Error("Servererror");
  }

  return (
    <View className="items-center">
      <Card className="max-w-2xl">
        <CardHeader>
          <H1>Redigera test {data.name}</H1>
        </CardHeader>
        <CardContent>
          <CreateTestForm />
        </CardContent>
      </Card>
    </View>
  );
}
