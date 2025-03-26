"use server";

import client, { handlePrismaError } from "@/lib/prisma";
import { Prisma, Vehicle } from "@prisma/client";
import { buildWhere, getPaginatedRecords } from "./pagination";

export interface FindVehiclesOptions {
  name?: string;
  licensePlate?: string;
  brand?: string;
  enabled?: boolean | "all";
}

export interface FindVehiclesPaginatedOptions extends FindVehiclesOptions {
  limit?: number;
  page?: number;
  sortBy?: {
    [field in keyof Vehicle]?: "asc" | "desc";
  }[];
}

export interface IncludeVehicleOptions {
  transportRecords?: boolean;
}

export const onGetVehicles = async (options?: {
  filters?: FindVehiclesOptions;
  includes?: IncludeVehicleOptions;
}) => {
  try {
    const vehicles = await client.vehicle.findMany({
      where: {
        ...(await buildWhere(options?.filters)),
      },
      include: {
        ...options?.includes,
      },
    });

    return vehicles;
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onGetVehiclesPaginated = async (
  options?: FindVehiclesPaginatedOptions
) => {
  try {
    const result = await getPaginatedRecords("vehicle", {
      ...options,
      filters: await buildWhere(options),
    });
    return {
      ...result,
      data: result.data as unknown as Vehicle[],
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onGetVehicleById = async (
  id: string,
  options?: {
    filters?: FindVehiclesOptions;
    includes?: IncludeVehicleOptions;
  }
) => {
  try {
    const vehicle = await client.vehicle.findUnique({
      where: {
        ...(await buildWhere(options?.filters)),
        id,
      },
      include: {
        ...options?.includes,
      },
    });

    return vehicle;
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onGetVehiclesByNameOrLicensePlate = async (
  nameOrLicensePlate: string
) => {
  try {
    const vehicles = await client.vehicle.findMany({
      where: {
        OR: [
          {
            name: {
              contains: nameOrLicensePlate,
              mode: "insensitive",
            },
          },
          {
            licensePlate: {
              contains: nameOrLicensePlate,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return vehicles;
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onGetVehicleCategories = async () => {
  try {
    const categories = await client.vehicle.findMany({
      select: {
        brand: true,
      },
      distinct: ["brand"],
    });

    return categories.map((category) => category.brand);
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onCreateVehicle = async (data: Prisma.VehicleCreateInput) => {
  try {
    const vehicle = await client.vehicle.create({
      data,
    });

    return vehicle;
  } catch (error) {
    console.error("Error creating vehicle", handlePrismaError(error));
    return null;
  }
};

export const onUpdateVehicle = async (
  id: string,
  data: Prisma.VehicleUpdateInput
): Promise<boolean> => {
  try {
    const vehicle = await client.vehicle.update({
      where: { id },
      data,
    });

    return !!vehicle;
  } catch (error) {
    console.error("Error updating vehicle", handlePrismaError(error));
    return false;
  }
};

export const onDeleteVehicle = async (id: string) => {
  try {
    const vehicle = await client.vehicle.delete({
      where: { id },
    });

    return vehicle;
  } catch (error) {
    throw handlePrismaError(error);
  }
};
