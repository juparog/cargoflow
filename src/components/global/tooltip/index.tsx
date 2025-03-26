import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Props = {
  content?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export const Tooltip = ({ content, children, className }: Props) => {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {content && (
          <TooltipContent className={cn("dark:bg-secondary", className)}>
            {content}
          </TooltipContent>
        )}
      </TooltipRoot>
    </TooltipProvider>
  );
};
