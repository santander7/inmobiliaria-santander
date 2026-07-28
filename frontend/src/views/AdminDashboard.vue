<template>
<div class="admin-dashboard">
    
    <div class="stats-grid">
      <div class="stat-card stat-primary">
        <p class="stat-label">Propiedades Totales</p>
        <p class="stat-value">124</p>
      </div>
      <div class="stat-card stat-blue">
        <p class="stat-label">Usuarios Activos</p>
        <p class="stat-value">890</p>
      </div>
      <div class="stat-card stat-orange">
        <p class="stat-label">Cotizaciones (Construcción)</p>
        <p class="stat-value">12</p>
      </div>
      <div class="stat-card stat-red">
        <p class="stat-label">Solicitudes Pendientes</p>
        <p class="stat-value">5</p>
      </div>
    </div>

    <div class="modules-grid">
      <!-- Chart.js Real Integration -->
      <div class="module-card">
        <h3 class="module-title">Visitas Mensuales a Propiedades (Miles)</h3>
        <div class="chart-container">
          <Bar v-if="chartData.labels" :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="module-card">
        <h3 class="module-title">Acciones Rápidas</h3>
        <div class="actions-list">
          <button @click="$router.push('/dashboard/admin/add-propiedad')" class="action-btn action-primary">
            <span class="action-text">Añadir Nueva Propiedad</span>
            <span class="action-icon icon-primary">+</span>
          </button>
          <button @click="$router.push('/dashboard/admin/crm')" class="action-btn action-blue">
            <span class="action-text">Revisar Gestor CRM</span>
            <span class="action-icon icon-blue">5</span>
          </button>
          <button @click="$router.push('/dashboard/admin/usuarios')" class="action-btn action-orange">
            <span class="action-text">Gestión de Usuarios</span>
            <span class="action-icon icon-orange">→</span>
          </button>
          <button @click="$router.push('/dashboard/admin/proyectos')" class="action-btn action-primary">
            <span class="action-text">Gestión de Obras Entregadas</span>
            <span class="action-icon icon-primary">🏠</span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const chartData = ref({
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Visitas Orgánicas',
      backgroundColor: '#003366',
      borderRadius: 4,
      data: [12.5, 14.2, 11.8, 16.5, 19.2, 22.4]
    },
    {
      label: 'Tráfico de Redes',
      backgroundColor: '#10B981',
      borderRadius: 4,
      data: [8.1, 9.4, 12.0, 14.2, 15.8, 18.5]
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' }
  },
  scales: {
    y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
    x: { grid: { display: false } }
  }
})
</script>

<style scoped>
.admin-dashboard {
  @apply space-y-8;
}

.stats-grid {
  @apply grid grid-cols-1 md:grid-cols-4 gap-6;
}

.stat-card {
  @apply bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow;
}
.stat-primary {
  @apply border-l-4 border-l-primary;
}
.stat-blue {
  @apply border-l-4 border-l-blue-500;
}
.stat-orange {
  @apply border-l-4 border-l-orange-500;
}
.stat-red {
  @apply border-l-4 border-l-red-500;
}
.stat-label {
  @apply text-sm text-gray-500 font-medium;
}
.stat-value {
  @apply text-3xl font-extrabold text-dark mt-2;
}

.modules-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-8;
}

.module-card {
  @apply bg-white p-6 rounded-3xl shadow-sm border border-gray-100;
}
.module-title {
  @apply font-bold text-lg text-dark mb-4;
}

.chart-container {
  @apply h-72 w-full mt-4;
}

.actions-list {
  @apply space-y-4;
}
.action-btn {
  @apply w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 transition-colors;
}
.action-text {
  @apply font-bold text-dark;
}
.action-icon {
  @apply w-8 h-8 rounded-lg flex items-center justify-center;
}

/* Primary Action */
.action-primary {
  @apply hover:border-primary hover:bg-primary/5;
}
.action-primary:hover .action-text {
  @apply text-primary;
}
.icon-primary {
  @apply bg-primary/10 text-primary text-xl;
}

/* Blue Action */
.action-blue {
  @apply hover:border-blue-500 hover:bg-blue-50;
}
.action-blue:hover .action-text {
  @apply text-blue-600;
}
.icon-blue {
  @apply bg-blue-100 text-blue-600 font-bold;
}

/* Orange Action */
.action-orange {
  @apply hover:border-orange-500 hover:bg-orange-50;
}
.action-orange:hover .action-text {
  @apply text-orange-600;
}
.icon-orange {
  @apply bg-orange-100 text-orange-600;
}
</style>
