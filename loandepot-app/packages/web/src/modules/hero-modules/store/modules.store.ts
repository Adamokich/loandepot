import { client } from '@/shared/api';
import type { IModule } from '@loandepot/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModulesStore = defineStore('modules', () => {
  const modules = ref<IModule[]>();

  async function getModules(): Promise<void> {
    const res = await client.get<IModule[]>('http://localhost:8000/api/modules?');

    modules.value = res.data;
  }

  return { modules, getModules };
});
