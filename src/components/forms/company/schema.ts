import { z } from "zod";

export const CompanySchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres",
  }),
  address: z.string().min(10, {
    message: "La dirección debe tener al menos 10 caracteres",
  }),
  phone: z.string().min(8, {
    message: "El debe tener al menos 8 caracteres",
  }),
  enabled: z.boolean(),
});

export type CompanySchema = z.infer<typeof CompanySchema>;
