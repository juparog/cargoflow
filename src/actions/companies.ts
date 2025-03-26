"use server";

import client, { handlePrismaError } from "@/lib/prisma";
import { Company, Prisma } from "@prisma/client";
import { buildWhere, getPaginatedRecords } from "./pagination";

export interface FindCompaniesOptions {
  name?: string;
  enabled?: boolean | "all";
}

export interface FindCompaniesPaginatedOptions extends FindCompaniesOptions {
  limit?: number;
  page?: number;
  sortBy?: {
    [field in keyof Company]?: "asc" | "desc";
  }[];
}

export interface IncludeCompanyOptions {
  packages: boolean;
}

export const onCreateCompany = async (data: Prisma.CompanyCreateInput) => {
  try {
    const company = await client.company.create({
      data,
    });

    return company;
  } catch (error) {
    console.error("Error creating company", handlePrismaError(error));
    return null;
  }
};

export const onGetCompanies = async (options?: {
  filters?: FindCompaniesOptions;
  includes?: IncludeCompanyOptions;
}) => {
  try {
    const companies = await client.company.findMany({
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

export const onGetCompaniesPaginated = async (
  options?: FindCompaniesPaginatedOptions
) => {
  try {
    const result = await getPaginatedRecords("company", {
      ...options,
      filters: await buildWhere(options),
    });
    return {
      ...result,
      data: result.data as unknown as Company[],
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onGetCompanyById = async (
  id: string,
  options?: {
    filters?: FindCompaniesOptions;
    includes?: IncludeCompanyOptions;
  }
) => {
  try {
    const company = await client.company.findUnique({
      where: {
        ...(await buildWhere(options?.filters)),
        id,
      },
      include: {
        ...options?.includes,
      },
    });

    return company;
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onUpdateCompany = async (
  id: string,
  data: Prisma.CompanyUpdateInput
): Promise<boolean> => {
  try {
    const company = await client.company.update({
      where: { id },
      data,
    });

    return !!company;
  } catch (error) {
    console.error("Error updating company", handlePrismaError(error));
    return false;
  }
};

export const onDeleteCompany = async (id: string) => {
  try {
    const company = await client.company.delete({
      where: { id },
    });

    return company;
  } catch (error) {
    throw handlePrismaError(error);
  }
};
