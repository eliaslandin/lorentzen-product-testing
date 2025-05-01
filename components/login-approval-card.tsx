import { H1 } from "@/components/H1";
import { P } from "@/components/P";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { ApproveLoginReqForm } from "./approve-login-req-form";
import { RemoveLoginReqButton } from "./remove-login-req-button";
import { CheckCircleIcon } from "lucide-react";

export const LoginApprovalCard = async ({
  anon_uid,
  personal_number,
  date,
  approved,
}: {
  anon_uid: string;
  personal_number: number;
  date: string;
  approved: boolean;
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
        <RemoveLoginReqButton anon_uid={anon_uid} />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-center py-4 pb-0">
        {approved ? (
          <div className="bg-green-500 text-white h-12 w-12 rounded-full flex items-center justify-center mb-4">
            <CheckCircleIcon />
          </div>
        ) : (
          <>
            <P>Bekräftelsekod</P>
            <ApproveLoginReqForm anon_uid={anon_uid} />
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <P className="text-sm md:text-sm">{new Date(date).toLocaleString()}</P>
      </CardFooter>
    </Card>
  );
};
