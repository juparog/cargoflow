import { VehicleType } from "@prisma/client";
import { z } from "zod";

export const VehicleSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
  licensePlate: z.string().min(6, {
    message: "La placa debe tener al menos 6 caracteres",
  }),
  brand: z.string().min(3, {
    message: "La marca debe tener al menos 3 caracteres",
  }),
  model: z.string().min(3, {
    message: "El modelo debe tener al menos 3 caracteres",
  }),
  type: z.nativeEnum(VehicleType, {
    message: "Tipo de vehículo inválido",
  }),
  image: z
    .string()
    .url({
      message: "La imagen debe ser una URL válida",
    })
    .optional(),
  enabled: z.boolean().optional(),
});

export type VehicleSchema = z.infer<typeof VehicleSchema>;
