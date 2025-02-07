import {
  FindCompaniesOptions,
  FindCompaniesPaginatedOptions,
  onCreateCompany,
  onDeleteCompany,
  onGetCompanies,
  onGetCompaniesPaginated,
  onGetCompanyById,
  onUpdateCompany,
} from "@/actions/companies";
import { Company, Prisma } from "@prisma/client";
import { useMutationData } from "./use-mutation";
import { useQueryData } from "./use-query";

export const useFetchCompanies = (options?: FindCompaniesOptions) => {
  const { data: companies, isPending: isPendingCompanies } = useQueryData<
    Prisma.PromiseReturnType<typeof onGetCompanies>
  >(["companies"], () => onGetCompanies(options));

  return {
    companies,
    isPendingCompanies,
  };
};

export const useFetchPaginatedCompanies = (
  options: FindCompaniesPaginatedOptions
) => {
  const {
    data: companiesPaginated,
    isPending: isPendingCompaniesPaginated,
    refetch: refetchCompaniesPaginated,
  } = useQueryData<Prisma.PromiseReturnType<typeof onGetCompaniesPaginated>>(
    ["companiesPaginated"],
    () => onGetCompaniesPaginated(options)
  );

  return {
    companiesPaginated,
    isPendingCompaniesPaginated,
    refetchCompaniesPaginated,
  };
};

export const useFetchCompanyById = (id: string, enabled?: boolean) => {
  const { data: company, isPending: isPendingCompany } =
    useQueryData<Company | null>(["company", id], () => {
      if (!id) {
        return { company: null, isPendingCompany: false };
      }
      return onGetCompanyById(id, { enabled });
    });

  return {
    company,
    isPendingCompany,
  };
};

export const useCreateCompany = () => {
  const { mutate: createCompany, isPending: isPendingCreateCompany } =
    useMutationData(
      ["createCompany"],
      async (data: Prisma.CompanyCreateInput) => {
        try {
          const created = await onCreateCompany(data);
          return created
            ? { status: 200, data: "Compañía creada correctamente" }
            : { status: 400, data: "Error al crear la compañía" };
        } catch (error) {
          return {
            status: 400,
            data:
              error instanceof Error
                ? error.message
                : "Error ejecutando la acción",
          };
        }
      },
      "companies"
    );

  return { createCompany, isPendingCreateCompany };
};

export const useUpdateCompany = () => {
  const { mutate: updateCompany, isPending: isPendingUpdateCompany } =
    useMutationData(
      ["updateCompany"],
      async (args: { id: string; data: Prisma.CompanyUpdateInput }) => {
        try {
          const updated = await onUpdateCompany(args.id, args.data);
          return updated
            ? { status: 200, data: "Compañía actualizada correctamente" }
            : { status: 400, data: "Error al actualizar la compañía" };
        } catch (error) {
          return {
            status: 400,
            data:
              error instanceof Error
                ? error.message
                : "Error ejecutando la acción",
          };
        }
      },
      "companies"
    );

  return { updateCompany, isPendingUpdateCompany };
};

export const useUpdateCompanyEnabled = () => {
  const {
    mutate: updateCompanyEnabled,
    isPending: isPendingUpdateCompanyEnabled,
  } = useMutationData(
    ["updateCompanyEnabled"],
    async (args: { id: string; enabled: boolean }) => {
      try {
        const updated = await onUpdateCompany(args.id, {
          enabled: args.enabled,
        });
        return updated
          ? {
              status: 200,
              data: `Compañía ${
                args.enabled ? "activada" : "desactivada"
              } correctamente`,
            }
          : { status: 400, data: "Error al actualizar la compañía" };
      } catch (error) {
        return {
          status: 400,
          data:
            error instanceof Error
              ? error.message
              : "Error ejecutando la acción",
        };
      }
    },
    "companies"
  );

  return { updateCompanyEnabled, isPendingUpdateCompanyEnabled };
};

export const useDeleteCompany = () => {
  const { mutate: deleteCompany, isPending: isPendingDeleteCompany } =
    useMutationData(
      ["deleteCompany"],
      async (id: string) => {
        try {
          const deleted = await onDeleteCompany(id);
          return deleted
            ? { status: 200, data: "Compañía eliminada correctamente" }
            : { status: 400, data: "Error al eliminar la compañía" };
        } catch (error) {
          return {
            status: 400,
            data:
              error instanceof Error
                ? error.message
                : "Error ejecutando la acción",
          };
        }
      },
      "companies"
    );

  return { deleteCompany, isPendingDeleteCompany };
};
