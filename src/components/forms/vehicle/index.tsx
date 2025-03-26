import { FormGenerator } from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { CONSTANTS } from "@/constants";
import {
  useCreateVehicle,
  useFetchVehicleById,
  useUpdateVehicle,
} from "@/hooks/use-vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { VehicleSchema } from "./schema";

interface Props {
  actionType: "create" | "edit" | "view";
  vehicleId: string;
  enabled?: boolean;
  onClose: () => void;
  onCompletSubmit?: () => void;
}

const VehicleForm = ({
  actionType,
  vehicleId,
  enabled,
  onCompletSubmit,
  onClose,
}: Props) => {
  const { vehicle } = useFetchVehicleById(vehicleId, enabled);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(VehicleSchema),
    values: {
      name: vehicle?.name || "",
      licensePlate: vehicle?.licensePlate || "",
      brand: vehicle?.brand || "",
      model: vehicle?.model || "",
      type: vehicle?.type || "car",
      image: vehicle?.image || "",
      enabled: vehicle?.enabled || true,
    },
  });

  const { createVehicle, isPendingCreateVehicle } = useCreateVehicle();
  const { updateVehicle, isPendingUpdateVehicle } = useUpdateVehicle();

  useEffect(() => {
    if (onCompletSubmit && !isPendingCreateVehicle) {
      onCompletSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingCreateVehicle]);

  useEffect(() => {
    if (onCompletSubmit && !isPendingUpdateVehicle) {
      onCompletSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingUpdateVehicle]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    if (actionType === "create") {
      createVehicle(data);
    } else if (actionType === "edit" && vehicle?.id) {
      updateVehicle({ id: vehicle.id, data });
    }
    onClose();
  };

  const readOnly = actionType === "view";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {CONSTANTS.vehicleForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          disabled={readOnly}
          register={register}
          watch={watch}
          errors={errors}
        />
      ))}

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
                ? isPendingCreateVehicle
                : isPendingUpdateVehicle)
            }
          >
            {actionType === "create"
              ? isPendingCreateVehicle
                ? "Creando..."
                : "Crear"
              : isPendingUpdateVehicle
              ? "Actualizando..."
              : "Actualizar"}
          </Button>
        )}
      </DialogFooter>
    </form>
  );
};

export default VehicleForm;
