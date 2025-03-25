import { z } from "zod";

export const nonEmptyStringSchema = z.string({
  required_error: "Måste fyllas i",
});

export const stringMax255Schema = nonEmptyStringSchema.max(
  255,
  "Texten får vara max 255 tecken lång",
);

export const createTestPersonSchema = z.object({
  name: stringMax255Schema,
  personal_number: z
    .number()
    .min(190000000000, "Ogiltigt personnummer")
    .max(999999999999, "Ogiltigt personnummber"),
  city: z.number().optional(),
});

export const createTestSchema = z.object({
  name: stringMax255Schema,
  description: z.string().optional(),
  city: z.number().optional(),
  company: z.number().optional(),
  date: z.date().optional(),
});
