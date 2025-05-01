"use client";

import { useActionState, useRef } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { FormContent } from "./form-content";
import { FormField } from "./form-field";
import { FormErrorMessage } from "./form-error-message";
import { InputOTP, InputOTPGroup } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { approveLoginSchema } from "@/lib/schemas";
import { InputOTPSlotBig } from "./input-otp-slot-big";
import { approveLoginRequestAction } from "@/app/admin/actions";

export const ApproveLoginReqForm = ({ anon_uid }: { anon_uid: string }) => {
  const ref = useRef<HTMLFormElement | null>(null);
  const [lastResult, formAction, pending] = useActionState(
    approveLoginRequestAction,
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: approveLoginSchema,
      });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onSubmit",
  });

  const submitForm = () => {
    if (!ref.current) {
      return;
    }

    ref.current.requestSubmit();
  };

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={formAction} ref={ref}>
      <FormContent className="items-center">
        <FormField
          inputId={fields.pair_code.id}
          errorMessage={fields.pair_code.errors}
        >
          <InputOTP
            id={fields.pair_code.id}
            key={fields.pair_code.key}
            name={fields.pair_code.name}
            defaultValue={fields.pair_code.initialValue}
            maxLength={2}
            pattern={REGEXP_ONLY_DIGITS}
            onComplete={submitForm}
            disabled={pending}
          >
            <InputOTPGroup>
              <InputOTPSlotBig index={0} />
              <InputOTPSlotBig index={1} />
            </InputOTPGroup>
          </InputOTP>
        </FormField>
        <input
          type="hidden"
          id={fields.anon_uid.id}
          key={fields.anon_uid.key}
          name={fields.anon_uid.name}
          defaultValue={anon_uid}
        />
        <FormErrorMessage>{form.errors}</FormErrorMessage>
      </FormContent>
    </form>
  );
};
