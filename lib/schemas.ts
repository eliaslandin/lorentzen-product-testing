import { z } from "zod/v4";

export const nonEmptyStringSchema = z.string({
  error: (iss) =>
    iss.input === undefined ? "Måste fyllas i" : "Ogiltigt värde",
});

export const stringMax255Schema = nonEmptyStringSchema.max(
  255,
  "Texten får vara max 255 tecken lång",
);

export const personalNumberSchema = z
  .number({
    error: (iss) =>
      iss.input === undefined ? "Måste fyllas i" : "Ogiltigt personnummer",
  })
  .min(190000000000, "Ogiltigt personnummer")
  .max(999999999999, "Ogiltigt personnummber");

export const createTestPersonSchema = z.object({
  name: stringMax255Schema,
  personal_number: personalNumberSchema,
  city: z.number().optional(),
});

export const createTestSchema = z.object({
  name: stringMax255Schema,
  description: z.string().optional(),
  city: z.number().optional(),
  company: z.number().optional(),
  date: z.date().optional(),
});

export const requestLoginSchema = z.object({
  personal_number: personalNumberSchema,
});

export const approveLoginSchema = z.object({
  pair_code: z.number().max(99),
  anon_uid: z.uuid(),
});

export const addPersonalInfoSchema = z.object({
  user_id: z.uuid(),
  test_id: z.number(),
  email: z.email("Ogiltig epostadress").optional(),
  tel: nonEmptyStringSchema.max(16, "Ogiltigt telefonnummer"),
  address: stringMax255Schema,
  postal_code: nonEmptyStringSchema.max(16, "Ogiltigt postnummer"),
  terms_accepted: z.boolean().refine((val) => val, {
    message: "Måste acceptera användarvillkoren",
  }),
  privacy_policy_accepted: z.boolean().refine((val) => val, {
    message: "Måste acceptera integritetspolicyn",
  }),
});

export const createProductSchema = z.object({
  name: stringMax255Schema,
  description: z.string().optional(),
  testId: z.number(),
  image: z.file().max(2_000_000, "Max 2MB").optional(),
});
