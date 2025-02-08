"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { createUserAction, ServerSuccessResponse } from "../../actions";
import { User } from "@supabase/supabase-js";

export default function AddUserPage() {
  const initialState: ServerSuccessResponse<{ user: User }> | null = null;

  const [createUser, formAction, pending] = useActionState(
    createUserAction,
    initialState,
  );

  if (createUser?.isSuccess) {
    console.log(createUser.data.user);
  }

  return (
    <div>
      <h1>Skapa användare</h1>
      <form action={formAction}>
        <Label htmlFor="name">Namn:</Label>
        <Input name="name" />
        <Button type="submit" disabled={pending}>
          {pending ? "Laddar..." : "Skapa"}
        </Button>
      </form>

      {createUser?.isSuccess && (
        <p className="text-blue-800">
          User created with id: {createUser.data.user.id}
          Dummy email is: {createUser.data.user.email}
        </p>
      )}

      {createUser?.isError && (
        <p className="text-red-800">
          Failed. Error: {createUser.error.message}
        </p>
      )}
    </div>
  );
}
