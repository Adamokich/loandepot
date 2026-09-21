import z from "zod";

const phoneReg =
  /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[\d]{3}[\s\-]?[\d]{2}[\s\-]?[\d]{2}$/;

export const userRegisterDto = z.object({
  name: z
    .string()
    .min(2, { error: "Имя пользователя должно содержать минимум 2 символа" })
    .trim(),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Неправильно указан формат email" })),
  phone: z
    .string()
    .regex(phoneReg, { error: "Неверный формат телефона" })
    .trim(),
  speciality: z
    .string()
    .min(1, { error: "Необходимо указать специальность" })
    .trim(),
  country: z.string().min(1, { error: "Необходимо указать страну" }),
});

export type IUserRegisterDto = z.infer<typeof userRegisterDto>;
