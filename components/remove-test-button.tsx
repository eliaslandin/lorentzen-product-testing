"use client";

import { removeTestAction } from "@/app/admin/actions";
import { TrashIcon } from "lucide-react";

export const RemoveTestButton = ({ testId }: { testId: number }) => {
  return (
    <button
      className="flex items-center gap-3 p-2"
      onClick={() => removeTestAction({ id: testId })}
    >
      <TrashIcon className="w-5 h-5" />
      Radera
    </button>
  );
};
