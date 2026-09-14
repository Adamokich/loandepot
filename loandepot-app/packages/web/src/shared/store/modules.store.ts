import { client } from '@/shared/api';
import type { IModule } from '@loandepot/types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useModulesStore = defineStore('modules', () => {
  const modules = ref<IModule[]>();
  const activeIndex = ref<number>(0);

  const activeModuleId = computed<number | null>(() => {
    return modules.value ? modules.value[activeIndex.value].moduleId : null;
  });

  async function getModules(): Promise<void> {
    const res = await client.get<IModule[]>('http://localhost:8000/api/modules?');

    modules.value = res.data;
  }

  return { modules, activeModuleId, activeIndex, getModules };
});
