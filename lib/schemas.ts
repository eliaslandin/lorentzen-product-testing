import { z } from "zod";

export const nonEmptyStringSchema = z.string({
  required_error: "Måste fyllas i",
});

export const stringMax255Schema = nonEmptyStringSchema.max(
  255,
  "Texten får vara max 255 tecken lång",
);

export const personalNumberSchema = z
  .number()
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
  anon_uid: z.string().uuid(),
});

export const addPersonalInfoSchema = z.object({
  user_id: z.string().uuid(),
  test_id: z.number(),
  email: z.string().email("Ogiltig epostadress").optional(),
  tel: z.string().max(16, "Ogiltigt telefonnummer"),
  address: stringMax255Schema,
  postal_code: z.string().max(16, "Ogiltigt postnummer"),
  terms_accepted: z.literal<boolean>(true),
  gdpr_accepted: z.literal<boolean>(true),
});
