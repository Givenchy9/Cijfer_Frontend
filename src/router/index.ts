import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/dashboard.vue'),
    },
    {
      path: '/cijfers',
      name: 'cijfers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/cijfers.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings.vue'),
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/settings/profile.vue'),
        },
        {
          path: 'ouders',
          name: 'ouders',
          component: () => import('../views/settings/ouders.vue'),
        },
        {
          path: 'thema',
          name: 'thema',
          component: () => import('../views/settings/thema.vue'),
        },
      ],
    },
    // {
    //   path: '/vak/:id',
    //   component: User,
    //   children: [
    //     {
    //       path: 'profile',
    //       component: UserProfile,
    //     },
    //     {
    //       path: 'posts',
    //       component: UserPosts,
    //     },
    //   ],
    // },
  ],
})

export default router
