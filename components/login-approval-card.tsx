import { H1 } from "@/components/H1";
import { P } from "@/components/P";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export const LoginApprovalCard = async ({
  personal_number,
}: {
  personal_number: number;
}) => {
  const supabase = await createClient();
  const profile = await supabase
    .schema("api")
    .from("profiles")
    .select()
    .eq("personal_number", personal_number)
    .single();

  return (
    <Card className="max-w-3xl">
      <CardHeader className="items-center text-center">
        <CardTitle>
          <H1>{profile.data?.name || "Testperson hittades inte"}</H1>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-6 md:py-8">
        <P>Personnummer</P>
        <span className="font-bold text-primary leading-none">
          {personal_number}
        </span>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button variant="outline" size="lg">
          Neka
        </Button>
      </CardFooter>
    </Card>
  );
};
