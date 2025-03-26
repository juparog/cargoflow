import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { SortAsc, SortDesc } from "lucide-react";

interface Props<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export default function DataGridSort<TData, TValue>({
  column,
  title,
  className,
}: Props<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <Select
      defaultValue="asc"
      onValueChange={(value) =>
        column.toggleSorting(value === "asc" ? false : true)
      }
      value={
        column.getIsSorted() === "asc" || !column.getIsSorted() ? "asc" : "desc"
      }
    >
      <SelectTrigger className="ml-auto hidden h-8 lg:flex">
        <span className="mr-2">{title}</span>
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="h-4 w-4" />
        ) : (
          <SortDesc className="h-4 w-4" />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">
          <SortAsc className="h-4 w-4" />
          Asc
        </SelectItem>
        <SelectItem value="desc">
          <SortDesc className="h-4 w-4" />
          Desc
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
