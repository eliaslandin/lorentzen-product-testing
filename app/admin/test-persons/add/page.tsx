"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { createTestPersonAction } from "../../actions";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { View } from "@/components/view";
import { ServerSuccessResponse } from "@/lib/types";

export default function AddUserPage() {
  const initialState: ServerSuccessResponse<{ user: User }> | null = null;

  const [createUser, formAction, pending] = useActionState(
    createTestPersonAction,
    initialState,
  );

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

        {createUser?.error && (
          <p className="text-red-800">{createUser.error}</p>
        )}

        {createUser?.data && (
          <>
            <p className="text-blue-800">
              Ny testperson skapad med ID: {createUser.data.user.id}
            </p>
            <p className="text-blue-800">
              Dummy email är: {createUser.data.user.email}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
