"use client";

import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui";
import { CONSTANTS } from "@/constants";
import { useCredentialSignIn } from "@/hooks/use-auth";

type Props = {
  redirectTo?: string | undefined;
};

const SignInForm = (props: Props) => {
  const { isPending, onAuthenticateUser, register, errors } =
    useCredentialSignIn(props.redirectTo);

  return (
    <form className="flex flex-col gap-3 mt-10" onSubmit={onAuthenticateUser}>
      {CONSTANTS.signInForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
        />
      ))}
      <Button type="submit" className="rounded-2xl">
        <Loader loading={isPending}>Iniciar sesión</Loader>
      </Button>
    </form>
  );
};

export default SignInForm;
