import { PaginationState } from "@tanstack/react-table";
import {
  COMPANY_FORM,
  FormProps,
  SIGN_IN_FORM,
  SIGN_UP_FORM,
  TRANSPORT_RECORD_FORM,
  VEHICLE_FORM,
} from "./forms";
import { ITEMS_PER_PAGE_OPTIONS, PAGINATED_GRID } from "./items";
import { DASHBOARD_PAGE_MENU, MenuProps } from "./menus";
import { PAGINATED_TABLE, ROWS_PER_PAGE_OPTIONS } from "./tables";

type ConstantsProps = {
  signUpForm: FormProps[];
  signInForm: FormProps[];
  dashboardPageMenu: MenuProps[];
  rowPerPageOptions: number[];
  itemPerPageOptions: number[];
  paginatedTable: PaginationState;
  paginatedGrid: PaginationState;
  companyForm: FormProps[];
  vehicleForm: FormProps[];
  transportRecordForm: FormProps[];
};

export const CONSTANTS: ConstantsProps = {
  dashboardPageMenu: DASHBOARD_PAGE_MENU,
  signUpForm: SIGN_UP_FORM,
  signInForm: SIGN_IN_FORM,
  rowPerPageOptions: ROWS_PER_PAGE_OPTIONS,
  itemPerPageOptions: ITEMS_PER_PAGE_OPTIONS,
  paginatedTable: PAGINATED_TABLE,
  paginatedGrid: PAGINATED_GRID,
  companyForm: COMPANY_FORM,
  vehicleForm: VEHICLE_FORM,
  transportRecordForm: TRANSPORT_RECORD_FORM,
};
