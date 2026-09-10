import type { InjectionKey, Ref } from 'vue';

export const isMobileKey = Symbol() as InjectionKey<Ref<boolean>>;
