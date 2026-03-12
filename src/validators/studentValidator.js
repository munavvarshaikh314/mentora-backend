import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(5).max(18)
});