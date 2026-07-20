<template>
  <div class="proyectos-view">
    <div class="header-section">
      <h2 class="page-title">Gestión de Obras Entregadas</h2>
      <div class="actions">
        <button @click="$router.push('/dashboard/admin')" class="btn-secondary mr-4">
          Volver
        </button>
        <button @click="$router.push('/dashboard/admin/add-proyecto')" class="btn-primary">
          Añadir Nueva Obra
        </button>
      </div>
    </div>

    <div class="table-container">
      <div v-if="loading" class="state-message">Cargando obras...</div>
      <div v-else-if="error" class="state-error">{{ error }}</div>
      
      <div v-else class="table-wrapper">
        <table class="proyectos-table">
          <thead>
            <tr class="table-header-row">
              <th class="table-header-cell">Imagen</th>
              <th class="table-header-cell">Título</th>
              <th class="table-header-cell">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="proyecto in proyectos" :key="proyecto._id" class="table-row">
              <td class="table-cell">
                <img :src="proyecto.imagenPrincipal" class="w-16 h-16 object-cover rounded-lg" />
              </td>
              <td class="table-cell font-bold text-dark">{{ proyecto.titulo }}</td>
              <td class="table-cell">
                <button @click="$router.push(`/dashboard/admin/edit-proyecto/${proyecto._id}`)" class="text-blue-500 font-bold hover:text-blue-700 mr-4">Editar</button>
                <button @click="deleteProyecto(proyecto._id)" class="text-red-500 font-bold hover:text-red-700">Eliminar</button>
              </td>
            </tr>
            <tr v-if="proyectos.length === 0">
              <td colspan="3" class="empty-state">No hay obras registradas.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const proyectos = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchProyectos = async () => {
  try {
    const res = await api.get('/proyectos');
    proyectos.value = res.data;
  } catch (err) {
    error.value = 'Error al cargar las obras';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const deleteProyecto = async (id) => {
  if (!confirm('¿Estás seguro de eliminar esta obra?')) return;
  try {
    await api.delete(`/proyectos/${id}`);
    proyectos.value = proyectos.value.filter(p => p._id !== id);
  } catch (err) {
    alert('Error al eliminar');
  }
};

onMounted(() => {
  fetchProyectos();
});
</script>

<style scoped>
.proyectos-view { @apply space-y-6; }
.header-section { @apply flex items-center justify-between; }
.page-title { @apply text-2xl font-bold text-dark; }
.btn-primary { @apply px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors; }
.btn-secondary { @apply px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors; }
.table-container { @apply bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden; }
.state-message, .state-error, .empty-state { @apply p-8 text-center text-gray-500; }
.state-error { @apply text-red-500; }
.table-wrapper { @apply overflow-x-auto; }
.proyectos-table { @apply w-full text-left border-collapse; }
.table-header-row { @apply bg-gray-50 border-b border-gray-100; }
.table-header-cell { @apply p-4 font-bold text-gray-500 text-sm uppercase; }
.table-row { @apply border-b border-gray-50 hover:bg-gray-50/50 transition-colors; }
.table-cell { @apply p-4; }
</style>
