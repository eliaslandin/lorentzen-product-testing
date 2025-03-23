"use client";

import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { startTransition, useActionState } from "react";
import { removePersonFromTestAction } from "@/app/admin/actions";
import { Spinner } from "./spinner";

export const RemovePersonFromTestButton = ({
  relationId,
  testId,
}: {
  relationId: number;
  testId: number;
}) => {
  const [state, formAction, isPending] = useActionState(
    removePersonFromTestAction,
    null,
  );

  if (state?.error) {
    throw new Error(state.error);
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() =>
        startTransition(() => formAction({ id: relationId, testId }))
      }
      title="Ta bort"
      disabled={isPending}
    >
      {isPending ? (
        <Spinner className="w-5 h-5 text-foreground" />
      ) : (
        <XIcon className="w-5 h-5" />
      )}
    </Button>
  );
};
