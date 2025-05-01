"use client";

import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { FormContent } from "./form-content";
import { FormField } from "./form-field";
import { FormErrorMessage } from "./form-error-message";
import { InputOTP, InputOTPGroup } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { passcodeSchema } from "@/lib/schemas";
import { requestLoginAction } from "@/app/actions";
import { InputOTPSlotBig } from "./input-otp-slot-big";

export const LoginApprovalPasscodeForm = ({
  anon_uid,
}: {
  anon_uid: string;
}) => {
  const [lastResult, formAction, pending] = useActionState(
    requestLoginAction,
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: passcodeSchema,
      });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onSubmit",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={formAction}>
      <FormContent>
        <FormField
          inputId={fields.passcode.id}
          errorMessage={fields.passcode.errors}
        >
          <InputOTP
            id={fields.passcode.id}
            key={fields.passcode.key}
            name={fields.passcode.name}
            defaultValue={fields.passcode.initialValue}
            maxLength={2}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              <InputOTPSlotBig index={0} />
              <InputOTPSlotBig index={1} />
            </InputOTPGroup>
          </InputOTP>
        </FormField>
        <FormErrorMessage>{form.errors}</FormErrorMessage>
      </FormContent>
    </form>
  );
};
