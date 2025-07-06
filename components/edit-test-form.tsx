"use client";

import { Input } from "@/components/ui/input";
import { useActionState, useState } from "react";
import { updateTestAction } from "@/app/admin/actions";
import { useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { updateTestSchema } from "@/lib/schemas";
import { FormContent } from "./form-content";
import { FormField } from "./form-field";
import { FormErrorMessage } from "./form-error-message";
import { FormSubmitButton } from "./form-submit-button";
import { InputWithLookup } from "./input-with-lookup";
import { DateInput } from "./date-input";
import { Database } from "@/lib/database.types";

export const EditTestForm = ({
  test,
}: {
  test: Database["api"]["Tables"]["tests"]["Row"];
}) => {
  const [lastResult, formAction, pending] = useActionState(
    updateTestAction,
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: updateTestSchema,
      });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
    defaultValue: {
      id: test.id,
      name: test.name,
      description: test.description,
      date: test.date ? new Date(test.date) : undefined,
      city: test.city,
      company: test.company,
    },
  });

  const [cityName, setCityName] = useState<string | null>(
    fields.city.initialValue || null,
  );
  const [companyName, setCompanyName] = useState<string | null>(
    fields.company.initialValue || null,
  );

  const cityField = useInputControl(fields.city);
  const companyField = useInputControl(fields.company);
  const dateField = useInputControl(fields.date);

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
            id={fields.city.id}
            defaultValue={Number(fields.city.initialValue)}
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
          inputId={fields.company.id}
          errorMessage={fields.company.errors}
        >
          <InputWithLookup
            id={fields.company.id}
            defaultValue={Number(fields.company.initialValue)}
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
          <DateInput
            id={fields.date.id}
            field={dateField}
            defaultValue={
              fields.date.initialValue
                ? new Date(fields.date.initialValue)
                : undefined
            }
          />
        </FormField>
        <input type="hidden" name="id" value={test.id} />
        <FormSubmitButton pending={pending}>Skapa</FormSubmitButton>
        <FormErrorMessage>{form.errors}</FormErrorMessage>
      </FormContent>
    </form>
  );
};
