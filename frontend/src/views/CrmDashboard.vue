<template>
  <div class="crm-container">
    <div class="header">
      <h2 class="text-3xl font-extrabold text-[#003366]">CRM Inmobiliario (Leads)</h2>
      <p class="text-slate-500">Gestiona los prospectos generados a través del Cotizador y Formularios.</p>
    </div>

    <!-- Tablero Kanban -->
    <div class="kanban-board mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Columna 1: Pendientes -->
      <div class="kanban-column bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 class="font-bold text-slate-700 mb-4 flex justify-between">
          <span>Nuevos (Pendientes)</span>
          <span class="bg-blue-100 text-blue-700 px-2 rounded-full text-sm">{{ leadsPendientes.length }}</span>
        </h3>
        <div class="space-y-4">
          <div v-for="lead in leadsPendientes" :key="lead._id" class="kanban-card bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition">
            <p class="text-xs text-slate-400 mb-1">{{ new Date(lead.createdAt).toLocaleDateString() }}</p>
            <h4 class="font-bold text-slate-800">{{ lead.user?.nombre || 'Visitante/Invitado' }}</h4>
            <p class="text-sm text-slate-600 mb-2">📞 {{ lead.user?.telefono || 'No proporcionó' }}</p>
            <p class="text-xs bg-slate-100 p-2 rounded text-slate-700 mb-3 font-mono">Tipo: {{ lead.tipo_proyecto }}</p>
            <p class="text-xs text-slate-500 mb-3 font-bold text-emerald-600">Pto. Cotizado: ${{ (lead.costo_calculado || 0).toLocaleString('es-CO') }}</p>
            
            <div class="flex gap-2">
              <button @click="cambiarEstado(lead._id, 'CONTACTADO')" class="w-full text-xs font-bold bg-amber-100 text-amber-700 py-2 rounded hover:bg-amber-200">
                Mover a En Proceso ➡️
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna 2: En Proceso -->
      <div class="kanban-column bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 class="font-bold text-slate-700 mb-4 flex justify-between">
          <span>En Proceso / Contactado</span>
          <span class="bg-amber-100 text-amber-700 px-2 rounded-full text-sm">{{ leadsEnProceso.length }}</span>
        </h3>
        <div class="space-y-4">
          <div v-for="lead in leadsEnProceso" :key="lead._id" class="kanban-card bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition">
            <h4 class="font-bold text-slate-800">{{ lead.user?.nombre || 'Visitante/Invitado' }}</h4>
            <p class="text-sm text-slate-600 mb-2">📞 {{ lead.user?.telefono || 'No proporcionó' }}</p>
            <p class="text-xs bg-slate-100 p-2 rounded text-slate-700 mb-3 font-mono">Tipo: {{ lead.tipo_proyecto }}</p>
            <p class="text-xs text-slate-500 mb-3 font-bold text-emerald-600">Pto. Cotizado: ${{ (lead.costo_calculado || 0).toLocaleString('es-CO') }}</p>
            
            <div class="flex gap-2">
              <button @click="cambiarEstado(lead._id, 'CERRADO')" class="w-full text-xs font-bold bg-emerald-100 text-emerald-700 py-2 rounded hover:bg-emerald-200">
                Cerrar Venta (Éxito) ✅
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna 3: Finalizados / Vendidos -->
      <div class="kanban-column bg-slate-50 rounded-xl p-4 border border-slate-200 opacity-75">
        <h3 class="font-bold text-slate-700 mb-4 flex justify-between">
          <span>Finalizados / Vendidos</span>
          <span class="bg-emerald-100 text-emerald-700 px-2 rounded-full text-sm">{{ leadsFinalizados.length }}</span>
        </h3>
        <div class="space-y-4">
          <div v-for="lead in leadsFinalizados" :key="lead._id" class="kanban-card bg-white p-4 rounded-lg shadow-sm border border-slate-100">
            <h4 class="font-bold line-through text-slate-500">{{ lead.user?.nombre || 'Visitante/Invitado' }}</h4>
            <p class="text-xs text-slate-400 mt-2">Venta / Proceso completado.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'

const leads = ref([])

const leadsPendientes = computed(() => leads.value.filter(l => l.estado === 'PRELIMINAR'))
const leadsEnProceso = computed(() => leads.value.filter(l => l.estado === 'CONTACTADO'))
const leadsFinalizados = computed(() => leads.value.filter(l => l.estado === 'CERRADO'))

const cargarLeads = async () => {
  try {
    const { data } = await api.get('/crm/leads')
    leads.value = data
  } catch (error) {
    console.error('Error cargando CRM:', error)
  }
}

const cambiarEstado = async (id, nuevoEstado) => {
  try {
    await api.put(`/crm/leads/${id}/estado`, { estado: nuevoEstado })
    await cargarLeads()
  } catch (error) {
    alert('Error actualizando lead')
  }
}

onMounted(() => {
  cargarLeads()
})
</script>
