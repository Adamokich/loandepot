import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'hello',
      component: () => import('./components/HelloWorld.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./pages/TestPage.vue'),
    },
  ],
});
