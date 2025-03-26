import {
  FindVehiclesPaginatedOptions,
  onCreateVehicle,
  onDeleteVehicle,
  onGetVehicleById,
  onGetVehicleCategories,
  onGetVehicles,
  onGetVehiclesPaginated,
  onUpdateVehicle,
} from "@/actions/vehicles";
import { Prisma, Vehicle } from "@prisma/client";
import { useMutationData } from "./use-mutation";
import { useQueryData } from "./use-query";

export const useFetchVehicles = () => {
  const { data: vehicles, isPending: isPendingVehicles } = useQueryData<
    Prisma.PromiseReturnType<typeof onGetVehicles>
  >(["Vehicles"], () => onGetVehicles());

  return { vehicles, isPendingVehicles };
};

export const useFetchPaginatedVehicles = (
  options?: FindVehiclesPaginatedOptions
) => {
  const {
    data: vehiclesPaginated,
    isPending: isPendingVehiclesPaginated,
    refetch: refetchVehiclesPaginated,
  } = useQueryData<Prisma.PromiseReturnType<typeof onGetVehiclesPaginated>>(
    ["VehiclesPaginated"],
    () => onGetVehiclesPaginated(options)
  );

  return {
    vehiclesPaginated,
    isPendingVehiclesPaginated,
    refetchVehiclesPaginated,
  };
};

export const useFetchVehicleCategories = () => {
  const {
    data: vehicleCategories,
    isPending: isPendingVehicleCategories,
    refetch: refetchVehicleCategories,
  } = useQueryData<Prisma.PromiseReturnType<typeof onGetVehicleCategories>>(
    ["VehicleCategories"],
    onGetVehicleCategories
  );

  return {
    vehicleCategories,
    isPendingVehicleCategories,
    refetchVehicleCategories,
  };
};

export const useFetchVehicleById = (id: string, enabled?: boolean) => {
  const { data: vehicle, isPending: isPendingVehicle } =
    useQueryData<Vehicle | null>(["vehicle", id], () => {
      if (!id) {
        return { vehicle: null, isPendingVehicle: false };
      }
      return onGetVehicleById(id, { filters: { enabled } });
    });

  return {
    vehicle,
    isPendingVehicle,
  };
};

export const useCreateVehicle = () => {
  const { mutate: createVehicle, isPending: isPendingCreateVehicle } =
    useMutationData(
      ["createVehicle"],
      async (data: Prisma.VehicleCreateInput) => {
        try {
          const created = await onCreateVehicle(data);
          return created
            ? { status: 200, data: "Vehiculo creado correctamente" }
            : { status: 400, data: "Error al crear el vehiculo" };
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
      ["Vehicles", "VehiclesPaginated"]
    );

  return { createVehicle, isPendingCreateVehicle };
};

export const useUpdateVehicle = () => {
  const { mutate: updateVehicle, isPending: isPendingUpdateVehicle } =
    useMutationData(
      ["updateVehicle"],
      async (args: { id: string; data: Prisma.VehicleUpdateInput }) => {
        try {
          const updated = await onUpdateVehicle(args.id, args.data);
          return updated
            ? { status: 200, data: "Vehiculo actualizado correctamente" }
            : { status: 400, data: "Error al actualizar el vehiculo" };
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
      ["Vehicles", "VehiclesPaginated"]
    );

  return { updateVehicle, isPendingUpdateVehicle };
};

export const useUpdateVehicleEnabled = () => {
  const {
    mutate: updateVehicleEnabled,
    isPending: isPendingUpdateVehicleEnabled,
  } = useMutationData(
    ["updateVehicleEnabled"],
    async (args: { id: string; enabled: boolean }) => {
      try {
        const updated = await onUpdateVehicle(args.id, {
          enabled: args.enabled,
        });
        return updated
          ? {
              status: 200,
              data: `Vehiculo ${
                args.enabled ? "activado" : "desactivado"
              } correctamente`,
            }
          : { status: 400, data: "Error al actualizar el vehiculo" };
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
    ["Vehicles", "VehiclesPaginated"]
  );

  return { updateVehicleEnabled, isPendingUpdateVehicleEnabled };
};

export const useDeleteVehicle = () => {
  const { mutate: deleteVehicle, isPending: isPendingDeleteVehicle } =
    useMutationData(
      ["deleteVehicle"],
      async (id: string) => {
        try {
          const deleted = await onDeleteVehicle(id);
          return deleted
            ? { status: 200, data: "Vehiculo eliminado correctamente" }
            : { status: 400, data: "Error al eliminar el vehiculo" };
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
      ["Vehicles", "VehiclesPaginated"]
    );

  return { deleteVehicle, isPendingDeleteVehicle };
};
