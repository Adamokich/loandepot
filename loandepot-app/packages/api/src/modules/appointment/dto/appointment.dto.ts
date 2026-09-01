import z from "zod";

export const appointmentDto = z.object({
  name: z
    .string()
    .min(2, { error: "Имя пользователя должно содержать минимум 2 символа" })
    .trim(),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Неправильно указан формат email" })),
  date: z
    .string()
    .pipe(z.coerce.date({ error: "Неправильно указан формат даты" }))
    .refine((date) => date > new Date(), {
      error: "Ошибка. Встречу нельзя назначить на прошедший день",
    }),
});

export type IAppointmentDto = z.infer<typeof appointmentDto>;
