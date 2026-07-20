import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserDashboard from '../views/UserDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AddPropiedad from '../views/AddPropiedad.vue'
import Users from '../views/Users.vue'
import Cotizador from '../views/Cotizador.vue'
import { useAuthStore } from '../store/auth'

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
      meta: { requiresAuth: true },
      children: [
        {
          path: 'user',
          name: 'Panel de Usuario',
          component: UserDashboard
        },
        {
          path: 'cotizador',
          name: 'Santander Cotiza',
          component: Cotizador
        },
        {
          path: 'admin',
          name: 'Panel de Administración',
          component: AdminDashboard,
          meta: { isAdmin: true }
        },
        {
          path: 'admin/add-propiedad',
          name: 'Añadir Propiedad',
          component: AddPropiedad,
          meta: { isAdmin: true }
        },
        {
          path: 'admin/usuarios',
          name: 'Gestión de Usuarios',
          component: Users,
          meta: { isAdmin: true }
        },
        {
          path: 'admin/proyectos',
          name: 'Gestión de Obras Entregadas',
          component: () => import('../views/Proyectos.vue'),
          meta: { isAdmin: true }
        },
        {
          path: 'admin/add-proyecto',
          name: 'Añadir Obra Entregada',
          component: () => import('../views/AddProyecto.vue'),
          meta: { isAdmin: true }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    // Redirigir a login, guardando la ruta a la que quería ir
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else if (to.matched.some(record => record.meta.isAdmin) && !authStore.isAdmin) {
    // Si requiere ser admin y no lo es
    next({ path: '/dashboard/user' })
  } else {
    next()
  }
})

export default router
