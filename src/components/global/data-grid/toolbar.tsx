import { Button } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { Square, SquareCheckBig, X } from "lucide-react";
import type React from "react";
import { DataTableFacetedFilter } from "../data-utils/faceted-filter";
import { DataTableRadioFilter } from "../data-utils/radio-filter";
import DataGridSort from "./sort";

export interface CustomFilter {
  column: string;
  title: string;
  type: "radio" | "select";
  options: {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

interface Props<TData> {
  table: Table<TData>;
  search?:
    | {
        column: string;
        label: string;
      }
    | false;
  defaultFilter?: boolean;
  customFilters?: CustomFilter[];
}

export const enableOptions = [
  {
    value: true,
    label: "Si",
    icon: SquareCheckBig,
  },
  {
    value: false,
    label: "No",
    icon: Square,
  },
];

export function DataGridToolbar<TData>({
  table,
  search = { column: "name", label: "Nombre" },
  defaultFilter = true,
  customFilters = [],
}: Props<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <motion.div
      className="flex flex-col sm:flex-row justify-between items-center gap-4"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay: 0.2,
          },
        },
      }}
    >
      <div className="flex flex-1 items-center space-x-2">
        {search ? (
          <Input
            placeholder={`Filtro por ${search.label}...`}
            value={
              (table.getColumn(search.column)?.getFilterValue() as string) ?? ""
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table.getColumn(search.column)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ) : (
          <div className="h-8 w-[150px] lg:w-[250px]" />
        )}

        {defaultFilter && table.getColumn("enabled") && (
          <DataTableRadioFilter
            column={table.getColumn("enabled")}
            title={
              table.getColumn("enabled")?.columnDef.meta?.label || "Habilitada"
            }
            options={enableOptions}
          />
        )}

        {customFilters.map((filter) => {
          const column = table.getColumn(filter.column);
          if (!column) return null;
          const FilterComponent =
            filter.type === "radio"
              ? DataTableRadioFilter
              : DataTableFacetedFilter;
          return (
            <FilterComponent
              key={filter.column}
              column={column}
              title={filter.title}
              options={filter.options}
            />
          );
        })}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters(true)}
            className="h-8 px-2 lg:px-3"
          >
            Limpiar
            <X />
          </Button>
        )}
      </div>

      <div className="w-full sm:w-auto flex flex-row items-center">
        <div className="w-full sm:w-auto flex flex-row items-center gap-4">
          {table.getAllColumns().map((column) => {
            if (column.columnDef.enableSorting) {
              return (
                <DataGridSort
                  key={column.id}
                  column={column}
                  title={column.columnDef.meta?.label || ""}
                />
              );
            }
          })}
        </div>
      </div>
    </motion.div>
  );
}
