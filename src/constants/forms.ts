export type FormProps = {
  id: string;
  type: "email" | "text" | "password" | "number" | "boolean";
  inputType: "select" | "input" | "textarea" | "switch";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
};

export const SIGN_UP_FORM: FormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Nombre",
    name: "firstname",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Apellido",
    name: "lastname",
    type: "text",
  },
  {
    id: "3",
    inputType: "input",
    placeholder: "Correo electrónico",
    name: "email",
    type: "email",
  },
  {
    id: "4",
    inputType: "input",
    placeholder: "Contraseña",
    name: "password",
    type: "password",
  },
  {
    id: "5",
    inputType: "input",
    placeholder: "Nombre de usuario (opcional)",
    name: "username",
    type: "text",
  },
];

export const SIGN_IN_FORM: FormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Correo electrónico o nombre de usuario",
    name: "emailOrUsername",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Contraseña",
    name: "password",
    type: "password",
  },
];

export const COMPANY_FORM: FormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Nombre",
    name: "name",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Descripción",
    name: "description",
    type: "text",
  },
  {
    id: "3",
    inputType: "input",
    placeholder: "Dirección",
    name: "address",
    type: "text",
  },
  {
    id: "4",
    inputType: "input",
    placeholder: "Teléfono",
    name: "phone",
    type: "text",
  },
  {
    id: "5",
    inputType: "switch",
    placeholder: "Habilitada",
    name: "enabled",
    type: "boolean",
  },
];
