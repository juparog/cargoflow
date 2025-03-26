"use client";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Check } from "lucide-react";
import * as React from "react";

interface Props {
  options: {
    label: string;
    value: string;
  }[];
  placeholder: string;
  onChange: (value: string) => void;
}

export function ComboboxModal({ options, placeholder, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  // Actualizar el valor externo cuando cambia el estado interno
  React.useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between"
        onClick={() => setOpen(true)}
      >
        {value
          ? options.find((option) => option.value === value)?.label ||
            placeholder
          : placeholder}
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle>{""}</DialogTitle>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  setValue(option.value);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
