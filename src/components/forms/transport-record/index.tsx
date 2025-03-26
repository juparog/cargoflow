"use client";
import { FormGenerator } from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CONSTANTS } from "@/constants";
import {
  useCreateTransportRecord,
  useFetchTransportRecordById,
  useUpdateTransportRecord,
} from "@/hooks/use-transport-record";
import { useFetchTransportRoutes } from "@/hooks/use-transport-route";
import { useFetchUsers } from "@/hooks/use-user";
import { useFetchVehicles } from "@/hooks/use-vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TransportRecordSchema } from "./schema";

interface Props {
  actionType: "create" | "edit" | "view";
  transportRecordId?: string;
  enabled?: boolean;
  onClose: () => void;
  onCompletSubmit?: () => void;
}

const TransportRecordForm = ({
  actionType,
  transportRecordId,
  enabled,
  onClose,
  onCompletSubmit,
}: Props) => {
  const { transportRecord } = useFetchTransportRecordById(
    transportRecordId || "",
    enabled
  );
  const { createTransportRecord, isPendingCreateTransportRecord } =
    useCreateTransportRecord();
  const { updateTransportRecord, isPendingUpdateTransportRecord } =
    useUpdateTransportRecord();
  const { transportRoutes, isPendingTransportRoutes } =
    useFetchTransportRoutes();
  const { vehicles, isPendingVehicles } = useFetchVehicles();
  const { users, isPendingUsers } = useFetchUsers();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TransportRecordSchema),
    defaultValues: {
      routeId: transportRecord?.routeId || "",
      vehicleId: transportRecord?.vehicleId || "",
      driverId: transportRecord?.driverId || "",
      status: transportRecord?.status || "PENDING",
      notes: transportRecord?.notes || [],
      initialAmount: transportRecord?.initialAmount || 0,
    },
  });

  useEffect(() => {
    if (onCompletSubmit && !isPendingCreateTransportRecord) {
      onCompletSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingCreateTransportRecord]);

  useEffect(() => {
    if (onCompletSubmit && !isPendingUpdateTransportRecord) {
      onCompletSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingUpdateTransportRecord]);

  const onSubmit = (data: TransportRecordSchema) => {
    if (actionType === "create") {
      createTransportRecord(data);
    } else if (actionType === "edit" && transportRecord?.id) {
      updateTransportRecord({
        id: transportRecord.id,
        data,
      });
    }
    onClose();
  };

  const readOnly = actionType === "view";

  const GeneralFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(300px,_1fr)_minmax(300px,_1fr)] gap-6">
      <div className="space-y-4">
        <div>
          <Label>Ruta</Label>
          {isPendingTransportRoutes ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Combobox
              options={
                transportRoutes?.map((route) => ({
                  label: route.name,
                  value: route.id,
                })) || []
              }
              placeholder="Buscar ruta por nombre"
              onChange={(value) => setValue("routeId", value)}
              disabled={readOnly}
            />
          )}
          {errors.routeId && (
            <p className="text-red-500 text-sm">{errors.routeId.message}</p>
          )}
        </div>

        <div>
          <Label>Vehículo</Label>
          {isPendingVehicles ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Combobox
              options={
                vehicles?.map((vehicle) => ({
                  label: `${vehicle.brand} ${vehicle.model} (${vehicle.licensePlate})`,
                  value: vehicle.id,
                })) || []
              }
              placeholder="Buscar vehículo por marca o placa"
              onChange={(value) => setValue("vehicleId", value)}
              disabled={readOnly}
            />
          )}
          {errors.vehicleId && (
            <p className="text-red-500 text-sm">{errors.vehicleId.message}</p>
          )}
        </div>

        <div>
          <Label>Conductor</Label>
          {isPendingUsers ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Combobox
              options={
                users?.map((user) => ({
                  label: `${user.firstname} ${user.lastname}`,
                  value: user.id,
                })) || []
              }
              placeholder="Buscar conductor por nombre"
              onChange={(value) => setValue("driverId", value)}
              disabled={readOnly}
            />
          )}
          {errors.driverId && (
            <p className="text-red-500 text-sm">{errors.driverId.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4 mt-1">
        {CONSTANTS.transportRecordForm.map((field) => (
          <FormGenerator
            {...field}
            key={field.id}
            disabled={readOnly}
            register={register}
            watch={watch}
            errors={errors}
          />
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {actionType === "create" ? (
        GeneralFields()
      ) : (
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="movements">Movimientos</TabsTrigger>
            <TabsTrigger value="packages">Paquetes</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="min-h-[216px]">
            {GeneralFields()}
          </TabsContent>

          <TabsContent value="movements" className="min-h-[216px]">
            <div className="space-y-4">
              {transportRecord?.movements?.map((movement, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <p>{movement.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="packages" className="min-h-[216px]">
            <div className="space-y-4">
              {transportRecord?.packages?.map((pkg, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <p>{pkg.name}</p>
                  <p>{pkg.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="min-h-[216px]">
            <div className="space-y-4">
              {transportRecord?.histories?.map((history, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <p>{history.action}</p>
                  <p>{new Date(history.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          {readOnly ? "Cerrar" : "Cancelar"}
        </Button>
        {actionType !== "view" && (
          <Button
            type="submit"
            disabled={
              Object.keys(errors).length > 0 ||
              (actionType === "create"
                ? isPendingCreateTransportRecord
                : isPendingUpdateTransportRecord)
            }
          >
            {actionType === "create"
              ? isPendingCreateTransportRecord
                ? "Creando..."
                : "Crear"
              : isPendingUpdateTransportRecord
              ? "Actualizando..."
              : "Actualizar"}
          </Button>
        )}
      </DialogFooter>
    </form>
  );
};

export default TransportRecordForm;
