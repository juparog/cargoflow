/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Switch } from "@/components/ui/switch";
import { ErrorMessage } from "@hookform/error-message";
import { PlusCircle, Trash } from "lucide-react";
import { useRef } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { Tooltip } from "../tooltip";

type FormGeneratorProps = {
  type?: "text" | "email" | "password" | "number" | "boolean";
  inputType: "select" | "input" | "textarea" | "switch" | "multi-input";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  watch?: UseFormWatch<any>;
  errors: FieldErrors<FieldValues>;
  lines?: number;
  value?: string;
  disabled?: boolean;
};

export const FormGenerator = ({
  inputType,
  options,
  label,
  placeholder,
  register,
  watch,
  name,
  errors,
  type,
  lines,
  disabled,
}: FormGeneratorProps) => {
  switch (inputType) {
    case "input":
      return (
        <div className="flex flex-col gap-2">
          <Label className="flex flex-col gap-1" htmlFor={`input-${name}`}>
            {label && label}
            <Input
              id={`input-${name}`}
              type={type}
              placeholder={placeholder}
              className="bg-themeBlack border-themeGray text-themeTextGray"
              disabled={disabled}
              {...register(name, {
                setValueAs: (value) => {
                  if (type === "number") {
                    return value ? parseFloat(value) : null;
                  }
                  if (type === "boolean") {
                    return value === "true" || value === true;
                  }
                  return value || "";
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="text-red-400 mt-2">
                  {message === "Required" ? "Campo requerido" : message}
                </p>
              )}
            />
          </Label>
        </div>
      );
    case "select":
      return (
        <Label className="flex flex-col gap-1" htmlFor={`input-${name}`}>
          {label && label}
          <select
            id={`select-${name}`}
            className="w-full bg-transparent border-[1px] px-[16px] py-[8px] rounded-lg"
            disabled={disabled}
            {...register(name)}
          >
            {options?.length &&
              options.map((option) => (
                <option
                  value={option.value}
                  key={option.id}
                  className="dark:bg-muted"
                >
                  {option.label}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "textarea":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${name}`}>
          {label && label}
          <Textarea
            className="bg-themeBlack border-themeGray text-themeTextGray"
            id={`input-${name}`}
            placeholder={placeholder}
            disabled={disabled}
            rows={lines}
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "switch":
      const registerSwitch = register(name);
      const switchValue = watch ? watch(name, false) : false;
      return (
        <div className="flex items-center space-x-2">
          <Switch
            id={`switch-${name}`}
            checked={switchValue}
            disabled={disabled}
            ref={registerSwitch.ref}
            onCheckedChange={(checked) => {
              registerSwitch.onChange({ target: { value: checked, name } });
            }}
          />
          <Label htmlFor={`switch-${name}`}>{label && label}</Label>
        </div>
      );
    case "multi-input":
      const inputs = watch ? watch(name, []) : [];
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const newInputRef = useRef<HTMLInputElement>(null);

      const handleAddNote = () => {
        const newNote = newInputRef.current?.value.trim();
        if (!newNote) return;

        register(name).onChange({
          target: { name, value: [...inputs, newNote] },
        });

        if (newInputRef.current) newInputRef.current.value = "";
      };

      const handleRemoveNote = (index: number) => {
        register(name).onChange({
          target: {
            name,
            value: inputs.filter((_: any, i: number) => i !== index),
          },
        });
      };

      return (
        <div className="flex flex-col gap-2">
          <Label className="flex flex-col gap-1 mt-1" htmlFor={`input-${name}`}>
            {label && label}
            <div className="flex space-x-2">
              <Input
                id={`input-${name}`}
                ref={newInputRef}
                placeholder={placeholder}
                className="bg-themeBlack border-themeGray text-themeTextGray"
              />
              <Button type="button" onClick={handleAddNote}>
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 space-y-1">
              {inputs.map((note: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 dark:text-gray-300 px-2 rounded border border-dashed"
                >
                  <Tooltip content={<div className="w-40">{note}</div>}>
                    <span className="text-sm truncate">{note}</span>
                  </Tooltip>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveNote(index)}
                    className="hover:bg-transparent text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="text-red-400 mt-2">
                  {message || "Campo requerido"}
                </p>
              )}
            />
          </Label>
        </div>
      );
    default:
      return <></>;
  }
};
