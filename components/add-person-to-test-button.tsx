"use client";

import { Database } from "@/lib/database.types";
import { Button } from "./ui/button";
import { useActionState, startTransition } from "react";
import { addPersonToTestAction } from "@/app/admin/actions";
import { UserRoundIcon } from "lucide-react";

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
      className="w-full justify-start gap-3 px-2 py-2 h-auto rounded-xl"
      variant="ghost"
      onClick={() =>
        startTransition(() => formAction({ testId, userId: user.id }))
      }
    >
      {
        <UserRoundIcon className="bg-secondary rounded-full text-white p-1 h-8 w-8 transition-colors group-hover:bg-primary" />
      }
      {isPending ? "Laddar..." : state?.error ? state.error : user.name}
    </Button>
  );
};
