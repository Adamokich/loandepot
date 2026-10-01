import { CITY_SELECT_OPTIONS, PHONE_NUMBER_REGEX } from "@loandepot/shared";
import z from "zod";

const cities = CITY_SELECT_OPTIONS.filter((city) => !city.disabled).map(
  (city) => city.value,
);

export const userRegisterDto = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Имя пользователя должно содержать минимум 2 символа" })
    .max(30, { error: "Превышено максимальное количество символов" }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Неправильно указан формат email" })),
  phone: z
    .string()
    .regex(PHONE_NUMBER_REGEX, { error: "Неверный формат телефона" }),
  speciality: z
    .string()
    .trim()
    .min(1, { error: "Необходимо указать специальность" })
    .max(30, { error: "Превышено максимальное количество символов" }),
  city: z.string().refine((value) => cities.includes(value), {
    error: "Выбран неверный или не валидный город",
  }),
});

export type IUserRegisterDto = z.infer<typeof userRegisterDto>;
