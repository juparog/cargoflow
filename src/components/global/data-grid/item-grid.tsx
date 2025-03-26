import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { flexRender, Row } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";

interface Props<TData> {
  rows: Row<TData>[];
}

export function DataGridItem<TData>({ rows }: Props<TData>) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence initial={false}>
        {rows.map((row) => (
          <motion.div
            key={row.id}
            layout
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {flexRender(
                    row.getVisibleCells()[0].column.columnDef.cell,
                    row.getVisibleCells()[0].getContext()
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {row
                  .getVisibleCells()
                  .slice(1)
                  .map((cell) => {
                    const hasLabel = !!cell.column.columnDef.meta?.label;

                    return (
                      <div
                        key={cell.id}
                        className={`flex items-center ${
                          hasLabel ? "justify-between" : "justify-end"
                        }`}
                      >
                        {hasLabel && (
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {cell.column.columnDef.meta?.label}
                          </span>
                        )}
                        <span
                          className={`text-sm font-semibold ${
                            hasLabel
                              ? "text-gray-800 dark:text-gray-200"
                              : "text-right truncate grow justify-items-end"
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
