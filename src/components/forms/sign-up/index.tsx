"use client";
import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { CONSTANTS } from "@/constants";
import { useCredentialSignUp } from "@/hooks/use-auth";
import dynamic from "next/dynamic";

const OtpInput = dynamic(
  () =>
    import("@/components/global/otp-input").then(
      (component) => component.default
    ),
  { ssr: false }
);

const SignUpForm = () => {
  const {
    register,
    errors,
    verifying,
    creating,
    onGenerateCode,
    onInitiateUserRegistration,
    code,
    setCode,
    getValues,
  } = useCredentialSignUp();

  return (
    <form
      onSubmit={onInitiateUserRegistration}
      className="flex flex-col gap-3 mt-10"
    >
      {verifying ? (
        <div className="flex justify-center mb-5">
          <OtpInput otp={code} setOtp={setCode} />
        </div>
      ) : (
        CONSTANTS.signUpForm.map((field) => (
          <FormGenerator
            {...field}
            key={field.id}
            register={register}
            errors={errors}
          />
        ))
      )}

      {verifying ? (
        <Button type="submit" className="rounded-2xl">
          <Loader loading={creating}>Registrarse con Email</Loader>
        </Button>
      ) : (
        <Button
          type="button"
          className="rounded-2xl"
          onClick={() => onGenerateCode(getValues("email"))}
        >
          <Loader loading={false}>Generar código</Loader>
        </Button>
      )}
    </form>
  );
};

export default SignUpForm;
