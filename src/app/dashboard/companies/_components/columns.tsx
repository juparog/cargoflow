import { DataTableColumnHeader } from "@/components/global/data-table";
import { Tooltip } from "@/components/global/tooltip";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Company } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Copy, Edit, Eye, MoreHorizontal, Trash, X } from "lucide-react";

export const companyColumns = (
  openModalWithForm: (
    actionType: "create" | "edit" | "view",
    companyId?: string
  ) => void,
  handleChangeEnabled: (companyId: string, enabled: boolean) => void,
  handleDeleteCompany: (companyId: string, companyName: string) => void
): ColumnDef<Company>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      meta: { label: "Nombre" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={column.columnDef.meta?.label || column.id}
        />
      ),
    },
    {
      accessorKey: "description",
      meta: { label: "Descripción" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={column.columnDef.meta?.label || column.id}
        />
      ),
    },
    {
      accessorKey: "address",
      meta: { label: "Dirección" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={column.columnDef.meta?.label || column.id}
        />
      ),
    },
    {
      accessorKey: "phone",
      meta: { label: "Teléfono" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={column.columnDef.meta?.label || column.id}
        />
      ),
    },
    {
      accessorKey: "enabled",
      meta: { label: "Habilitada" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={column.columnDef.meta?.label || column.id}
        />
      ),
      cell: (row) => (
        <div className="flex items-center justify-center">
          {row.getValue() ? <Check size={16} /> : <X size={16} />}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <Tooltip content="Más acciones">
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(company.id)}
                >
                  <Copy /> Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={() => openModalWithForm("view", company.id)}
                    className="w-full text-left"
                  >
                    <Eye /> Ver
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={() => openModalWithForm("edit", company.id)}
                    className="w-full text-left"
                  >
                    <Edit /> Editar
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={() =>
                      handleChangeEnabled(company.id, !company.enabled)
                    }
                    className="w-full text-left"
                  >
                    {company.enabled ? <X /> : <Check />}{" "}
                    {company.enabled ? "Deshabilitar" : "Habilitar"}
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={() =>
                      handleDeleteCompany(company.id, company.name)
                    }
                    className="w-full text-left text-red-500"
                  >
                    <Trash /> Eliminar
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
