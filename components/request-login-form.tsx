"use client";

import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { FormContent } from "./form-content";
import { FormField } from "./form-field";
import { FormErrorMessage } from "./form-error-message";
import { FormSubmitButton } from "./form-submit-button";
import { InputOTP, InputOTPGroup, InputOTPSeparator } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { requestLoginSchema } from "@/lib/schemas";
import { requestLoginAction } from "@/app/actions";
import { InputOTPSlotBig } from "./input-otp-slot-big";

export const RequestLoginForm = () => {
  const [lastResult, formAction, pending] = useActionState(
    requestLoginAction,
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: requestLoginSchema,
      });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onSubmit",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={formAction}>
      <FormContent>
        <FormField
          label="Personnummer (YYYY-MM-DD-NNNN)"
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
              <InputOTPSlotBig index={0} />
              <InputOTPSlotBig index={1} />
              <InputOTPSlotBig index={2} />
              <InputOTPSlotBig index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlotBig index={4} />
              <InputOTPSlotBig index={5} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlotBig index={6} />
              <InputOTPSlotBig index={7} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlotBig index={8} />
              <InputOTPSlotBig index={9} />
              <InputOTPSlotBig index={10} />
              <InputOTPSlotBig index={11} />
            </InputOTPGroup>
          </InputOTP>
        </FormField>
        <FormSubmitButton pending={pending}>Bekräfta</FormSubmitButton>
        <FormErrorMessage>{form.errors}</FormErrorMessage>
      </FormContent>
    </form>
  );
};
