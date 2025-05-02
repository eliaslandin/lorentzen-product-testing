"use client";

import { H1 } from "@/components/H1";
import { P } from "@/components/P";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApproveLoginReqForm } from "./approve-login-req-form";
import { RemoveLoginReqButton } from "./remove-login-req-button";
import { CheckCircleIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export const LoginApprovalCard = ({
  anon_uid,
  date,
  approved,
  personal_number,
}: {
  anon_uid: string;
  date: string;
  approved: boolean;
  personal_number: number;
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .schema("api")
      .from("profiles")
      .select()
      .eq("personal_number", personal_number)
      .single()
      .then((res) => {
        if (!res.error) {
          setName(res.data.name);
        } else {
          setName("Testperson hittades inte");
        }
      });
  }, [personal_number]);

  return (
    <Card className="max-w-3xl">
      <CardHeader className="items-center text-center relative">
        <CardTitle>
          <H1>{name}</H1>
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
        <P className="text-sm md:text-sm" suppressHydrationWarning>
          {new Date(date).toLocaleString()}
        </P>
      </CardFooter>
    </Card>
  );
};
