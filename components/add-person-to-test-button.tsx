"use client";

import { Database } from "@/lib/database.types";
import { Button } from "./ui/button";
import { useActionState, startTransition } from "react";
import { addPersonToTestAction } from "@/app/admin/actions";

export const AddPersonToTestButton = ({
  testId,
  user,
}: {
  testId: number;
  user: Database["api"]["Tables"]["profiles"]["Row"];
}) => {
  const [state, formAction, isPending] = useActionState(
    addPersonToTestAction,
    null,
  );

  return (
    <Button
      variant="outline"
      onClick={() =>
        startTransition(() => formAction({ testId, userId: user.id }))
      }
    >
      {isPending ? "Laddar..." : state?.error ? state.error : user.name}
    </Button>
  );
};
