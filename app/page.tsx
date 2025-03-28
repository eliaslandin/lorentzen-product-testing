import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { View } from "@/components/view";

export default async function Home() {
  return (
    <View className="bg-muted min-h-screen justify-center items-center">
      <Card className="max-w-3xl">
        <CardHeader>Välkommen</CardHeader>
        <CardContent>Personnummer</CardContent>
      </Card>
    </View>
  );
}
