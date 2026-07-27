<template>
  <div class="agendar-container">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-extrabold text-[#003366]">Agendar Cita Presencial</h2>
      <p class="text-slate-500 mt-2">Reserva un espacio con nuestros asesores para revisar tu proyecto.</p>
    </div>

    <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto border border-slate-100">
      <form @submit.prevent="agendar" class="space-y-6">
        
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">Fecha de la Cita</label>
          <input type="date" v-model="form.fecha" :min="fechaMinima" required class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#003366] outline-none">
        </div>

        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">Hora (8:00 AM - 6:00 PM)</label>
          <select v-model="form.hora" required class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#003366] outline-none">
            <option value="" disabled>Selecciona una hora</option>
            <option v-for="h in horasDisponibles" :key="h" :value="h">{{ formatearHora(h) }}</option>
          </select>
        </div>

        <div v-if="errorMsg" class="bg-red-50 text-red-500 p-4 rounded-lg text-sm text-center border border-red-100">
          {{ errorMsg }}
        </div>
        <div v-if="successMsg" class="bg-emerald-50 text-emerald-600 p-4 rounded-lg text-sm text-center border border-emerald-100 font-bold">
          {{ successMsg }}
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-[#003366] text-white font-bold py-4 rounded-lg shadow-md hover:bg-slate-800 transition-colors disabled:opacity-50">
          {{ loading ? 'Procesando...' : 'Confirmar Agendamiento' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  fecha: '',
  hora: ''
})

const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

// Fecha mínima hoy
const fechaMinima = computed(() => {
  const hoy = new Date()
  return hoy.toISOString().split('T')[0]
})

// Generar horas de 8 a 17 (17:00 es la cita de 5 a 6pm)
const horasDisponibles = Array.from({ length: 10 }, (_, i) => i + 8)

const formatearHora = (h) => {
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hora12 = h > 12 ? h - 12 : h
  return `${hora12}:00 ${ampm}`
}

const agendar = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  loading.value = true
  
  try {
    // Combinar fecha y hora
    const fechaHora = new Date(`${form.value.fecha}T${form.value.hora.toString().padStart(2, '0')}:00:00`)
    
    await api.post('/citas', { fecha_hora: fechaHora.toISOString() })
    successMsg.value = '¡Cita agendada con éxito! Te hemos enviado un correo con los detalles.'
    form.value.fecha = ''
    form.value.hora = ''
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Error al agendar la cita. Es posible que el horario esté ocupado.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.agendar-container {
  @apply max-w-5xl mx-auto py-12 px-4;
}
</style>
