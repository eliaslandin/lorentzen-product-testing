"use client";

import { Database } from "@/lib/database.types";
import { Button } from "./ui/button";
import { useActionState, startTransition } from "react";
import { addPersonToTestAction } from "@/app/admin/actions";
import { CheckCircleIcon, MapPinIcon, UserRoundIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { View } from "./view";

export const AddPersonToTestButton = ({
  testId,
  user,
  alreadyAdded,
}: {
  testId: number;
  user: Database["api"]["Tables"]["profiles"]["Row"] & {
    cities: { name: string }[];
  };
  alreadyAdded: boolean;
}) => {
  const [state, formAction, isPending] = useActionState(
    addPersonToTestAction,
    null,
  );

  return (
    <Button
      className="w-full justify-start gap-3 px-2 py-2 h-auto rounded-xl disabled:opacity-100 disabled:text-foreground/50"
      variant="ghost"
      onClick={() =>
        startTransition(() => formAction({ testId, userId: user.id }))
      }
      disabled={alreadyAdded || isPending}
    >
      {
        <UserRoundIcon
          className={cn(
            "bg-secondary rounded-full text-white p-1 h-8 w-8 transition-colors group-hover:bg-primary",
            alreadyAdded && "opacity-50",
          )}
        />
      }

      {
        <div className="w-auto leading-tight text-left">
          {isPending ? "Laddar..." : state?.error ? state.error : user.name}
          <View className="flex-row gap-1 items-center">
            {user.cities.length > 0 && (
              <MapPinIcon className="w-3 h-3 text-foreground/45" />
            )}
            <p className="text-sm text-foreground/45">
              {user.cities.map((city, idx) =>
                idx === 0 ? city.name : ` • ${city.name}`,
              )}
            </p>
          </View>
        </div>
      }

      {alreadyAdded && <CheckCircleIcon className="w-4 h-4 text-green-500" />}
    </Button>
  );
};
