import { z } from "zod";

export const schoolSchema = z.object({
  name: z
    .string()
    .min(10, { message: "Name must be at least 10 characters long" }),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters long" }),
  latitude: z.number().refine((val) => !isNaN(val) && val % 1 !== 0, {
    message: "Latitude must be a valid float",
  }),
  longitude: z.number().refine((val) => !isNaN(val) && val % 1 !== 0, {
    message: "Longitude must be a valid float",
  }),
});

export const coordinateSchema = z.object({
  latitude: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: "Latitude must be a valid number",
    }),
  longitude: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: "Longitude must be a valid number",
    }),
});
