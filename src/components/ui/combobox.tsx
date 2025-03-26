"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "./popover";
import { ScrollArea } from "./scroll-area";

interface Props {
  options: {
    label: string;
    value: string;
  }[];
  placeholder: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function Combobox({ options, placeholder, onChange, disabled }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between truncate"
          disabled={disabled}
        >
          <span className="truncate">
            {value
              ? options.find((option) => option.value === value)?.label ||
                placeholder
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          className="p-0"
          side="bottom"
          align="start"
          style={{ pointerEvents: "auto" }}
        >
          <Command>
            <CommandInput
              placeholder={placeholder}
              className="h-9 pointer-events-auto"
              disabled={disabled}
            />
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <ScrollArea className="h-40 rounded-md border">
                  {options?.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        setValue(option.value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span>{option.label}</span>
                    </CommandItem>
                  ))}{" "}
                </ScrollArea>{" "}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
