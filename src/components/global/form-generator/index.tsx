/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Label, Textarea } from "@/components/ui";
import { Switch } from "@/components/ui/switch";
import { ErrorMessage } from "@hookform/error-message";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type FormGeneratorProps = {
  type?: "text" | "email" | "password" | "number" | "boolean";
  inputType: "select" | "input" | "textarea" | "switch";
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
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && label}
          <Input
            id={`input-${label || name}`}
            type={type}
            placeholder={placeholder}
            className="bg-themeBlack border-themeGray text-themeTextGray"
            disabled={disabled}
            {...register(name)}
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
      );
    case "select":
      return (
        <Label htmlFor={`select-${label}`} className="flex flex-col gap-2">
          {label && label}
          <select
            id={`select-${label}`}
            className="w-full bg-transparent border-[1px] p-3 rounded-lg"
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
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && label}
          <Textarea
            className="bg-themeBlack border-themeGray text-themeTextGray"
            id={`input-${label}`}
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
      const switchValue = watch ? watch(name) : false;
      return (
        <div className="flex items-center space-x-2">
          <Switch
            id={`switch-${label}`}
            checked={switchValue}
            disabled={disabled}
            ref={registerSwitch.ref}
            onCheckedChange={(checked) => {
              registerSwitch.onChange({ target: { value: checked, name } });
            }}
          />
          <Label htmlFor={`switch-${label}`}>{placeholder}</Label>
        </div>
      );
    default:
      return <></>;
  }
};
