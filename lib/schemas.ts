import { z } from "zod";

export const stringMax255Schema = z.string().max(255, "Texten är för lång.");

export const creatTestPersonSchema = z.object({
  name: stringMax255Schema,
});
