import type { IUser } from '@loandepot/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { client } from '@/shared/api';
import { API_ROUTES } from '@/shared/api/api';
import type {
  ServerErrorData,
  ServerValidationErrorDetail,
} from '../interfaces/server.validation.interface';
import axios from 'axios';

export const useEvolutionJoinStore = defineStore('join-evolution', () => {
  const success = ref<boolean>(false);
  const serverError = ref<string | null>(null);
  const serverFieldErrors = ref<ServerValidationErrorDetail[] | null>(null);

  async function userSubmitForm(formData: Omit<IUser, '_id'>): Promise<boolean> {
    try {
      await client.post<Omit<IUser, '_id'>>('http://localhost:8000/users/register', formData);
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data as ServerErrorData;

        if (errorData.details && Array.isArray(errorData.details)) {
          serverFieldErrors.value = errorData.details;
        } else if (errorData.message) {
          serverError.value = errorData.message;
        } else {
          serverError.value = 'Ошибка про обращении к серверу';
        }
      }

      return false;
    }
  }

  return { success, serverError, serverFieldErrors, userSubmitForm };
});
