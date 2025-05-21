"use client";

import { addPersonalInfoAction } from "@/app/actions";
import { addPersonalInfoSchema } from "@/lib/schemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { FormContent } from "./form-content";
import { FormField } from "./form-field";
import { FormErrorMessage } from "./form-error-message";
import { FormSubmitButton } from "./form-submit-button";
import { Input } from "./ui/input";
import { View } from "./view";
import { P } from "./P";
import { Checkbox } from "./ui/checkbox";
import { QueryData } from "@supabase/supabase-js";
import { getPersonalInfoSubmission } from "@/lib/fetchers";

export const PersonalInfoForm = ({
  userId,
  testId,
  initialData,
}: {
  userId: string;
  testId: number;
  initialData: QueryData<ReturnType<typeof getPersonalInfoSubmission>> | null;
}) => {
  const [lastResult, formAction, pending] = useActionState(
    addPersonalInfoAction,
    undefined,
  );

  console.log(initialData);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: addPersonalInfoSchema,
      });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
    defaultValue: initialData,
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={formAction}>
      <FormContent>
        <FormField
          label="Epost"
          inputId={fields.email.id}
          errorMessage={fields.email.errors}
        >
          <Input
            type="email"
            id={fields.email.id}
            name={fields.email.name}
            key={fields.email.key}
            defaultValue={fields.email.initialValue}
          />
        </FormField>
        <FormField
          label="Telefon"
          inputId={fields.tel.id}
          errorMessage={fields.tel.errors}
        >
          <Input
            type="tel"
            id={fields.tel.id}
            name={fields.tel.name}
            key={fields.tel.key}
            defaultValue={fields.tel.initialValue}
            required
          />
        </FormField>
        <FormField
          label="Adress"
          inputId={fields.address.id}
          errorMessage={fields.address.errors}
        >
          <Input
            type="text"
            id={fields.address.id}
            name={fields.address.name}
            key={fields.address.key}
            defaultValue={fields.address.initialValue}
            required
          />
        </FormField>
        <FormField
          label="Postnummer"
          inputId={fields.postal_code.id}
          errorMessage={fields.postal_code.errors}
        >
          <Input
            type="text"
            id={fields.postal_code.id}
            name={fields.postal_code.name}
            key={fields.postal_code.key}
            defaultValue={fields.postal_code.initialValue}
            required
          />
        </FormField>
        <FormField
          label="Användarvillkor"
          inputId={fields.terms_accepted.id}
          errorMessage={fields.terms_accepted.errors}
        >
          <View className="flex-row gap-4 items-center">
            <P>Jag godkänner användarvillkoren:</P>
            <Checkbox
              id={fields.terms_accepted.id}
              name={fields.terms_accepted.name}
              key={fields.terms_accepted.key}
              defaultChecked={fields.terms_accepted.initialValue === "true"}
            />
          </View>
        </FormField>
        <FormField
          label="Integritetspolicy"
          inputId={fields.privacy_policy_accepted.id}
          errorMessage={fields.privacy_policy_accepted.errors}
        >
          <View className="flex-row gap-4 items-center">
            <P>Jag godkänner integritetspolicyn:</P>
            <Checkbox
              id={fields.privacy_policy_accepted.id}
              name={fields.privacy_policy_accepted.name}
              key={fields.privacy_policy_accepted.key}
              defaultChecked={
                fields.privacy_policy_accepted.initialValue === "true"
              }
            />
          </View>
        </FormField>
        <input
          type="hidden"
          id={fields.user_id.id}
          key={fields.user_id.key}
          name={fields.user_id.name}
          value={userId}
        />
        <input
          type="hidden"
          id={fields.test_id.id}
          key={fields.test_id.key}
          name={fields.test_id.name}
          value={testId}
        />
        <FormSubmitButton pending={pending}>Fortsätt</FormSubmitButton>
        <FormErrorMessage>{form.errors}</FormErrorMessage>
      </FormContent>
    </form>
  );
};
