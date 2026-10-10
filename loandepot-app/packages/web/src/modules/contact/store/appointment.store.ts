import { client } from '@/shared/api';
import type { ServerErrorData, ServerValidationErrorDetail } from '@loandepot/shared';
import type { IAppointment } from '@loandepot/types';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppointmentStore = defineStore('appointment', () => {
  const success = ref<boolean>(false);
  const serverError = ref<string | null>(null);

  async function appointmentSubmitForm(formData: IAppointment): Promise<boolean> {
    try {
      await client.post<IAppointment>('http://localhost:8000/appointments/register', formData);
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data as ServerErrorData;

        if (errorData.message) {
          serverError.value = errorData.message;
        } else {
          serverError.value = 'Ошибка на стороне сервера';
        }
      }

      return false;
    }
  }

  return { success, serverError, appointmentSubmitForm };
});
