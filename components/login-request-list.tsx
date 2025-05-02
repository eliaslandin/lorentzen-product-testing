"use client";

import { useEffect, useState } from "react";
import { Database } from "@/lib/database.types";
import { LoginApprovalCard } from "./login-approval-card";
import { createClient } from "@/utils/supabase/client";

type LoginRequest = Database["api"]["Tables"]["login_requests"]["Row"];

export const LoginRequestList = ({
  initialData,
}: {
  initialData: LoginRequest[];
}) => {
  const [requests, setRequests] = useState<LoginRequest[]>(initialData);
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
              setRequests((prev) => [item, ...prev]);
            } else if (payload.eventType === "DELETE") {
              const item = payload.old as LoginRequest;
              setRequests((prev) =>
                prev.filter(
                  (req) => req.anonymous_user_id !== item.anonymous_user_id,
                ),
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

  return (
    <>
      {requests.map((loginReq) => (
        <LoginApprovalCard
          key={loginReq.anonymous_user_id}
          anon_uid={loginReq.anonymous_user_id}
          date={loginReq.created_at}
          approved={loginReq.approved}
          personal_number={loginReq.personal_number}
        />
      ))}
    </>
  );
};
