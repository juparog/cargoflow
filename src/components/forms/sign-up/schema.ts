import { z } from "zod";

export const SignUpSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  lastname: z
    .string()
    .min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
  email: z.string().email("Debe ser un correo electrónico válido"),
  password: z
    .string()
    .min(8, { message: "Su contraseña debe tener al menos 8 caracteres" })
    .max(64, {
      message: "Su contraseña debe tener menos de 64 caracteres",
    })
    .refine(
      (value) =>
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
          value ?? ""
        ),
      "La contraseña debe tener al menos una letra mayúscula, una minúscula y un número o caracter especial"
    ),
  username: z
    .string()
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    })
    .max(16, {
      message: "El nombre de usuario debe tener menos de 16 caracteres",
    })
    .optional()
    .or(z.literal("")),
});

export type SignUpSchema = z.infer<typeof SignUpSchema>;
