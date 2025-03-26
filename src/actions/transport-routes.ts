"use server";

import client, { handlePrismaError } from "@/lib/prisma";
import { Prisma, TransportRoute } from "@prisma/client";
import { buildWhere, getPaginatedRecords } from "./pagination";

export interface FindTransportRoutesOptions {
  name?: string;
  enabled?: boolean | "all";
}

export interface FindTransportRoutesPaginatedOptions
  extends FindTransportRoutesOptions {
  limit?: number;
  page?: number;
  sortBy?: {
    [field in keyof TransportRoute]?: "asc" | "desc";
  }[];
}

export interface IncludeTransportRouteOptions {
  transportRecords: boolean;
}

export const onCreateTransportRoute = async (
  data: Prisma.TransportRouteCreateInput
) => {
  try {
    const transportRoute = await client.transportRoute.create({
      data,
    });

    return transportRoute;
  } catch (error) {
    console.error("Error creating transportRoute", handlePrismaError(error));
    return null;
  }
};

export const onGetTransportRoutes = async (options?: {
  filters?: FindTransportRoutesOptions;
  includes?: IncludeTransportRouteOptions;
}) => {
  try {
    const companies = await client.transportRoute.findMany({
      where: {
        ...(await buildWhere(options?.filters)),
      },
      include: {
        ...options?.includes,
      },
    });

    return companies;
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onGetTransportRoutesPaginated = async (
  options?: FindTransportRoutesPaginatedOptions
) => {
  try {
    const result = await getPaginatedRecords("transportRoute", {
      ...options,
      filters: await buildWhere(options),
    });
    return {
      ...result,
      data: result.data as unknown as TransportRoute[],
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};
