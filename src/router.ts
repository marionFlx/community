import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import Members from '@/views/Members.vue';
import Register from '@/views/Register.vue';

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
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
});

export default router;
