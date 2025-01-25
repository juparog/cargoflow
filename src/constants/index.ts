import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms";
import { MenuProps, WEBSITE_PAGE_MENU } from "./menus";

type ConstantsProps = {
  signUpForm: AuthFormProps[];
  signInForm: AuthFormProps[];
  websitePageMenu: MenuProps[];
};

export const CONSTANTS: ConstantsProps = {
  websitePageMenu: WEBSITE_PAGE_MENU,
  signUpForm: SIGN_UP_FORM,
  signInForm: SIGN_IN_FORM,
};
