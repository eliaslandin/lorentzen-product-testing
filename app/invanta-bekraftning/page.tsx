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

export default function Page() {
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
            37
          </span>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button variant="outline" size="lg">
            Avbryt
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
