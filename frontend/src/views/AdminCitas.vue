<template>
  <div class="citas-container">
    <div class="header">
      <h2 class="text-3xl font-extrabold text-[#003366]">Gestión de Citas</h2>
      <p class="text-slate-500">Administra todas las citas agendadas por los clientes.</p>
    </div>

    <div class="bg-white rounded-xl shadow-lg border border-slate-100 mt-8 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-50 border-b border-slate-100">
            <tr>
              <th class="p-4 font-bold text-slate-600 text-sm">Fecha y Hora</th>
              <th class="p-4 font-bold text-slate-600 text-sm">Cliente</th>
              <th class="p-4 font-bold text-slate-600 text-sm">Contacto</th>
              <th class="p-4 font-bold text-slate-600 text-sm text-center">Estado</th>
              <th class="p-4 font-bold text-slate-600 text-sm text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="cita in citas" :key="cita._id" class="hover:bg-slate-50 transition">
              <td class="p-4 font-semibold text-slate-800">
                {{ new Date(cita.fecha_hora).toLocaleString('es-CO') }}
              </td>
              <td class="p-4 text-slate-700">
                {{ cita.user?.nombre || 'Desconocido' }}
              </td>
              <td class="p-4 text-slate-700">
                {{ cita.user?.correo }}<br>
                <span class="text-xs text-slate-500">📞 {{ cita.user?.telefono || 'N/A' }}</span>
              </td>
              <td class="p-4 text-center">
                <span :class="{
                  'bg-amber-100 text-amber-700': cita.estado === 'PENDIENTE',
                  'bg-blue-100 text-blue-700': cita.estado === 'CONFIRMADA',
                  'bg-emerald-100 text-emerald-700': cita.estado === 'COMPLETADA',
                  'bg-red-100 text-red-700': cita.estado === 'CANCELADA'
                }" class="px-2 py-1 rounded text-xs font-bold uppercase">
                  {{ cita.estado }}
                </span>
              </td>
              <td class="p-4 text-center flex justify-center gap-2">
                <button v-if="cita.estado === 'PENDIENTE'" @click="actualizarEstado(cita._id, 'CONFIRMADA')" class="bg-blue-50 text-blue-600 px-3 py-1 rounded font-bold text-sm hover:bg-blue-100">Confirmar</button>
                <button v-if="cita.estado === 'CONFIRMADA'" @click="actualizarEstado(cita._id, 'COMPLETADA')" class="bg-emerald-50 text-emerald-600 px-3 py-1 rounded font-bold text-sm hover:bg-emerald-100">Completar</button>
                <button v-if="cita.estado !== 'CANCELADA'" @click="actualizarEstado(cita._id, 'CANCELADA')" class="bg-red-50 text-red-600 px-3 py-1 rounded font-bold text-sm hover:bg-red-100">Cancelar</button>
              </td>
            </tr>
            <tr v-if="citas.length === 0">
              <td colspan="5" class="p-8 text-center text-slate-500">
                No hay citas agendadas actualmente.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const citas = ref([])

const cargarCitas = async () => {
  try {
    const { data } = await api.get('/citas')
    citas.value = data
  } catch (error) {
    console.error('Error al cargar citas:', error)
  }
}

const actualizarEstado = async (id, estado) => {
  if (confirm(`¿Marcar cita como ${estado}?`)) {
    try {
      await api.put(`/citas/${id}`, { estado })
      cargarCitas()
    } catch (error) {
      alert('Error al actualizar cita')
    }
  }
}

onMounted(() => {
  cargarCitas()
})
</script>
