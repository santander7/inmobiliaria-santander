<template>
<div class="min-h-screen bg-light flex flex-col md:flex-row">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 bg-darker text-white shadow-xl flex flex-col relative z-20">
      <div class="h-20 flex items-center justify-center border-b border-white/10 px-6">
        <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/')">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span class="font-bold text-lg tracking-tight">Santander<span class="text-primary font-normal">Panel</span></span>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu</div>
        
        <!-- User Links -->
        <template v-if="role === 'USER'">
          <router-link to="/dashboard/user" class="block px-4 py-3 rounded-xl hover:bg-white/10 transition-colors" active-class="bg-primary hover:bg-primary text-white font-medium">
            Inicio
          </router-link>
          <a href="#" class="block px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-gray-300 hover:text-white">Favoritos</a>
          <a href="#" class="block px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-gray-300 hover:text-white">Mis Solicitudes</a>
          <a href="#" class="block px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-gray-300 hover:text-white">Construcción</a>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// En una app real, esto vendría del estado de autenticación (Pinia)
const role = computed(() => {
  const path = useRoute().path
  return path.includes('admin') ? 'ADMIN' : 'USER'
})

const routeName = computed(() => {
  return useRoute().name?.replace('-', ' ') || 'Dashboard'
})
</script>
