"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { View } from "@/components/view";
import { createTestPersonAction } from "@/app/admin/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createTestPersonSchema } from "@/lib/schemas";

export const CreateTestPersonForm = () => {
  const [lastResult, formAction, pending] = useActionState(
    createTestPersonAction,
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: createTestPersonSchema,
      });
    },
    shouldRevalidate: "onBlur",
    shouldValidate: "onInput",
  });

  return (
    <Card>
      <CardHeader>Skapa ny testperson</CardHeader>
      <CardContent>
        <form id={form.id} onSubmit={form.onSubmit} action={formAction}>
          <View className="gap-4">
            <div>
              <Label htmlFor={fields.name.id}>Namn:</Label>
              <Input
                id={fields.name.id}
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
              />
              <p className="mt-2 text-destructive">{fields.name.errors}</p>
            </div>
            <Button disabled={pending}>
              {pending ? "Laddar..." : "Skapa"}
            </Button>
            <p className="text-destructive">{form.errors}</p>
          </View>
        </form>
      </CardContent>
    </Card>
  );
};
