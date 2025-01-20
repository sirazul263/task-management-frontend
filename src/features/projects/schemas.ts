import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Project Name must be at least 1 character")
    .max(255, "Project Name must not be greater than 255 characters"),
  key: z
    .string({ required_error: "Project key is required!" })
    .trim()
    .min(1, "Project Key must be at least 1 character")
    .max(10, "Project Key must not be greater than 255 characters"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
