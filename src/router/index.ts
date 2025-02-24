import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  // Optional: You can add more checks here, such as token expiration validation
  return !!token;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard.vue'),
      // meta: { requiresAuth: true }, // Mark as protected
    },
    {
      path: '/cijfers',
      name: 'cijfers',
      component: () => import('../views/cijfers.vue'),
      //meta: { requiresAuth: true }, // Mark as protected
    },
    {
      path: '/docent',
      name: 'docent',
      component: () => import('../views/docent.vue'),
      //meta: { requiresAuth: true }, // Uncomment if authentication is required
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin.vue'),
      //meta: { requiresAuth: true }, // Uncomment if authentication is required
      children: [
        {
          path: 'admin_leerling',
          name: 'admin_leerling',
          component: () => import('../views/admin/admin_leerling.vue'),
        },
        {
          path: 'admin_docent',
          name: 'admin_docent',
          component: () => import('../views/admin/admin_docent.vue'),
        },
        {
          path: 'admin_users',
          name: 'admin_users',
          component: () => import('../views/admin/admin_users.vue'),
        },
      ],
    },
    {
      path: '/vak/:vakId/leerlingen',
      name: 'VakLeerlingen',
      component: () => import('../views/VakLeerlingen.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/profile.vue'),
      //meta: { requiresAuth: true }, // Mark as protected
    },
    // {
    //   path: '/settings',
    //   name: 'settings',
    //   component: () => import('../views/settings.vue'),
    //   //meta: { requiresAuth: true }, // Mark as protected
    //   children: [
    //     // {
    //     //   path: 'profile',
    //     //   name: 'profile',
    //     //   component: () => import('../views/settings/profile.vue'),
    //     //   meta: { requiresAuth: true }, // Mark as protected
    //     // },
    //     {
    //       path: 'ouders',
    //       name: 'ouders',
    //       component: () => import('../views/settings/ouders.vue'),
    //       meta: { requiresAuth: true }, // Mark as protected
    //     },
    //     {
    //       path: 'thema',
    //       name: 'thema',
    //       component: () => import('../views/settings/thema.vue'),
    //       meta: { requiresAuth: true }, // Mark as protected
    //     },
    //   ],
    // },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'not-found',
    //   component: () => import('../views/NotFound.vue'),
    // },
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
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;