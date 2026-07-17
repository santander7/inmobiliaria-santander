import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import UserDashboard from '../views/user/Dashboard.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registro',
      name: 'registro',
      component: Register
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: 'user',
          name: 'Panel de Usuario',
          component: UserDashboard
        },
        {
          path: 'admin',
          name: 'Panel de Administración',
          component: AdminDashboard
        }
      ]
    }
  ]
})

export default router
