import type { FormatsConfig } from '@vuepic/vue-datepicker';

export const isSameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export const formatToBackendISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const datePickerFormats: Partial<FormatsConfig> = {
  input: (value: Date | string | unknown): string => {
    if (!(value instanceof Date)) return '';

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const hours = String(value.getHours()).padStart(2, '0');
    const minutes = String(value.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    if (isSameDay(value, today)) return `Today, ${timeString}`;
    if (isSameDay(value, tomorrow)) return `Tomorrow, ${timeString}`;

    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const year = value.getFullYear();

    return `${day}.${month}.${year} ${timeString}`;
  },
  preview: 'dd.MM.yyyy HH:mm',
};
