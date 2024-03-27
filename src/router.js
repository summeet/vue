import { createRouter, createWebHistory } from "vue-router"

import Web from "@/screens/web/index.vue"
import Home from './screens/web/Home.vue'
import Contact from '@/screens/web/Contact.vue'

import Admin from './screens/admin/Admin.vue'
import Dashboard from './screens/admin/Dashboard.vue'
import UserManagement from './screens/admin/UserManagement.vue'
import ProductManagement from './screens/admin/ProductManagement.vue'

import { useUserStore } from './stores/user'

const routes = [
    {
        path: '', 
        component: Web,
        children: [
            {
                path: '/home',
                component: Home
            },
            {
                path: '/contact',
                component: Contact
            }
        ]
    },
    {
        path: '/admin', 
        component: Admin,
        children: [
            {
                path: '/admin/dashboard',
                component: Dashboard
            },
            {
                path: '/admin/user-management',
                component: UserManagement
            },
            {
                path: '/admin/product-management',
                component: ProductManagement
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
    const auth = useUserStore()
    if(loggedIn){
        auth.isLoggedIn = true
    }
    if (authRequired && !loggedIn) {
      next('/home');
    } else {
      next();
    }
  });

export default router