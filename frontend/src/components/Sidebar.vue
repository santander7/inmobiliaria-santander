<template>
  <div class="layout-wrapper">
    <!-- Top Navbar Premium -->
    <header class="navbar">
      <div class="navbar-container">
        <div class="navbar-content">
          
          <!-- Logo -->
          <div class="logo-wrapper" @click="$router.push('/')">
            <div class="logo-icon">S</div>
            <div class="logo-text">
              <span class="logo-title">Santander</span>
              <span class="logo-subtitle">Panel</span>
            </div>
          </div>
          
          <!-- Menu Desktop -->
          <nav class="desktop-menu">
            <!-- User Links -->
            <template v-if="role === 'USER'">
              <router-link to="/dashboard/user" class="nav-link" active-class="nav-link-active">Inicio</router-link>
              <router-link to="/dashboard/cotizador" class="nav-link" active-class="nav-link-active">Construcción</router-link>
              <a href="#" class="nav-link">Mis Solicitudes</a>
              <a href="#" class="nav-link">Favoritos</a>
            </template>

            <!-- Admin Links -->
            <template v-if="role === 'ADMIN'">
              <router-link to="/dashboard/admin" class="nav-link" active-class="nav-link-active" exact>Estadísticas</router-link>
              <router-link to="/dashboard/admin/add-propiedad" class="nav-link" active-class="nav-link-active">Propiedades</router-link>
              <a href="#" class="nav-link">Citas</a>
              <router-link to="/dashboard/admin/usuarios" class="nav-link" active-class="nav-link-active">Usuarios</router-link>
            </template>
          </nav>
          
          <!-- Acciones de Usuario -->
          <div class="user-actions">
            <div class="user-info">
              <span class="user-role">{{ role === 'ADMIN' ? 'Administrador' : 'Cliente' }}</span>
              <div class="avatar">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
            </div>
            <button @click="$router.push('/')" class="btn-logout">Salir</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="bg-decor"></div>
      
      <!-- Título de la sección actual -->
      <div class="page-title-container">
        <h1 class="page-title">{{ routeName }}</h1>
      </div>

      <!-- Área de inyección del contenido (Cotizador, Dash, etc.) -->
      <div class="view-container">
        <router-view></router-view>
      </div>
    </main>

    <!-- Footer Simple para el Dashboard -->
    <footer class="footer">
      <div class="footer-text">
        &copy; {{ new Date().getFullYear() }} Inmobiliaria & Constructora Santander. Panel Privado.
      </div>
    </footer>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const role = computed(() => {
  const path = useRoute().path
  return path.includes('admin') ? 'ADMIN' : 'USER'
})

const routeName = computed(() => {
  return useRoute().name?.replace('-', ' ') || 'Panel'
})
</script>

<style scoped>
.layout-wrapper {
  @apply min-h-screen bg-[#F8FAFC] font-sans text-slate-800 flex flex-col;
}

.navbar {
  @apply w-full z-50 bg-white/95 backdrop-blur-md shadow-sm py-2 border-b border-slate-100 sticky top-0;
}
.navbar-container {
  @apply max-w-7xl mx-auto px-6 lg:px-8;
}
.navbar-content {
  @apply flex justify-between items-center;
}

.logo-wrapper {
  @apply flex-shrink-0 flex items-center gap-3 cursor-pointer;
}
.logo-icon {
  @apply w-10 h-10 bg-[#003366] rounded-lg flex items-center justify-center text-[#E2E8F0] font-serif font-bold text-xl;
}
.logo-text {
  @apply flex flex-col;
}
.logo-title {
  @apply font-bold text-lg tracking-tight text-[#003366] uppercase leading-none;
}
.logo-subtitle {
  @apply font-light text-xs tracking-[0.2em] text-[#64748B] uppercase;
}

.desktop-menu {
  @apply hidden md:flex space-x-10;
}
.nav-link {
  @apply text-[13px] uppercase tracking-widest font-semibold text-slate-500 hover:text-[#003366] transition-colors;
}
.nav-link-active {
  @apply text-[#003366] border-b-2 border-[#003366];
}

.user-actions {
  @apply flex items-center space-x-6;
}
.user-info {
  @apply hidden sm:flex items-center gap-2;
}
.user-role {
  @apply text-sm font-semibold text-slate-600 capitalize;
}
.avatar {
  @apply w-8 h-8 bg-slate-100 rounded-full border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center text-slate-500;
}
.btn-logout {
  @apply text-sm font-semibold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider;
}

.main-content {
  @apply flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative;
}
.bg-decor {
  @apply absolute top-0 right-0 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl -z-10 pointer-events-none;
}

.page-title-container {
  @apply mb-8 hidden md:block;
}
.page-title {
  @apply text-2xl font-extrabold text-slate-800 capitalize;
}

.view-container {
  @apply w-full relative z-10;
}

.footer {
  @apply bg-white border-t border-slate-100 py-6 mt-auto;
}
.footer-text {
  @apply max-w-7xl mx-auto px-6 text-center text-xs text-slate-400 font-medium;
}
</style>
