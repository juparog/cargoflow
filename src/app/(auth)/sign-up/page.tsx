import SignUpForm from "@/components/forms/sign-up";
import { ClerkOAuthButton } from "@/components/global/clerk-oauth-button";
import { Separator } from "@/components/ui";

const SignUpPage = () => {
  return (
    <>
      <h5 className="font-bold text-base text-themeTextWhite text-center">
        Regístrate
      </h5>
      <p className="text-themeTextGray leading-tight text-center mt-2">
        Regístrate para gestionar y supervisar el transporte de carga y paquetes
        con eficacia.
      </p>
      <SignUpForm />
      <div className="my-10 w-full relative">
        <div className="bg-secondary dark:bg-black p-3 absolute text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          O CONTINÚA CON
        </div>
        <Separator orientation="horizontal" className="bg-themeGray" />
      </div>
      <ClerkOAuthButton method="login" />
      <div className="text-center mt-5">
        <p className="text-themeTextGray">¿Ya tienes una cuenta?</p>
        <a
          href="/sign-in"
          className="text-themeTextBlue font-bold hover:underline"
        >
          Inicia sesión
        </a>
      </div>
    </>
  );
};

export default SignUpPage;
