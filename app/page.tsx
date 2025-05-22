import { H1 } from "@/components/H1";
import { Logo } from "@/components/logo";
import { P } from "@/components/P";
import { RequestLoginForm } from "@/components/request-login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { View } from "@/components/view";

export default async function Home() {
  return (
    <View className="bg-muted min-h-screen justify-center items-center gap-8">
      <Logo priority={true} className="max-w-40" />
      <Card className="w-auto">
        <CardHeader>
          <H1 className="md:text-2xl">Välkommen!</H1>
          <P>
            Skriv in ditt personnummer i formatet (ÅÅÅÅ-MM-DD-NNNN) för att
            börja.
          </P>
        </CardHeader>
        <CardContent>
          <RequestLoginForm />
        </CardContent>
      </Card>
    </View>
  );
}
