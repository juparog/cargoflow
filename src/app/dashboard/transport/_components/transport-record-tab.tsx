"use client";

import TransportRecordForm from "@/components/forms/transport-record";
import CustomModal from "@/components/global/custom-modal";
import { CustomFilter, DataTable } from "@/components/global/data-table";
import Loading from "@/components/global/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CONSTANTS } from "@/constants";
import {
  useDeleteTransportRecord,
  useFetchPaginatedTransportRecords,
  useUpdateTransportRecordEnabled,
} from "@/hooks/use-transport-record";
import { getFilters, getSorting } from "@/lib/utils";
import { useModal } from "@/providers";
import { TransportRecordStatusType } from "@prisma/client";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { transportRecordColumns } from "./columns";

const customFilters: CustomFilter[] = [
  {
    column: "status",
    title: "Estado",
    type: "select",
    options: [
      {
        value: TransportRecordStatusType.PENDING,
        label: "Pendiente",
      },
      {
        value: TransportRecordStatusType.ONGOING,
        label: "En curso",
      },
      {
        value: TransportRecordStatusType.COMPLETED,
        label: "Completado",
      },
      {
        value: TransportRecordStatusType.CANCELED,
        label: "Cancelado",
      },
    ],
  },
];

export const TransportRecordTab = () => {
  const [pagination, setPagination] = useState(CONSTANTS.paginatedTable);
  const [filters, setFilters] = useState<ColumnFiltersState>([
    { id: "title", value: "" },
  ]);
  const [order, setOrder] = useState<SortingState>([]);
  const [onCompletSubmit, setOnCompletSubmit] = useState<boolean>(false);
  const { setOpen, setClose } = useModal();

  const {
    transportRecordsPaginated,
    isPendingTransportRecordsPaginated,
    refetchTransportRecordsPaginated,
  } = useFetchPaginatedTransportRecords({
    ...getFilters(filters),
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sortBy: getSorting(order),
  });

  const { deleteTransportRecord, isPendingDeleteTransportRecord } =
    useDeleteTransportRecord();
  const {
    updateTransportRecordEnabled,
    isPendingUpdateTransportRecordEnabled,
  } = useUpdateTransportRecordEnabled();

  useEffect(() => {
    refetchTransportRecordsPaginated();
  }, [pagination.pageIndex, pagination.pageSize, filters, order]);

  useEffect(() => {
    setClose();
    refetchTransportRecordsPaginated();
  }, [isPendingDeleteTransportRecord, isPendingUpdateTransportRecordEnabled]);

  useEffect(() => {
    if (onCompletSubmit) {
      setOnCompletSubmit(false);
      refetchTransportRecordsPaginated();
    }
  }, [onCompletSubmit]);

  const openModalWithForm = (
    actionType: "create" | "edit" | "view",
    transportRecordId?: string
  ) => {
    setOpen(
      <CustomModal
        title={getModalTitle(actionType)}
        subheading={getModalSubheading(actionType)}
      >
        <TransportRecordForm
          actionType={actionType}
          transportRecordId={transportRecordId || undefined}
          enabled={getFilters(filters).enabled}
          onClose={() => setClose()}
          onCompletSubmit={() => setOnCompletSubmit(true)}
        />
      </CustomModal>
    );
  };

  const handleDeleteTransportRecord = async (transportRecordId: string) => {
    setOpen(
      <CustomModal
        title="Eliminar Registro"
        subheading={`¿Estás seguro de eliminar el registro "${transportRecordId}"?`}
      >
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setClose()}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            disabled={isPendingDeleteTransportRecord}
            onClick={async () => {
              deleteTransportRecord(transportRecordId);
            }}
          >
            {isPendingDeleteTransportRecord ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </CustomModal>
    );
  };

  const handleChangeEnabled = async (
    transportRecordId: string,
    enabled: boolean
  ) => {
    updateTransportRecordEnabled({ id: transportRecordId, enabled });
  };

  const openDetailsModal = (record: any) => {
    setOpen(
      <CustomModal
        title="Detalles del Registro"
        subheading={`Aquí están los detalles del registro "${record.title}".`}
      >
        <Tabs defaultValue="expenses">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="expenses">Gastos</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="packages">Paquetes</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses">
            <div className="space-y-4">
              {record.expenses?.map((expense: any) => (
                <div key={expense.id} className="flex justify-between">
                  <span>{expense.description}</span>
                  <span>${expense.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="history">
            <div className="space-y-4">
              {record.history?.map((item: any) => (
                <div key={item.id} className="flex flex-col space-y-1">
                  <span>
                    Cambio: {item.oldValue} → {item.newValue}
                  </span>
                  <span>Realizado por: {item.changedBy}</span>
                  <span>Fecha: {item.changedAt}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="packages">
            <p>No hay paquetes asociados.</p>
          </TabsContent>
        </Tabs>
      </CustomModal>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Registros de Transporte</h2>
        <Button onClick={() => openModalWithForm("create")}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Registro
        </Button>
      </div>

      <Card className="border rounded-lg">
        <CardHeader>
          <CardTitle>Lista de Registros</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          {isPendingTransportRecordsPaginated ? (
            <Loading text="Cargando registros..." />
          ) : (
            <DataTable
              columns={transportRecordColumns(
                openModalWithForm,
                handleChangeEnabled,
                handleDeleteTransportRecord,
                openDetailsModal
              )}
              data={transportRecordsPaginated?.data || []}
              searchFilter={{ label: "Id", column: "id" }}
              defaultFilter={false}
              customFilters={customFilters}
              initialOrder={[{ id: "createdAt", desc: true }]}
              totalCount={transportRecordsPaginated?.totalCount || 0}
              pagination={pagination}
              onPaginationChange={setPagination}
              onFiltersChange={(filters) => setFilters(filters)}
              onOrderChange={(order) => setOrder(order)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const getModalTitle = (type: "create" | "edit" | "view") => {
  switch (type) {
    case "create":
      return "Crear Registro de Transporte";
    case "edit":
      return "Editar Registro de Transporte";
    case "view":
      return "Detalles del Registro de Transporte";
  }
};

const getModalSubheading = (type: "create" | "edit" | "view") => {
  switch (type) {
    case "create":
      return "Llene los campos para crear un nuevo registro de transporte.";
    case "edit":
      return "Actualice los campos necesarios.";
    case "view":
      return "Aquí están los detalles del registro de transporte seleccionado.";
  }
};
