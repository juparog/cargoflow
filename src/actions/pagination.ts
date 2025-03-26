// lib/crud-actions.ts
"use server";
import client, { handlePrismaError } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/**
 * Tipo para los nombres de los modelos disponibles en Prisma.
 */
type ModelName = Prisma.TypeMap["meta"]["modelProps"];

type FindCommonModelDef = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findMany: (...args: any) => Promise<(typeof client)[ModelName][]>;
  count: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any
  ) => Promise<number>;
};

/**
 * Obtiene registros paginados y filtrados de un modelo específico.
 */
export const getPaginatedRecords = async (
  model: ModelName,
  options?: {
    filters?: Prisma.Args<(typeof client)[typeof model], "findMany">["where"];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    include?: any;
    limit?: number;
    page?: number;
    sortBy?: Prisma.Args<(typeof client)[typeof model], "findMany">["orderBy"];
  }
) => {
  try {
    const { skip, page, limit, sortBy } = buildPaginatedControls(options);
    const modelDef = client[model] as unknown as FindCommonModelDef;

    const [data, totalCount] = await Promise.all([
      modelDef.findMany({
        where: options?.filters,
        include: options?.include,
        skip,
        take: limit,
        orderBy: sortBy,
      }),
      modelDef.count({
        where: options?.filters,
      }),
    ]);
    return { data, totalCount, page, limit };
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Construye los filtros para las consultas de manera personalizada.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildWhere = async (filter?: Record<string, any>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: Record<string, any> = {};
  if (filter?.enabled !== "all") {
    filters["enabled"] = filter?.enabled ?? true;
  }
  if (filter?.name) {
    filters["name"] = {
      contains: filter.name,
      mode: "insensitive",
    };
  }
  return filters;
};

/**
 * Construye los controles de paginación.
 */
const buildPaginatedControls = <T extends ModelName>(options?: {
  limit?: number;
  page?: number;
  sortBy?: Prisma.Args<(typeof client)[T], "findMany">["orderBy"];
}) => {
  const page = options?.page || 1;
  const limit = options?.limit || 10;
  const skip = limit * (page - 1);
  const sortBy = options?.sortBy || [{ name: "asc" }];
  return { skip, limit, page, sortBy };
};
