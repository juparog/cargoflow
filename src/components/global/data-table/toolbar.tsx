"use client";

import { Button, Input } from "@/components/ui";
import { Table } from "@tanstack/react-table";
import { Square, SquareCheckBig, X } from "lucide-react";
import { DataTableFacetedFilter } from "./faceted-filter";
import { DataTableRadioFilter } from "./radio-filter";
import { DataTableViewOptions } from "./view-options";

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
  filterKey?: {
    column: string;
    label: string;
  };
  enableDefaultFilter?: boolean;
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

export function DataTableToolbar<TData>({
  table,
  filterKey = { column: "name", label: "Nombre" },
  enableDefaultFilter = true,
  customFilters = [],
}: Props<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterKey && (
          <Input
            placeholder={`Filtro por ${filterKey.label}...`}
            value={
              (table.getColumn(filterKey.column)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table
                .getColumn(filterKey.column)
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}

        {enableDefaultFilter && table.getColumn("enabled") && (
          <DataTableRadioFilter
            column={table.getColumn("enabled")}
            title="Habilitada"
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
      <DataTableViewOptions table={table} />
    </div>
  );
}
