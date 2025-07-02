"use client";

import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { createProductAction } from "@/app/admin/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { createProductSchema } from "@/lib/schemas";
import { FormContent } from "./form-content";
import { FormField } from "./form-field";
import { FormErrorMessage } from "./form-error-message";
import { FormSubmitButton } from "./form-submit-button";
import { Textarea } from "./ui/textarea";

export const CreateProductForm = ({ testId }: { testId: number }) => {
  const [lastResult, formAction, pending] = useActionState(
    createProductAction,
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: createProductSchema,
      });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={formAction}>
      <FormContent>
        <FormField
          label="Bild"
          inputId={fields.image.id}
          errorMessage={fields.image.errors}
        >
          <Input
            id={fields.image.id}
            key={fields.image.key}
            name={fields.image.name}
            type="file"
          />
        </FormField>
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
        <FormField
          label="Beskrivning"
          inputId={fields.description.id}
          errorMessage={fields.description.errors}
        >
          <Textarea
            id={fields.description.id}
            key={fields.description.key}
            name={fields.description.name}
            defaultValue={fields.description.initialValue}
          />
        </FormField>
        <input type="hidden" name="testId" value={testId} />
        <FormSubmitButton pending={pending}>Skapa</FormSubmitButton>
        <FormErrorMessage>{form.errors}</FormErrorMessage>
      </FormContent>
    </form>
  );
};
