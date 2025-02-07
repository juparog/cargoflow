import { onSignUpUser, sendOTPCode, verifyOTPCode } from "@/actions/auth";
import { SignInSchema } from "@/components/forms/sign-in/schema";
import { SignUpSchema } from "@/components/forms/sign-up/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useCredentialSignIn = (redirectTo?: string) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: "onBlur",
  });

  const router = useRouter();

  const onAuthSignIn = async (emailOrUsername: string, password: string) => {
    const response = await signIn("credentials", {
      emailOrUsername,
      password,
      redirect: false,
    });

    if (!response?.error) {
      reset();
      toast.success("¡Bienvenido de nuevo!");
      router.push(redirectTo || "/dashboard");
    } else {
      console.log(response);
      let messageError = "¡Ups! Algo salió mal.";
      switch (response.error) {
        case "CredentialsSignin":
          messageError =
            "Correo/Usuario o contraseña incorrectos, intenta de nuevo.";
          break;
        case "AccessDenied":
          messageError = "Acceso denegado, intenta de nuevo.";
          break;
      }
      toast.error(messageError);
    }
  };

  const { mutate: initiateLoginFlow, isPending } = useMutation({
    mutationFn: ({ emailOrUsername, password }: SignInSchema) =>
      onAuthSignIn(emailOrUsername, password),
  });

  const onAuthenticateUser = handleSubmit(async (values) =>
    initiateLoginFlow({
      emailOrUsername: values.emailOrUsername,
      password: values.password,
    })
  );

  return {
    onAuthenticateUser,
    isPending,
    register,
    errors,
  };
};

export const useCredentialSignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
  });

  const router = useRouter();

  const [code, setCode] = useState("");
  const [creating, setCreating] = useState<boolean>(false);
  const [verifying, setVerifying] = useState(false);

  const onGenerateCode = async (email: string) => {
    if (email) {
      const response = await sendOTPCode(email);
      if (!response?.error) {
        toast.success("Código de verificación enviado. Verifica tu correo.");
        setVerifying(true);
      } else {
        toast.error(response.error);
      }
    } else {
      return toast.error("Algunos campos son requeridos");
    }
  };

  const onInitiateUserRegistration = handleSubmit(async (values) => {
    setCreating(true);
    const response = await verifyOTPCode(values.email, code);
    if (response.success) {
      const user = await onSignUpUser({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        username: values.username || null,
        emailVerified: new Date(),
      });

      if (!user) {
        toast.error("No se pudo registrar el usuario");
        router.refresh();
      }

      const response = await signIn("credentials", {
        emailOrUsername: user?.email,
        password: values.password,
        redirect: false,
      });

      if (!response?.error) {
        reset();
        toast.success("Registro exitoso!");
        router.push("/dashboard");
      } else {
        toast.error("¡Ups! Algo salió mal.");
      }
      router.push(`/dashboard`);
    } else {
      toast.error(`Código de verificación inválido: ${response.error}`);
      setCode("");
      setCreating(false);
      setVerifying(false);
    }
  });

  return {
    register,
    errors,
    verifying,
    creating,
    onGenerateCode,
    onInitiateUserRegistration,
    code,
    setCode,
    getValues,
  };
};
