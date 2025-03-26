"use client";
import CompanyForm from "@/components/forms/company";
import CustomModal from "@/components/global/custom-modal";
import { DataTable } from "@/components/global/data-table";
import Loading from "@/components/global/loading";
import { Button } from "@/components/ui/button";
import { CONSTANTS } from "@/constants";
import {
  useDeleteCompany,
  useFetchPaginatedCompanies,
  useUpdateCompanyEnabled,
} from "@/hooks/use-company";
import { getFilters, getSorting } from "@/lib/utils";
import { useModal } from "@/providers/modal-provider";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { companyColumns } from "./_components/columns";

const CompaniesPage = () => {
  const [pagination, setPagination] = useState(CONSTANTS.paginatedTable);
  const [filters, setFilters] = useState<ColumnFiltersState>([
    { id: "name", value: "" },
  ]);
  const [order, setOrder] = useState<SortingState>([]);
  const [onCompletSubmit, setOnCompletSubmit] = useState<boolean>(false);

  const { setOpen, setClose } = useModal();
  const {
    companiesPaginated,
    isPendingCompaniesPaginated,
    refetchCompaniesPaginated,
  } = useFetchPaginatedCompanies({
    ...getFilters(filters),
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sortBy: getSorting(order),
  });
  const { deleteCompany, isPendingDeleteCompany } = useDeleteCompany();
  const { updateCompanyEnabled, isPendingUpdateCompanyEnabled } =
    useUpdateCompanyEnabled();

  useEffect(() => {
    refetchCompaniesPaginated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize, filters, order]);

  useEffect(() => {
    setClose();
    refetchCompaniesPaginated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingDeleteCompany, isPendingUpdateCompanyEnabled]);

  useEffect(() => {
    if (onCompletSubmit) {
      setOnCompletSubmit(false);
      refetchCompaniesPaginated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCompletSubmit]);

  const openModalWithForm = (
    actionType: "create" | "edit" | "view",
    companyId?: string
  ) => {
    setOpen(
      <CustomModal
        title={getModalTitle(actionType)}
        subheading={getModalSubheading(actionType)}
      >
        <CompanyForm
          actionType={actionType}
          companyId={companyId || undefined}
          enabled={getFilters(filters).enabled}
          onClose={() => setClose()}
          onCompletSubmit={() => setOnCompletSubmit(true)}
        />
      </CustomModal>
    );
  };

  const handleDeleteCompany = async (
    companyId: string,
    companyName: string
  ) => {
    setOpen(
      <CustomModal
        title="Eliminar Empresa"
        subheading={`¿Estás seguro de eliminar la empresa "${companyName}"?`}
      >
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setClose()}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            disabled={isPendingDeleteCompany}
            onClick={async () => {
              deleteCompany(companyId);
            }}
          >
            {isPendingDeleteCompany ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </CustomModal>
    );
  };

  const handleChangeEnabled = async (companyId: string, enabled: boolean) => {
    updateCompanyEnabled({ id: companyId, enabled });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Empresas</h1>
        <Button onClick={() => openModalWithForm("create")}>
          Agregar Empresa
        </Button>
      </div>

      {isPendingCompaniesPaginated ? (
        <Loading text="Cargando empresas..." />
      ) : (
        <DataTable
          columns={companyColumns(
            openModalWithForm,
            handleChangeEnabled,
            handleDeleteCompany
          )}
          data={companiesPaginated?.data || []}
          totalCount={companiesPaginated?.totalCount || 0}
          pagination={pagination}
          initialFilters={filters}
          onPaginationChange={setPagination}
          onFiltersChange={(filters) => setFilters(filters)}
          onOrderChange={(order) => setOrder(order)}
        />
      )}
    </div>
  );
};

const getModalTitle = (type: "create" | "edit" | "view") => {
  switch (type) {
    case "create":
      return "Crear Empresa";
    case "edit":
      return "Editar Empresa";
    case "view":
      return "Detalles de la Empresa";
  }
};

const getModalSubheading = (type: "create" | "edit" | "view") => {
  switch (type) {
    case "create":
      return "Llene los campos para crear una nueva empresa.";
    case "edit":
      return "Actualice los campos necesarios.";
    case "view":
      return "Aquí están los detalles de la empresa seleccionada.";
  }
};

export default CompaniesPage;
