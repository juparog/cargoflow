import { z } from "zod";

export const SignInSchema = z.object({
  emailOrUsername: z.string().min(3, {
    message: "El correo electrónico o nombre de usuario es muy corto",
  }),
  password: z
    .string()
    .min(8, { message: "Su contraseña debe tener al menos 8 caracteres" })
    .max(64, {
      message: "Su contraseña no puede tener más de 64 caracteres",
    })
    .refine(
      (value) =>
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
          value ?? ""
        ),
      "La contraseña debe tener al menos una letra mayúscula, una minúscula y un número o caracter especial"
    ),
});

export type SignInSchema = z.infer<typeof SignInSchema>;
