import * as v from 'valibot';

export const joinEvolutionSchema = v.object({
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
  phone: v.pipe(v.string(), v.nonEmpty('Номер телефона обязателен для заполнения')),
  speciality: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Необходимо указать специальность'),
    v.minLength(2, 'Минимальное количество символов 2'),
    v.maxLength(30, 'Превышено максимальное количество символов'),
  ),
  city: v.pipe(v.string(), v.nonEmpty('Необходимо указать город')),
});

export type JoinEvolutionUser = v.InferInput<typeof joinEvolutionSchema>;
