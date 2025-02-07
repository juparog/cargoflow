import { PaginationState } from "@tanstack/react-table";
import { COMPANY_FORM, FormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms";
import { DASHBOARD_PAGE_MENU, MenuProps } from "./menus";
import { COMAPANIES_PAGINATED_TABLE } from "./tables";

type ConstantsProps = {
  signUpForm: FormProps[];
  signInForm: FormProps[];
  dashboardPageMenu: MenuProps[];
  companyForm: FormProps[];
  companiesPaginatedTable: PaginationState;
};

export const CONSTANTS: ConstantsProps = {
  dashboardPageMenu: DASHBOARD_PAGE_MENU,
  signUpForm: SIGN_UP_FORM,
  signInForm: SIGN_IN_FORM,
  companyForm: COMPANY_FORM,
  companiesPaginatedTable: COMAPANIES_PAGINATED_TABLE,
};
