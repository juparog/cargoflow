import { VehicleType } from "@prisma/client";

export type FormProps = {
  id: string;
  type: "email" | "text" | "password" | "number" | "boolean";
  inputType: "select" | "input" | "textarea" | "switch" | "multi-input";
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
    label: "Nombre",
    placeholder: "Empresa de Transporte",
    name: "name",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    label: "Descripción",
    placeholder: "Empresa de transporte de carga",
    name: "description",
    type: "text",
  },
  {
    id: "3",
    inputType: "input",
    label: "Dirección",
    placeholder: "Calle 123",
    name: "address",
    type: "text",
  },
  {
    id: "4",
    inputType: "input",
    label: "Teléfono",
    placeholder: "1234567890",
    name: "phone",
    type: "text",
  },
  {
    id: "5",
    inputType: "switch",
    label: "Habilitada",
    placeholder: "Habilitado",
    name: "enabled",
    type: "boolean",
  },
];

export const VEHICLE_FORM: FormProps[] = [
  {
    id: "1",
    inputType: "input",
    label: "Nombre",
    placeholder: "NPR Euro VI",
    name: "name",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    label: "Placa",
    placeholder: "ABC-123",
    name: "licensePlate",
    type: "text",
  },
  {
    id: "3",
    inputType: "input",
    label: "Marca",
    placeholder: "Chevrolet",
    name: "brand",
    type: "text",
  },
  {
    id: "4",
    inputType: "input",
    label: "Modelo",
    placeholder: "2021",
    name: "model",
    type: "text",
  },
  {
    id: "5",
    inputType: "select",
    label: "Tipo",
    placeholder: "Carro",
    name: "type",
    type: "text",
    options: [
      { value: VehicleType.CAR, label: "Carro", id: "1" },
      { value: VehicleType.MOTORCYCLE, label: "Motocicleta", id: "2" },
      { value: VehicleType.BICYCLE, label: "Bicicleta", id: "3" },
      { value: VehicleType.TRUCK, label: "Camión", id: "4" },
      { value: VehicleType.BUS, label: "Autobús", id: "5" },
    ],
  },
  {
    id: "6",
    inputType: "input",
    label: "Imagen",
    placeholder: "https://example.com/image.jpg",
    name: "image",
    type: "text",
  },
  {
    id: "7",
    inputType: "switch",
    placeholder: "Habilitado",
    name: "enabled",
    type: "boolean",
  },
];

export const TRANSPORT_RECORD_FORM: FormProps[] = [
  {
    id: "4",
    inputType: "select",
    label: "Estado",
    placeholder: "Pendiente",
    name: "status",
    type: "text",
    options: [
      { value: "PENDING", label: "Pendiente", id: "1" },
      { value: "ONGOING", label: "En curso", id: "2" },
      { value: "COMPLETED", label: "Completado", id: "3" },
      { value: "CANCELED", label: "Cancelado", id: "4" },
    ],
  },
  {
    id: "5",
    inputType: "multi-input",
    label: "Notas",
    placeholder: "Ejemplo: Llegar temprano",
    name: "notes",
    type: "text",
  },
  {
    id: "6",
    inputType: "input",
    label: "Monto Inicial",
    placeholder: "1000",
    name: "initialAmount",
    type: "number",
  },
];
