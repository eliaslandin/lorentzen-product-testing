"use client";

import { Database } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/client";
import { Dispatch, SetStateAction, useEffect } from "react";

type LoginRequest = Database["api"]["Tables"]["login_requests"]["Row"];

export const RealtimeListener = ({
  setRequests,
}: {
  setRequests: Dispatch<SetStateAction<(LoginRequest & { name: string })[]>>;
}) => {
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("login-requests-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "api",
          table: "login_requests",
        },
        (payload) => {
          if (payload) {
            if (payload.eventType === "INSERT") {
              const item = payload.new as LoginRequest;
              setRequests((prev) => ({
                ...prev,
                item,
              }));
            }
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return <></>;
};
