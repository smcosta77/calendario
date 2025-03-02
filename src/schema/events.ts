import { z } from "zod"

export const eventFormSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  durationInMinutes: z.coerce
    .number()
    .int()
    .positive("A duração deve ser maior que 0")
    .max(60 * 12, `A duração deve ser inferior a 12 horas (${60 * 12} minutes)`),
})