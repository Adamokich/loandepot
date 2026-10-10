import * as v from 'valibot';

export const appointmentSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, 'Минимальное количество символов 2'),
    v.maxLength(30, 'Превышено максимальное количество символов'),
    v.nonEmpty('Имя пользователя должно содержать минимум 2 символа'),
  ),
  email: v.pipe(
    v.string(),
    v.trim(),
    v.toLowerCase(),
    v.nonEmpty('email обязателен для заполнения'),
    v.email('Неправильно указан формат email'),
  ),
  date: v.pipe(
    v.string('Дата обязательна для заполнения'),
    v.isoDateTime('Неверный формат даты'),
    v.check(
      (date) => new Date(date).getTime() >= Date.now(),
      'Встречу нельзя назначить на прошедшее время',
    ),
  ),
});

export type Appointment = v.InferInput<typeof appointmentSchema>;
