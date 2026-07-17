<template>
<div class="min-h-screen bg-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

    <div class="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 relative z-10 border border-gray-100">
      <div class="text-center mb-8">
        <div class="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/30 mb-4 cursor-pointer" @click="$router.push('/')">
          S
        </div>
        <h2 class="text-3xl font-extrabold text-dark tracking-tight">
          Bienvenido de vuelta
        </h2>
        <p class="mt-2 text-gray-500">
          Inicia sesión en tu cuenta
        </p>
      </div>
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email-address" class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required v-model="email" class="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="tucorreo@ejemplo.com">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required v-model="password" class="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="••••••••">
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer">
            <label for="remember-me" class="ml-2 block text-sm text-gray-700 cursor-pointer">
              Recordarme
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-primary hover:text-secondary transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/30 transform hover:-translate-y-0.5">
            Ingresar
          </button>
        </div>
      </form>
      
      <div class="mt-6 text-center text-sm">
        <span class="text-gray-500">¿No tienes cuenta?</span>
        <router-link to="/registro" class="font-bold text-primary hover:text-secondary ml-1 transition-colors">Regístrate aquí</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Login attempt:', email.value)
  // Aquí integraremos Axios para llamar a nuestro backend
}
</script>
