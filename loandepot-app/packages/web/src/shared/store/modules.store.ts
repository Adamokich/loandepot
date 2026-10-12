import { client } from '@/shared/api';
import type { IModule } from '@loandepot/types';
import { isAxiosError } from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useModulesStore = defineStore('modules', () => {
  const modules = ref<IModule[]>();
  const activeIndex = ref<number>(0);
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  const activeModuleId = computed<number | null>(() => {
    return modules.value ? modules.value[activeIndex.value].moduleId : null;
  });

  async function getModules(): Promise<void> {
    isLoading.value = true;
    try {
      const res = await client.get<IModule[]>('http://localhost:8000/api/modules?');
      modules.value = res.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (!navigator.onLine || error.code === 'ERR_NETWORK') {
          errorMessage.value = 'Ошибка. У пользователя отсутствует подключение к интернету';
        } else if (status === 500) {
          errorMessage.value = 'Ошибка произошла на стороне сервера, повторите попытку позже';
        } else if (status === 404) {
          errorMessage.value = 'Запрашиваемы модули не найдены';
        } else {
          errorMessage.value = `Ошибка сервера (${status}). Повторите попытку чуть позже`;
        }
      }
    } finally {
      isLoading.value = false;
    }
  }

  return { modules, activeModuleId, activeIndex, isLoading, errorMessage, getModules };
});
