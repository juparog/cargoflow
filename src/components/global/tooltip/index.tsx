import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  content?: string | React.ReactNode;
  children: React.ReactNode;
};

export const Tooltip = ({ content, children }: Props) => {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {content && (
          <TooltipContent className="dark:bg-secondary">
            {content}
          </TooltipContent>
        )}
      </TooltipRoot>
    </TooltipProvider>
  );
};
