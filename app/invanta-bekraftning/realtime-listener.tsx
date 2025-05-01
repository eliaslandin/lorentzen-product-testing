"use client";

import { Spinner } from "@/components/spinner";
import { Database } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type LoginRequest = Database["api"]["Tables"]["login_requests"]["Row"];

export const RealtimeListener = () => {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("login-requests-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "api",
          table: "login_requests",
        },
        (payload) => {
          if (payload) {
            const updatedItem = payload.new as LoginRequest;
            if (updatedItem.approved) {
              router.replace(
                `/auth/log-in-test-person?anon_uid=${updatedItem.anonymous_user_id}`,
              );
            }
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return <Spinner className="w-10 h-10 text-primary my-6" />;
};
