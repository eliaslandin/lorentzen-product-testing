"use client";

import { startTransition, useActionState } from "react";
import { Button } from "./ui/button";
import { toggleTestActiveAction } from "@/app/admin/actions";
import { Spinner } from "./spinner";

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
      variant={testIsActive ? "default" : "outline"}
    >
      {pending ? (
        <Spinner />
      ) : testIsActive ? (
        "Stäng för deltagare"
      ) : (
        "Öppna för deltagare"
      )}
    </Button>
  );
};
