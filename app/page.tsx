import { H1 } from "@/components/H1";
import { RequestLoginForm } from "@/components/request-login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { View } from "@/components/view";

export default async function Home() {
  return (
    <View className="bg-muted min-h-screen justify-center items-center gap-8">
      <img src="lll-icon-red.png" className="max-w-40" />
      <Card className="w-auto">
        <CardHeader>
          <H1>Välkommen</H1>
        </CardHeader>
        <CardContent>
          <RequestLoginForm />
        </CardContent>
      </Card>
    </View>
  );
}
