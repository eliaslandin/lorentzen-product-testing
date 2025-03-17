"use client";

import { Input } from "@/components/ui/input";
import { useActionState, useState } from "react";
import { createTestAction } from "@/app/admin/actions";
import { useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createTestSchema } from "@/lib/schemas";
import { FormContent } from "./form-content";
import { FormField } from "./form-field";
import { FormErrorMessage } from "./form-error-message";
import { FormSubmitButton } from "./form-submit-button";
import { InputWithLookup } from "./input-with-lookup";
import { DatePicker } from "./date-picker";

export const CreateTestForm = () => {
  const [cityName, setCityName] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
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

  const cityField = useInputControl(fields.city);
  const companyField = useInputControl(fields.company);

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
            table="cities"
            column="name"
            field={cityField}
            setFieldNameAction={setCityName}
          />
          {cityName && (
            <p className="text-accent-foreground bg-accent rounded-full px-4 py-2">
              Vald stad: {cityName}
            </p>
          )}
        </FormField>
        <FormField
          label="Företag"
          inputId="companyInput"
          errorMessage={fields.company.errors}
        >
          <InputWithLookup
            id="companyInput"
            table="companies"
            column="name"
            field={companyField}
            setFieldNameAction={setCompanyName}
          />
          {companyName && (
            <p className="text-accent-foreground bg-accent rounded-full px-4 py-2">
              Valt företag: {companyName}
            </p>
          )}
        </FormField>
        <FormField
          label="Datum för test"
          inputId={fields.date.id}
          errorMessage={fields.date.errors}
        >
          <DatePicker />
        </FormField>
        <FormSubmitButton pending={pending}>Skapa</FormSubmitButton>
        <FormErrorMessage>{form.errors}</FormErrorMessage>
      </FormContent>
    </form>
  );
};
