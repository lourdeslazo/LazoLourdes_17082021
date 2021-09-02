import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Profil from '@/views/Profil.vue';
import Message from '@/views/Message.vue';
import UserDelete from '@/views/UserDelete.vue';
import store from '../store/index';

const routes = [ 
    {
        name: 'login',
        path: '/',
        component: Login,
        meta: {
            title: 'Connexion',
            requiresVisitor: true,
        },
    },
    {
      name: 'signup',
      path: '/',
      component: Signup,
      meta: {
          title: 'Sinscrire',
          requiresVisitor: true,
      },
  },
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: {
            title: 'Accueil',
            requiresAuth: true,
        },
    },
    {
        name: 'message',
        path: '/message/:id',
        component: Message,
        props: true,
        meta: {
            title: 'Message',
            requiresAuth: true,
        },
    },
    {
        name: 'profil',
        path: '/profil',
        component: Profil,
        props: true,
        meta: {
            title: 'Profil',
            requiresAuth: true,
        },  
    },
    {
        name: 'userDelete',
        path: '/userDelete',
        component: UserDelete,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((routes) => routes.meta.requiresAuth)) {
      if (!store.state.user.token) {
        next({
          name: 'login'
        });
      } else {
        next();
      }
    } else if (to.matched.some((routes) => routes.meta.requiresVisitor)) {
      if ((store.state.user.token)) {
        next({
          name: 'login' || 'signup' || 'home' || 'message' || 'profil' || 'userDelete',
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

router.afterEach((to, from) => {
    console.log(from, to);
    document.title = to.meta.title;
})

export default router;