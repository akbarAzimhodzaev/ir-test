import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/pages/CalculatorPage.vue'),
        },
        {
            path: '/success',
            name: 'success',
            component: () => import('@/pages/SuccessPage.vue'),
            props: true,
        },
    ]
});

export default router