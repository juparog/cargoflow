import { Button } from "@/components/ui";
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

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalCount: number;
}

export function DataGridPagination<TData>({
  table,
  totalCount,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Elementos por página:</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {CONSTANTS.itemPerPageOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Pagina {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir a la primera página</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir a la página anterior</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir a la página siguiente</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir a la última página</span>
              <ChevronsRight />
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
        {table.getRowCount() +
          table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize}{" "}
        de {totalCount} elemento(s)
      </div>
    </div>
  );
}
