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
});
