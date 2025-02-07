import { Prisma, PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof client };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;

export default client;

export const handlePrismaError = (error: unknown) => {
  let message =
    error instanceof Error ? error.message : "¡Ups! Algo salió mal.";
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // https://www.prisma.io/docs/orm/reference/error-reference

    if (error.code === "P2002") {
      // P2002 - Unique constraint failed on the {constraint}
      console.log(JSON.stringify(error, null, 2));

      message = `La restricción única falló en ${
        error.meta?.constraint
          ? `la restricción "${error.meta?.constraint}"`
          : `el campo ${error.meta?.target}`
      } para el modelo "${error.meta?.modelName}"`;
    }

    if (error.code === "P2003") {
      // P2003 - Foreign key constraint failed on the field: {field_name}
      message = `La restricción de clave externa falló en el campo "${error.meta?.field_name}" para el modelo "${error.meta?.modelName}"`;
    }

    if (error.code === "P2023") {
      // P2023 - Inconsistent column data: {message}
      message = `Datos de columna inconsistentes en el modelo "${error.meta?.modelName}" - ${error.meta?.message}`;
    }

    if (error.code === "P2037") {
      // P2037 - Too many database connections opened: {message}
      message = `Demasiadas conexiones de bases de datos abiertas: ${error.meta?.message}`;
    }
  }

  return new Error(
    message,
    error instanceof Error ? { cause: error.cause } : {}
  );
};
