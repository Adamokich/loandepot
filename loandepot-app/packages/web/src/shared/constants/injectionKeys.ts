import type { InjectionKey, Ref } from 'vue';

export const isMobileKey = Symbol() as InjectionKey<Ref<boolean>>;
export const isMobileSmallKey = Symbol() as InjectionKey<Ref<boolean>>;
export const isMobileLargeKey = Symbol() as InjectionKey<Ref<boolean>>;
