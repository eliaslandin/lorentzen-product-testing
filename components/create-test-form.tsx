"use client";

import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { createTestAction, createTestPersonAction } from "@/app/admin/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createTestPersonSchema, createTestSchema } from "@/lib/schemas";
import { FormContent } from "./form-content";
import { FormField } from "./form-field";
import { FormErrorMessage } from "./form-error-message";
import { FormSubmitButton } from "./form-submit-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputWithLookup } from "./input-with-lookup";

export const CreateTestForm = () => {
  const [lastResult, formAction, pending] = useActionState(
    createTestAction,
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: createTestSchema,
      });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
  });

  return (
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
        <FormField
          label="Beskrivning"
          inputId={fields.description.id}
          errorMessage={fields.description.errors}
        >
          <Input
            id={fields.description.id}
            key={fields.description.key}
            name={fields.description.name}
            defaultValue={fields.description.initialValue}
          />
        </FormField>
        <FormField
          label="Stad"
          inputId={fields.city.id}
          errorMessage={fields.city.errors}
        >
          <InputWithLookup
            id={fields.description.id}
            key={fields.description.key}
            name={fields.description.name}
            defaultValue={fields.description.initialValue}
            table="tests"
          />
        </FormField>
        <FormSubmitButton pending={pending}>Skapa</FormSubmitButton>
        <FormErrorMessage>{form.errors}</FormErrorMessage>
      </FormContent>
    </form>
  );
};
