import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserDashboard from '../views/UserDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AddPropiedad from '../views/AddPropiedad.vue'
import Users from '../views/Users.vue'
import Cotizador from '../views/Cotizador.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
      component: () => import('../components/Sidebar.vue'),
      children: [
        {
          path: 'user',
          name: 'Panel de Usuario',
          component: UserDashboard
        },
        {
          path: 'cotizador',
          name: 'Cotizador Inteligente',
          component: Cotizador
        },
        {
          path: 'admin',
          name: 'Panel de Administración',
          component: AdminDashboard
        },
        {
          path: 'admin/add-propiedad',
          name: 'Añadir Propiedad',
          component: AddPropiedad
        },
        {
          path: 'admin/usuarios',
          name: 'Gestión de Usuarios',
          component: Users
        }
      ]
    }
  ]
})

export default router
