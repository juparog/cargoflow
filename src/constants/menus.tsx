import { Home } from "@/icons";
import { Factory, FileText, Package, Truck } from "lucide-react";
import { JSX } from "react";

export type MenuProps = {
  id: number;
  label: string;
  icon: JSX.Element;
  path: string;
  section?: boolean;
  integration?: boolean;
};

export type GroupMenuProps = {
  id: number;
  label: string;
  icon: JSX.Element;
  path: string;
};

export const DASHBOARD_PAGE_MENU: MenuProps[] = [
  {
    id: 0,
    label: "Inicio",
    icon: <Home />,
    path: "/dashboard",
    section: true,
  },
  {
    id: 1,
    label: "Transporte",
    icon: <Truck />,
    path: "/dashboard/transport",
  },
  {
    id: 2,
    label: "Paquetes",
    icon: <Package />,
    path: "/dashboard/packages",
  },
  {
    id: 3,
    label: "Empresas",
    icon: <Factory />,
    path: "/dashboard/companies",
  },
  {
    id: 4,
    label: "Reportes",
    icon: <FileText />,
    path: "/dashboard/reports",
  },
];
