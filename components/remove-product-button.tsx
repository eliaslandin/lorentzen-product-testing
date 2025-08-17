"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { startTransition, useActionState } from "react";
import { removeProductAction } from "@/app/admin/actions";
import { Spinner } from "./spinner";

export const RemoveProductButton = ({ id }: { id: number }) => {
  const [state, formAction, isPending] = useActionState(
    removeProductAction,
    null,
  );

  if (state?.error) {
    throw new Error(state.error);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground hover:text-primary"
      title="Ta bort"
      onClick={() => startTransition(() => formAction({ id }))}
      disabled={isPending}
    >
      {isPending ? (
        <Spinner className="w-5 h-5 text-foreground" />
      ) : (
        <TrashIcon className="w-5 h-5 transition-colors" />
      )}
    </Button>
  );
};
