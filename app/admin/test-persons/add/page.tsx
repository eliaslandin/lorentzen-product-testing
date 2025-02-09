"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { createTestPersonAction, ServerSuccessResponse } from "../../actions";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { View } from "@/components/view";

export default function AddUserPage() {
  const initialState: ServerSuccessResponse<{ user: User }> | null = null;

  const [createUser, formAction, pending] = useActionState(
    createTestPersonAction,
    initialState,
  );

  if (createUser?.isSuccess) {
    console.log(createUser.data.user);
  }

  return (
    <Card>
      <CardHeader>Skapa ny testperson</CardHeader>
      <CardContent>
        <form action={formAction}>
          <View className="gap-4">
            <div>
              <Label htmlFor="name">Namn:</Label>
              <Input name="name" required />
            </div>
            <Button type="submit" disabled={pending}>
              {pending ? "Laddar..." : "Skapa"}
            </Button>
          </View>
        </form>

        {createUser?.isSuccess && (
          <>
            <p className="text-blue-800">
              User created with id: {createUser.data.user.id}
            </p>
            <p className="text-blue-800">
              Dummy email is: {createUser.data.user.email}
            </p>
          </>
        )}

        {createUser?.isError && (
          <p className="text-red-800">
            Failed. Error: {createUser.error.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
