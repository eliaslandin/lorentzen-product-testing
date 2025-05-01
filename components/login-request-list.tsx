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
              const item = payload.new as LoginRequest;
              setRequests((prev) => [{ ...item, name: "Test" }, ...prev]);
            } else if (payload.eventType === "DELETE") {
              const item = payload.old as LoginRequest;
              const newReqs = requests.filter(
                (req) => req.anonymous_user_id !== item.anonymous_user_id,
              );
              setRequests(newReqs);
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
