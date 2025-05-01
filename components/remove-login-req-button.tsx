"use client";

import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { startTransition, useActionState } from "react";
import { removeLoginReqAction } from "@/app/admin/actions";
import { Spinner } from "./spinner";

export const RemoveLoginReqButton = ({ anon_uid }: { anon_uid: string }) => {
  const [state, formAction, isPending] = useActionState(
    removeLoginReqAction,
    null,
  );

  if (state?.error) {
    throw new Error(state.error);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-0 right-1.5 text-muted-foreground hover:text-primary"
      title="Ta bort"
      onClick={() => startTransition(() => formAction({ anon_uid }))}
      disabled={isPending}
    >
      {isPending ? (
        <Spinner className="w-5 h-5 text-foreground" />
      ) : (
        <XIcon className="w-5 h-5 transition-colors" />
      )}
    </Button>
  );
};
