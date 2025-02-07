"use server";

import client, { handlePrismaError } from "@/lib/prisma";
import { Company, Prisma } from "@prisma/client";

export interface FindCompaniesOptions {
  name?: string;
  enabled?: boolean | "all";
  includePackages?: boolean;
}

export interface FindCompaniesPaginatedOptions extends FindCompaniesOptions {
  limit?: number;
  page?: number;
  sortBy?: {
    [field in keyof Company]?: "asc" | "desc";
  }[];
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

export const onGetCompanies = async (options?: FindCompaniesOptions) => {
  try {
    const companies = await client.company.findMany({
      where: {
        ...buildWhere(options),
      },
      include: {
        packages: !!options?.includePackages,
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
    const { skip, page, limit, sortBy } = buildPaginatedControls(options);

    const [data, totalCount] = await Promise.all([
      client.company.findMany({
        where: {
          ...buildWhere(options),
        },
        include: {
          packages: !!options?.includePackages,
        },
        skip: skip,
        take: limit,
        orderBy: sortBy,
      }),
      client.company.count({
        where: {
          ...buildWhere(options),
        },
      }),
    ]);

    return {
      totalCount,
      page,
      limit,
      data,
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onGetCompanyById = async (
  id: string,
  options?: FindCompaniesOptions
) => {
  try {
    const company = await client.company.findUnique({
      where: {
        ...buildWhere(options),
        id,
      },
      include: {
        packages: !!options?.includePackages,
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

const buildWhere = (filter?: FindCompaniesOptions) => {
  const filters = {} as Prisma.CompanyWhereInput;

  if (filter?.enabled !== "all") {
    filters.enabled = filter?.enabled ?? true;
  }

  if (filter?.name) {
    filters.name = {
      contains: filter.name,
      mode: "insensitive",
    };
  }

  return filters;
};

const buildPaginatedControls = (options?: FindCompaniesPaginatedOptions) => {
  const page = options?.page || 1;
  const limit = options?.limit || 10;
  const skip = limit * (page - 1);
  const sortBy = options?.sortBy || [{ name: "asc" }];

  return { skip, limit, page, sortBy };
};
