"use client";

import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { createTestAction } from "@/app/admin/actions";
import { useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createTestSchema } from "@/lib/schemas";
import { FormContent } from "./form-content";
import { FormField } from "./form-field";
import { FormErrorMessage } from "./form-error-message";
import { FormSubmitButton } from "./form-submit-button";
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

  const city = useInputControl(fields.city);

  const handleSelectCity = (cityId: number) => {
    city.change(String(cityId));
  };
  console.log(form.value);

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
          inputId="cityInput"
          errorMessage={fields.city.errors}
        >
          <InputWithLookup
            id="cityInput"
            handleSelectValue={handleSelectCity}
            table="cities"
            column="name"
          />
        </FormField>
        <FormSubmitButton pending={pending}>Skapa</FormSubmitButton>
        <FormErrorMessage>{form.errors}</FormErrorMessage>
      </FormContent>
    </form>
  );
};
