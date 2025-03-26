"use client";

import VehicleForm from "@/components/forms/vehicle";
import CustomModal from "@/components/global/custom-modal";
import { DataGrid } from "@/components/global/data-grid";
import { Button } from "@/components/ui/button";
import { CONSTANTS } from "@/constants";
import {
  useDeleteVehicle,
  useFetchPaginatedVehicles,
  useUpdateVehicleEnabled,
} from "@/hooks/use-vehicle";
import { getFilters, getSorting } from "@/lib/utils";
import { useModal } from "@/providers";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { vehicleColumns } from "./columns";

export const VehicleTab = () => {
  const [pagination, setPagination] = useState(CONSTANTS.paginatedGrid);
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [order, setOrder] = useState<SortingState>([]);
  const [onCompletSubmit, setOnCompletSubmit] = useState<boolean>(false);
  const { setOpen, setClose } = useModal();
  const {
    vehiclesPaginated,
    isPendingVehiclesPaginated,
    refetchVehiclesPaginated,
  } = useFetchPaginatedVehicles({
    ...getFilters(filters),
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sortBy: getSorting(order),
  });
  const { deleteVehicle, isPendingDeleteVehicle } = useDeleteVehicle();
  const { updateVehicleEnabled, isPendingUpdateVehicleEnabled } =
    useUpdateVehicleEnabled();

  useEffect(() => {
    refetchVehiclesPaginated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize, filters, order]);

  useEffect(() => {
    setClose();
    refetchVehiclesPaginated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingDeleteVehicle, isPendingUpdateVehicleEnabled]);

  useEffect(() => {
    if (onCompletSubmit) {
      setOnCompletSubmit(false);
      refetchVehiclesPaginated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCompletSubmit]);

  const openModalWithForm = (
    actionType: "create" | "edit" | "view",
    vehicleId?: string
  ) => {
    setOpen(
      <CustomModal
        title={getModalTitle(actionType)}
        subheading={getModalSubheading(actionType)}
      >
        <VehicleForm
          actionType={actionType}
          vehicleId={vehicleId || ""}
          enabled={getFilters(filters).enabled}
          onClose={() => setClose()}
          onCompletSubmit={() => setOnCompletSubmit(true)}
        />
      </CustomModal>
    );
  };

  const handleDeleteVehicle = async (
    vehicleId: string,
    vehicleName: string
  ) => {
    setOpen(
      <CustomModal
        title="Eliminar Vehiculo"
        subheading={`¿Estás seguro de eliminar el vehiculo "${vehicleName}"?`}
      >
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setClose()}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            disabled={isPendingDeleteVehicle}
            onClick={async () => {
              deleteVehicle(vehicleId);
            }}
          >
            {isPendingDeleteVehicle ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </CustomModal>
    );
  };

  const handleChangeEnabled = async (companyId: string, enabled: boolean) => {
    updateVehicleEnabled({ id: companyId, enabled });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vehículos</h2>
        <Button onClick={() => openModalWithForm("create")}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Vehículo
        </Button>
      </div>
      <div className="p-2">
        <DataGrid
          columns={vehicleColumns(
            openModalWithForm,
            handleChangeEnabled,
            handleDeleteVehicle
          )}
          data={vehiclesPaginated?.data || []}
          totalCount={vehiclesPaginated?.totalCount || 0}
          pagination={pagination}
          isLoadingItems={isPendingVehiclesPaginated}
          onPaginationChange={setPagination}
          initialFilters={filters}
          onFiltersChange={(filters) => setFilters(filters)}
          onOrderChange={(order) => setOrder(order)}
        />
      </div>
    </div>
  );
};

const getModalTitle = (type: "create" | "edit" | "view") => {
  switch (type) {
    case "create":
      return "Crear Vehiculo";
    case "edit":
      return "Editar Vehiculo";
    case "view":
      return "Detalles de la Vehiculo";
  }
};

const getModalSubheading = (type: "create" | "edit" | "view") => {
  switch (type) {
    case "create":
      return "Llene los campos para crear un nuevo vehiculo.";
    case "edit":
      return "Actualice los campos necesarios.";
    case "view":
      return "Aquí están los detalles del vehiculo seleccionado.";
  }
};
