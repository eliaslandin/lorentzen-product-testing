import { RequestLoginForm } from "@/components/request-login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { View } from "@/components/view";

export default async function Home() {
  return (
    <View className="bg-muted min-h-screen justify-center items-center">
      <Card className="w-auto">
        <CardHeader>Välkommen</CardHeader>
        <CardContent>
          <RequestLoginForm />
        </CardContent>
      </Card>
    </View>
  );
}
