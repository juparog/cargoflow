import { DataTableColumnHeader } from "@/components/global/data-table";
import { Tooltip } from "@/components/global/tooltip";
import { Button } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import {
  TransportRecord,
  TransportRecordStatusType,
  Vehicle,
  VehicleType,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Copy, Edit, Eye, MoreHorizontal, Trash, X } from "lucide-react";
import Image from "next/image";

export const vehicleColumns = (
  openModalWithForm: (
    actionType: "create" | "edit" | "view",
    vehicleId?: string
  ) => void,
  handleChangeEnabled: (vehicleId: string, enabled: boolean) => void,
  handleDeleteVehicle: (vehicleId: string, vehicleName: string) => void
): ColumnDef<Vehicle>[] => {
  return [
    {
      accessorKey: "name",
      meta: { label: "Nombre" },
      header: ({ column }) => column.columnDef.meta?.label || column.id,
      enableSorting: true,
    },
    {
      accessorKey: "licensePlate",
      meta: { label: "Placa" },
      header: ({ column }) => column.columnDef.meta?.label || column.id,
    },
    {
      accessorKey: "type",
      meta: { label: "Tipo" },
      header: ({ column }) => column.columnDef.meta?.label || column.id,
      cell: ({ row }) => {
        const vehicle = row.original;
        switch (vehicle.type) {
          case VehicleType.CAR:
            return "Carro";
          case VehicleType.MOTORCYCLE:
            return "Moto";
          case VehicleType.BICYCLE:
            return "Bicicleta";
          case VehicleType.TRUCK:
            return "Camión";
          case VehicleType.BUS:
            return "Bus";
          default:
            return "Desconocido";
        }
      },
    },
    {
      accessorKey: "enabled",
      meta: { label: "Activo" },
      header: ({ column }) => column.columnDef.meta?.label || column.id,
      cell: (row) => (
        <div className="flex items-center justify-center">
          {row.getValue() ? <Check size={16} /> : <X size={16} />}
        </div>
      ),
    },
    {
      accessorKey: "image",
      header: ({ column }) => column.columnDef.meta?.label || column.id,
      cell: (row) => (
        <Image
          src={
            row.getValue()
              ? (row.getValue() as string)
              : "https://via.placeholder.com/150"
          }
          alt="Vehicle"
          width={32}
          height={32}
          className="h-8 w-8 object-cover rounded-full"
        />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const vehicle = row.original;
        return (
          <div className="flex justify-end space-x-2 border-t pt-2 w-full">
            <Tooltip content="Ver">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openModalWithForm("view", vehicle.id)}
                className="h-8 px-2"
              >
                <Eye className="h-4 w-4 mr-1" />
              </Button>
            </Tooltip>

            <Tooltip content="Editar">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openModalWithForm("edit", vehicle.id)}
                className="h-8 px-2"
              >
                <Edit className="h-4 w-4 mr-1" />
              </Button>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menú</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(vehicle.id)}
                >
                  <Copy /> Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={() =>
                      handleChangeEnabled(vehicle.id, !vehicle.enabled)
                    }
                    className="w-full text-left"
                  >
                    {vehicle.enabled ? <X /> : <Check />}{" "}
                    {vehicle.enabled ? "Deshabilitar" : "Habilitar"}
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={() =>
                      handleDeleteVehicle(vehicle.id, vehicle.name)
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

export const transportRecordColumns = (
  openModalWithForm: (
    actionType: "create" | "edit" | "view",
    transportRecordId?: string
  ) => void,
  handleChangeEnabled: (transportRecordId: string, enabled: boolean) => void,
  handleDeleteTransportRecord: (transportRecordId: string) => void,
  openDetailsModal: (record: TransportRecord) => void
): ColumnDef<TransportRecord>[] => {
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
          className="translate-y-[2px] mr-2"
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
      accessorKey: "id",
      meta: { label: "Id" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={column.columnDef.meta?.label || column.id}
        />
      ),
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue<string>("id").slice(0, 6)}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      meta: { label: "Fecha de Creación" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={column.columnDef.meta?.label || column.id}
        />
      ),
      cell: ({ row }) => {
        const createdAt = row.getValue<string>("createdAt");
        return (
          <div>
            {new Date(createdAt).toISOString().replace("T", " ").slice(0, 19)}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      meta: { label: "Estado" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={column.columnDef.meta?.label || column.id}
        />
      ),
      cell: ({ row }) => {
        const transportRecord = row.original;
        switch (transportRecord.status) {
          case TransportRecordStatusType.PENDING:
            return (
              <Badge className="bg-yellow-500 text-black hover:bg-yellow-500">
                Pendiente
              </Badge>
            );
          case TransportRecordStatusType.ONGOING:
            return (
              <Badge className="bg-blue-500 text-white hover:bg-blue-500">
                En curso
              </Badge>
            );
          case TransportRecordStatusType.COMPLETED:
            return (
              <Badge className="bg-green-500 text-white hover:bg-green-500">
                Completado
              </Badge>
            );
          case TransportRecordStatusType.CANCELED:
            return (
              <Badge className="bg-gray-500 text-white hover:bg-gray-500">
                Cancelado
              </Badge>
            );
          default:
            return (
              <Badge className="bg-gray-700 text-white hover:bg-gray-700">
                Desconocido
              </Badge>
            );
        }
      },
    },
    {
      accessorKey: "initialAmount",
      meta: { label: "Monto Inicial" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={column.columnDef.meta?.label || column.id}
        />
      ),
      cell: ({ row }) => {
        const initialAmount = row.getValue<number>("initialAmount");
        return (
          <div className="font-medium">{formatCurrency(initialAmount)}</div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const transportRecord = row.original;
        return (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openDetailsModal(transportRecord)}
              className="h-8 px-2"
            >
              <Eye className="h-4 w-4 mr-1" />
            </Button>
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
                  onClick={() =>
                    navigator.clipboard.writeText(transportRecord.id)
                  }
                >
                  <Copy /> Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={() =>
                      openModalWithForm("view", transportRecord.id)
                    }
                    className="w-full text-left"
                  >
                    <Eye /> Ver
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={() =>
                      openModalWithForm("edit", transportRecord.id)
                    }
                    className="w-full text-left"
                  >
                    <Edit /> Editar
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={() =>
                      handleChangeEnabled(
                        transportRecord.id,
                        !transportRecord.enabled
                      )
                    }
                    className="w-full text-left"
                  >
                    {transportRecord.enabled ? <X /> : <Check />}{" "}
                    {transportRecord.enabled ? "Deshabilitar" : "Habilitar"}
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={() =>
                      handleDeleteTransportRecord(transportRecord.id)
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
