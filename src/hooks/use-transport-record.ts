import {
  FindTransportRecordsPaginatedOptions,
  onCreateTransportRecord,
  onDeleteTransportRecord,
  onGetTransportRecordById,
  onGetTransportRecords,
  onGetTransportRecordsPaginated,
  onUpdateTransportRecord,
} from "@/actions/transport-records";
import { Prisma, TransportRecord } from "@prisma/client";
import { useMutationData } from "./use-mutation";
import { useQueryData } from "./use-query";

export const useFetchTransportRecords = () => {
  const { data: transportRecords, isPending: isPendingTransportRecords } =
    useQueryData<Prisma.PromiseReturnType<typeof onGetTransportRecords>>(
      ["TransportRecords"],
      () => onGetTransportRecords()
    );

  return { transportRecords, isPendingTransportRecords };
};

export const useFetchPaginatedTransportRecords = (
  options?: FindTransportRecordsPaginatedOptions
) => {
  const {
    data: transportRecordsPaginated,
    isPending: isPendingTransportRecordsPaginated,
    refetch: refetchTransportRecordsPaginated,
  } = useQueryData<
    Prisma.PromiseReturnType<typeof onGetTransportRecordsPaginated>
  >(["TransportRecordsPaginated"], () =>
    onGetTransportRecordsPaginated(options)
  );

  return {
    transportRecordsPaginated,
    isPendingTransportRecordsPaginated,
    refetchTransportRecordsPaginated,
  };
};

export const useCreateTransportRecord = () => {
  const {
    mutate: createTransportRecord,
    isPending: isPendingCreateTransportRecord,
  } = useMutationData(
    ["CreateTransportRecord"],
    async (data: Prisma.TransportRecordCreateInput) => {
      try {
        const created = await onCreateTransportRecord(data);
        return created
          ? { status: 200, data: "Registro de transporte creado correctamente" }
          : { status: 400, data: "Error al crear el registro de transporte" };
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
    ["TransportRecords", "TransportRecordsPaginated"]
  );

  return { createTransportRecord, isPendingCreateTransportRecord };
};

export const useFetchTransportRecordById = (id: string, enabled?: boolean) => {
  const { data: transportRecord, isPending: isPendingTransportRecord } =
    useQueryData<TransportRecord | null>(["TransportRecord", id], () => {
      if (!id) {
        return { transportRecords: null, isPendingTransportRecords: false };
      }
      return onGetTransportRecordById(id, { filters: { enabled } });
    });

  return {
    transportRecord,
    isPendingTransportRecord,
  };
};

export const useUpdateTransportRecord = () => {
  const {
    mutate: updateTransportRecord,
    isPending: isPendingUpdateTransportRecord,
  } = useMutationData(
    ["UpdateTransportRecord"],
    async (args: { id: string; data: Prisma.TransportRecordUpdateInput }) => {
      try {
        const updated = await onUpdateTransportRecord(args.id, args.data);
        return updated
          ? {
              status: 200,
              data: "Registro de transporte actualizado correctamente",
            }
          : {
              status: 400,
              data: "Error al actualizar el registro de transporte",
            };
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
    ["TransportRecords", "TransportRecordsPaginated"]
  );

  return { updateTransportRecord, isPendingUpdateTransportRecord };
};

export const useUpdateTransportRecordEnabled = () => {
  const {
    mutate: updateTransportRecordEnabled,
    isPending: isPendingUpdateTransportRecordEnabled,
  } = useMutationData(
    ["UpdateTransportRecordEnabled"],
    async (args: { id: string; enabled: boolean }) => {
      try {
        const updated = await onUpdateTransportRecord(args.id, {
          enabled: args.enabled,
        });
        return updated
          ? {
              status: 200,
              data: `Registro de transporte ${
                args.enabled ? "activado" : "desactivado"
              } correctamente`,
            }
          : {
              status: 400,
              data: "Error al actualizar el registro de transporte",
            };
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
    ["TransportRecords", "TransportRecordsPaginated"]
  );

  return {
    updateTransportRecordEnabled,
    isPendingUpdateTransportRecordEnabled,
  };
};

export const useDeleteTransportRecord = () => {
  const {
    mutate: deleteTransportRecord,
    isPending: isPendingDeleteTransportRecord,
  } = useMutationData(
    ["DeleteTransportRecord"],
    async (id: string) => {
      try {
        const deleted = await onDeleteTransportRecord(id);
        return deleted
          ? {
              status: 200,
              data: "Registro de transporte eliminado correctamente",
            }
          : { status: 400, data: "Error al eliminar el registrode transporte" };
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
    ["TransportRecords", "TransportRecordsPaginated"]
  );

  return { deleteTransportRecord, isPendingDeleteTransportRecord };
};
