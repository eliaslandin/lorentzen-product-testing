"use client";

import { useEffect, useState } from "react";
import { Database } from "@/lib/database.types";
import { LoginApprovalCard } from "./login-approval-card";
import { createClient } from "@/utils/supabase/client";

type LoginRequest = Database["api"]["Tables"]["login_requests"]["Row"];

export const LoginRequestList = ({
  initialData,
}: {
  initialData: (LoginRequest & { name: string })[];
}) => {
  const [requests, setRequests] =
    useState<(LoginRequest & { name: string })[]>(initialData);
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
              console.log(payload);
              const item = payload.new as LoginRequest;
              setRequests((prev) => [...prev, { ...item, name: "Test" }]);
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
      {requests.map((logInReq) => (
        <LoginApprovalCard
          key={logInReq.anonymous_user_id}
          anon_uid={logInReq.anonymous_user_id}
          date={logInReq.created_at}
          approved={logInReq.approved}
          name={logInReq.name}
        />
      ))}
    </>
  );
};
