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
import { LoginApprovalPasscodeForm } from "./login-approval-passcode-form";
import { H2 } from "./H2";
import { CrossIcon, XIcon } from "lucide-react";

export const LoginApprovalCard = async ({
  anon_uid,
  personal_number,
}: {
  anon_uid: string;
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
      <CardHeader className="items-center text-center relative">
        <CardTitle>
          <H1>{profile.data?.name || personal_number}</H1>
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-1.5 text-muted-foreground hover:text-primary"
          title="Ta bort"
        >
          <XIcon className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-center py-4 pb-0">
        <P>Bekräftelsekod</P>
        <LoginApprovalPasscodeForm anon_uid={anon_uid} />
      </CardContent>
      <CardFooter className="flex flex-col items-center"></CardFooter>
    </Card>
  );
};
