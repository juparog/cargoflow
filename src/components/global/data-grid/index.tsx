"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ColumnDef,
  ColumnFiltersState,
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
} from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DataGridPagination } from "../data-utils/grid-pagination";
import { DataGridItem } from "./item-grid";
import { CustomFilter, DataGridToolbar } from "./toolbar";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  pagination: PaginationState;
  isLoadingItems: boolean;
  defaultFilter?: boolean;
  customFilters?: CustomFilter[];
  initialFilters?: ColumnFiltersState;
  onPaginationChange: OnChangeFn<PaginationState>;
  onFiltersChange?: OnChangeFn<ColumnFiltersState>;
  onOrderChange?: OnChangeFn<SortingState>;
}

export const DataGrid = <TData, TValue>({
  columns,
  data,
  totalCount,
  pagination,
  isLoadingItems,
  defaultFilter = true,
  customFilters = [],
  initialFilters = [],
  onPaginationChange: setPagination,
  onFiltersChange: setFilters,
  onOrderChange: setOrdered,
}: Props<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
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
  });

  const itemsPerPage = table.getState().pagination.pageSize;

  return (
    <div className="space-y-6">
      <DataGridToolbar
        table={table}
        defaultFilter={defaultFilter}
        customFilters={customFilters}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={isLoadingItems ? "loading" : "loaded"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: "1rem" }}
        >
          {isLoadingItems ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {[...Array(itemsPerPage)].map((_, index) => (
                <Card
                  key={index}
                  className="flex flex-col h-full min-h-[250px] overflow-hidden"
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : table.getRowModel().rows?.length ? (
            <DataGridItem rows={table.getRowModel().rows} />
          ) : (
            <div className="text-muted-foreground text-center">Sin datos</div>
          )}
        </motion.div>
      </AnimatePresence>
      <DataGridPagination table={table} totalCount={totalCount} />
    </div>
  );
};
