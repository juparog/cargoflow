import { FormGenerator } from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { CONSTANTS } from "@/constants";
import {
  useCreateCompany,
  useFetchCompanyById,
  useUpdateCompany,
} from "@/hooks/use-company";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CompanySchema } from "./schema";

interface CompanyFormProps {
  actionType: "create" | "edit" | "view";
  companyId?: string;
  enabled?: boolean;
  onClose: () => void;
  onCompletSubmit?: () => void;
}

const CompanyForm = ({
  actionType,
  companyId,
  enabled,
  onCompletSubmit,
  onClose,
}: CompanyFormProps) => {
  const { company } = useFetchCompanyById(companyId || "", enabled);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CompanySchema),
    values: {
      name: company?.name || "",
      description: company?.description || "",
      address: company?.address || "",
      phone: company?.phone || "",
      enabled: company?.enabled ?? true,
    },
  });

  const { createCompany, isPendingCreateCompany } = useCreateCompany();
  const { updateCompany, isPendingUpdateCompany } = useUpdateCompany();

  useEffect(() => {
    if (onCompletSubmit && !isPendingCreateCompany) {
      onCompletSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingCreateCompany]);

  useEffect(() => {
    if (onCompletSubmit && !isPendingUpdateCompany) {
      onCompletSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingUpdateCompany]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    if (actionType === "create") {
      createCompany(data);
    } else if (actionType === "edit" && company?.id) {
      updateCompany({ id: company.id, data });
    }
    onClose();
  };

  const readOnly = actionType === "view";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Campos del formulario */}
      {CONSTANTS.companyForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          disabled={readOnly}
          register={register}
          watch={watch}
          errors={errors}
        />
      ))}

      {/* Footer del Modal */}
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
                ? isPendingCreateCompany
                : isPendingUpdateCompany)
            }
          >
            {actionType === "create"
              ? isPendingCreateCompany
                ? "Creando..."
                : "Crear"
              : isPendingUpdateCompany
              ? "Actualizando..."
              : "Actualizar"}
          </Button>
        )}
      </DialogFooter>
    </form>
  );
};

export default CompanyForm;
