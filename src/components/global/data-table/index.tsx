"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTablePagination } from "../data-utils/table-pagination";
import { CustomFilter, DataTableToolbar } from "./toolbar";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  pagination: PaginationState;
  searchFilter?: {
    column: string;
    label: string;
  };
  defaultFilter?: boolean;
  customFilters?: CustomFilter[];
  initialFilters?: ColumnFiltersState;
  initialOrder?: SortingState;
  onPaginationChange: OnChangeFn<PaginationState>;
  onFiltersChange?: OnChangeFn<ColumnFiltersState>;
  onOrderChange?: OnChangeFn<SortingState>;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  totalCount,
  pagination,
  searchFilter,
  defaultFilter = true,
  customFilters = [],
  initialFilters = [],
  initialOrder = [],
  onPaginationChange: setPagination,
  onFiltersChange: setFilters,
  onOrderChange: setOrdered,
}: Props<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>(initialOrder);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialFilters);

  useEffect(() => {
    if (setFilters) {
      setFilters(columnFilters);
    }
  }, [columnFilters, setFilters]);

  useEffect(() => {
    if (setOrdered) {
      setOrdered(sorting);
    }
  }, [sorting, setOrdered]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnVisibility,
      columnFilters,
    },
    manualPagination: true,
    enableRowSelection: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        search={searchFilter}
        customFilters={customFilters}
        defaultFilter={defaultFilter}
      />
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin datos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} totalCount={totalCount} />
    </div>
  );
};

export { DataTableColumnHeader } from "./column-header";
export { type CustomFilter } from "./toolbar";
