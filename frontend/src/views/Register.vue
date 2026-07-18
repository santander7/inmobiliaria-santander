<template>
<div class="min-h-screen bg-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

    <div class="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 relative z-10 border border-gray-100 mt-10 mb-10">
      <div class="text-center mb-8">
        <div class="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/30 mb-4 cursor-pointer" @click="$router.push('/')">
          S
        </div>
        <h2 class="text-3xl font-extrabold text-dark tracking-tight">
          Crea tu cuenta
        </h2>
        <p class="mt-2 text-gray-500">
          Únete a Inmobiliaria & Constructora Santander
        </p>
      </div>
      <form class="space-y-5" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input id="name" type="text" required v-model="form.nombre" class="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Juan Pérez">
          </div>
          <div>
            <label for="email-address" class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input id="email-address" type="email" required v-model="form.correo" class="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="tucorreo@ejemplo.com">
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input id="phone" type="tel" required v-model="form.telefono" class="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="+57 300 000 0000">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input id="password" type="password" required v-model="form.password" class="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="••••••••">
          </div>
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
            <input id="confirm-password" type="password" required v-model="form.confirmPassword" class="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="••••••••">
          </div>
        </div>

        <div v-if="errorMsg" class="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
          {{ errorMsg }}
        </div>
        <div>
          <button type="submit" :disabled="loading" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/30 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
            {{ loading ? 'Registrando...' : 'Registrarse' }}
          </button>
        </div>
      </form>
      
      <div class="mt-6 text-center text-sm">
        <span class="text-gray-500">¿Ya tienes cuenta?</span>
        <router-link to="/login" class="font-bold text-primary hover:text-secondary ml-1 transition-colors">Inicia sesión aquí</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const form = reactive({
  nombre: '',
  correo: '',
  telefono: '',
  password: '',
  confirmPassword: ''
})

const errorMsg = ref('')
const loading = ref(false)

const router = useRouter()
const authStore = useAuthStore()

const handleRegister = async () => {
  errorMsg.value = ''
  
  if (form.password !== form.confirmPassword) {
    errorMsg.value = "Las contraseñas no coinciden"
    return
  }
  
  loading.value = true
  try {
    await authStore.register({
      nombre: form.nombre,
      correo: form.correo,
      telefono: form.telefono,
      password: form.password
    })
    
    // Una vez registrado, hacemos login automáticamente
    await authStore.login({ correo: form.correo, password: form.password })
    
    if (authStore.isAdmin) {
      router.push('/dashboard/admin')
    } else {
      router.push('/dashboard/user')
    }
  } catch (error) {
    errorMsg.value = error
  } finally {
    loading.value = false
  }
}
</script>
