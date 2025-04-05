import { H1 } from "@/components/H1";
import { P } from "@/components/P";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { View } from "@/components/view";
import { signOutAction } from "../actions";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: getUserData, error: getUserError } =
    await supabase.auth.getUser();

  if (getUserError) {
    throw new Error("Servererror");
  }

  const { data, error } = await supabase
    .schema("api")
    .from("login_requests")
    .select()
    .eq("anonymous_user_id", getUserData.user.id)
    .single();

  if (error) {
    throw new Error("Servererror");
  }

  return (
    <View className="bg-muted min-h-screen justify-center items-center">
      <Card className="max-w-3xl">
        <CardHeader className="items-center text-center">
          <Spinner className="w-10 h-10 text-primary my-6" />
          <CardTitle>
            <H1>Inväntar bekräftning från testhandledare...</H1>
          </CardTitle>
          <CardDescription>
            <P>
              Berätta din bekräftelsekod för din handledare för att bli
              inloggad.
            </P>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-6 md:py-8">
          <P>Din bekräftelsekod:</P>
          <span className="text-[200px] font-bold text-primary leading-none">
            {data.pair_code}
          </span>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button variant="outline" size="lg" onClick={signOutAction}>
            Avbryt
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
