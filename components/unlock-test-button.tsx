"use client";

import { startTransition, useActionState } from "react";
import { Button } from "./ui/button";
import { toggleTestActiveAction } from "@/app/admin/actions";
import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";
import { DoorClosedIcon, DoorOpenIcon } from "lucide-react";

export const UnlockTestButton = ({
  testId,
  testIsActive,
}: {
  testId: number;
  testIsActive: boolean;
}) => {
  const [_, formAction, pending] = useActionState(toggleTestActiveAction, null);

  return (
    <Button
      onClick={() => startTransition(() => formAction(testId))}
      disabled={pending}
      variant={"default"}
      size="lg"
      className={cn(
        "w-full max-w-md gap-2 md:text-lg",
        testIsActive ? "" : "text-white bg-green-600 hover:bg-green-600/90",
      )}
    >
      {pending ? (
        <Spinner />
      ) : testIsActive ? (
        <>
          <DoorClosedIcon />
          Stäng för deltagare
        </>
      ) : (
        <>
          <DoorOpenIcon />
          Öppna för deltagare
        </>
      )}
    </Button>
  );
};
