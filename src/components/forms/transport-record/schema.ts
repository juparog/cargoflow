import { TransportRecordStatusType } from "@prisma/client";
import { z } from "zod";

export const TransportRecordSchema = z.object({
  routeId: z.string().uuid({
    message: "ID de ruta inválido",
  }),
  vehicleId: z.string().uuid({
    message: "ID de vehículo inválido",
  }),
  driverId: z.string().uuid({
    message: "ID de conductor inválido",
  }),
  status: z.nativeEnum(TransportRecordStatusType, {
    message: "Estado de registro inválido",
  }),
  notes: z.array(z.string()).optional(),
  initialAmount: z.number({ message: "Monto inicial inválido" }).min(0, {
    message: "El monto inicial debe ser mayor o igual a 0",
  }),
});

export type TransportRecordSchema = z.infer<typeof TransportRecordSchema>;
