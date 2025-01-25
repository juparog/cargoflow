"use client";

import SignInForm from "@/components/forms/sign-in/index";
import { ClerkOAuthButton } from "@/components/global/clerk-oauth-button";
import { Separator } from "@/components/ui";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  return (
    <>
      <h5 className="font-bold text-base text-themeTextWhite text-center">
        Iniciar sesión
      </h5>
      <p className="text-themeTextGray leading-tight text-center mt-2">
        Inicia sesión para gestionar y seguir la entrega de carga y paquetes de
        manera eficiente.
      </p>
      <SignInForm redirectTo={callbackUrl} />
      <div className="my-10 w-full relative">
        <div className="bg-secondary dark:bg-black p-3 absolute dark:text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          O CONTINÚA CON
        </div>
        <Separator orientation="horizontal" className="bg-themeGray" />
      </div>
      <ClerkOAuthButton method="login" redirectUrl={callbackUrl} />
      <div className="text-center mt-5">
        <p className="text-themeTextGray">¿No tienes una cuenta?</p>
        <a
          href="/sign-up"
          className="text-themeTextBlue font-bold hover:underline"
        >
          Regístrate
        </a>
      </div>
    </>
  );
};

export default LoginPage;
