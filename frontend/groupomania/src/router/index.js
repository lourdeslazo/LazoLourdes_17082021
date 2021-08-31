import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Profil from '@/views/Profil.vue';
import Message from '@/views/Message.vue';
import UserDelete from '@/views/UserDelete.vue';


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