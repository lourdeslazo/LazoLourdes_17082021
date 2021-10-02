import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';


const routes = [ 
    {
        name: 'Home',
        path: '/home',
        component: Home,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../views/Signup.vue')
      },
    {
        name: 'Login',
        path: '/',
        component: () => import('../views/Login.vue')
    },
   
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;