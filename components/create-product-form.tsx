"use client";

import { Input } from "@/components/ui/input";
import { useActionState, useState } from "react";
import { createTestPersonAction } from "@/app/admin/actions";
import { useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createTestPersonSchema } from "@/lib/schemas";
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

export const CreateProductForm = ({ testId }: { testId: number }) => {
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
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
  });

  const [cityName, setCityName] = useState<string | null>(
    fields.city.initialValue || null,
  );

  const cityField = useInputControl(fields.city);

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
          label="Personnummer (ÅÅÅÅ-MM-DD-NNNN)"
          inputId={fields.personal_number.id}
          errorMessage={fields.personal_number.errors}
        >
          <InputOTP
            id={fields.personal_number.id}
            key={fields.personal_number.key}
            name={fields.personal_number.name}
            defaultValue={fields.personal_number.initialValue}
            maxLength={12}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={6} />
              <InputOTPSlot index={7} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={8} />
              <InputOTPSlot index={9} />
              <InputOTPSlot index={10} />
              <InputOTPSlot index={11} />
            </InputOTPGroup>
          </InputOTP>
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
        <FormSubmitButton pending={pending}>Skapa</FormSubmitButton>
        <FormErrorMessage>{form.errors}</FormErrorMessage>
      </FormContent>
    </form>
  );
};
