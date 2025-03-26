import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { CONSTANTS } from "../../../constants/index";

interface Props<TData> {
  table: Table<TData>;
  totalCount: number;
}

export function DataTablePagination<TData>({
  table,
  totalCount,
}: Props<TData>) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s)
        </div>

        <div className="flex flex-wrap items-center justify-end space-x-2 lg:space-x-4">
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-sm font-medium hidden lg:block">
              Filas por página:
            </p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {CONSTANTS.rowPerPageOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center text-sm font-medium mt-2">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir a la primera página</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir a la página anterior</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir a la página siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir a la última página</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground text-center">
        Mostrando del{" "}
        {table.getState().pagination.pageSize *
          table.getState().pagination.pageIndex +
          1}{" "}
        al{" "}
        {Math.min(
          table.getRowCount(),
          (table.getState().pagination.pageIndex + 1) *
            table.getState().pagination.pageSize
        )}{" "}
        de {totalCount} fila(s)
      </div>
    </div>
  );
}
