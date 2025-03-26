"use server";

import client, { handlePrismaError } from "@/lib/prisma";
import {
  Prisma,
  TransportRecord,
  TransportRecordStatusType,
} from "@prisma/client";
import { buildWhere, getPaginatedRecords } from "./pagination";

export interface FindTransportRecordsOptions {
  vehicleId?: string;
  driverId?: string;
  status?: TransportRecordStatusType;
  enabled?: boolean | "all";
  include?: Prisma.TransportRecordInclude;
}

export interface FindTransportRecordsPaginatedOptions
  extends FindTransportRecordsOptions {
  limit?: number;
  page?: number;
  sortBy?: {
    [field in keyof TransportRecord]?: "asc" | "desc";
  }[];
}

export interface IncludeTransportRecordOptions {
  vehicle: boolean;
  driver: boolean;
  histories: boolean;
  movements: boolean;
  packages: boolean;
}

export const onCreateTransportRecord = async (
  data: Prisma.TransportRecordCreateInput
) => {
  try {
    const transportRecord = await client.transportRecord.create({
      data,
    });

    return transportRecord;
  } catch (error) {
    console.error("Error creating transport record", handlePrismaError(error));
    return null;
  }
};

export const onGetTransportRecords = async (
  options?: FindTransportRecordsOptions
) => {
  try {
    const transportRecords = await client.transportRecord.findMany({
      where: {
        ...(await buildWhere(options)),
      },
    });

    return transportRecords;
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onGetTransportRecordsPaginated = async (
  options?: FindTransportRecordsPaginatedOptions
) => {
  try {
    const result = await getPaginatedRecords("transportRecord", {
      ...options,
      filters: await buildWhere(options),
    });
    return {
      ...result,
      data: result.data as unknown as TransportRecord[],
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onGetTransportRecordById = async (
  id: string,
  options?: {
    filters?: FindTransportRecordsOptions;
    includes?: IncludeTransportRecordOptions;
  }
) => {
  try {
    const transportRecord = await client.transportRecord.findUnique({
      where: {
        ...(await buildWhere(options?.filters)),
        id,
      },
      include: {
        ...options?.includes,
      },
    });

    return transportRecord;
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onUpdateTransportRecord = async (
  id: string,
  data: Prisma.TransportRecordUpdateInput
): Promise<boolean> => {
  try {
    const transportRecord = await client.transportRecord.update({
      where: { id },
      data,
    });

    return !!transportRecord;
  } catch (error) {
    console.error("Error updating transport record", handlePrismaError(error));
    return false;
  }
};

export const onDeleteTransportRecord = async (id: string) => {
  try {
    const transportRecord = await client.transportRecord.delete({
      where: { id },
    });

    return transportRecord;
  } catch (error) {
    throw handlePrismaError(error);
  }
};
