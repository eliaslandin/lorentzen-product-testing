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
import { FormContent } from "./form-content";
import { FormField } from "./form-field";
import { FormErrorMessage } from "./form-error-message";
import { FormSubmitButton } from "./form-submit-button";
import { Spinner } from "./spinner";

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
          <FormContent>
            <FormField
              label="Namn"
              inputId={fields.name.id}
              errorMessage={fields.name.errors}
            >
              <Input
                id={fields.name.id}
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
              />
            </FormField>
            <FormSubmitButton pending={pending}>Skapa</FormSubmitButton>
            <FormErrorMessage>{form.errors}</FormErrorMessage>
          </FormContent>
        </form>
      </CardContent>
    </Card>
  );
};
