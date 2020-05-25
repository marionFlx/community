import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import Members from '@/views/Members.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/members',
      name: 'members',
      component: Members
    }
  ]
});

export default router;
