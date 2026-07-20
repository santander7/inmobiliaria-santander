<template>
  <div class="users-view">
    <div class="header-section">
      <h2 class="page-title">Gestión de Usuarios</h2>
      <button @click="$router.push('/dashboard/admin')" class="btn-secondary">
        Volver al Panel
      </button>
    </div>

    <div class="table-container">
      <div v-if="loading" class="state-message">
        Cargando usuarios...
      </div>
      
      <div v-else-if="error" class="state-error">
        {{ error }}
      </div>
      
      <div v-else class="table-wrapper">
        <table class="users-table">
          <thead>
            <tr class="table-header-row">
              <th class="table-header-cell">Nombre</th>
              <th class="table-header-cell">Correo</th>
              <th class="table-header-cell">Teléfono</th>
              <th class="table-header-cell">Rol</th>
              <th class="table-header-cell">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id" class="table-row">
              <td class="table-cell font-bold text-dark">{{ user.nombre }}</td>
              <td class="table-cell text-gray-600">{{ user.correo }}</td>
              <td class="table-cell text-gray-600">{{ user.telefono || 'No especificado' }}</td>
              <td class="table-cell">
                <span :class="{'role-admin': user.role === 'ADMIN', 'role-user': user.role === 'USER'}" class="badge">
                  {{ user.role }}
                </span>
              </td>
              <td class="table-cell">
                <span :class="{'status-active': user.activo, 'status-inactive': !user.activo}" class="badge">
                  {{ user.activo ? 'ACTIVO' : 'INACTIVO' }}
                </span>
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="5" class="empty-state">No hay usuarios registrados.</td>
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

const users = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchUsers = async () => {
  try {
    const response = await api.get('/auth/users');
    users.value = response.data;
  } catch (err) {
    error.value = 'Error al cargar los usuarios. Asegúrate de ser administrador.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.users-view {
  @apply space-y-6;
}

.header-section {
  @apply flex items-center justify-between;
}
.page-title {
  @apply text-2xl font-bold text-dark;
}
.btn-secondary {
  @apply px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors;
}

.table-container {
  @apply bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden;
}

.state-message {
  @apply p-8 text-center text-gray-500;
}
.state-error {
  @apply p-8 text-center text-red-500;
}
.empty-state {
  @apply p-8 text-center text-gray-500;
}

.table-wrapper {
  @apply overflow-x-auto;
}
.users-table {
  @apply w-full text-left border-collapse;
}

.table-header-row {
  @apply bg-gray-50 border-b border-gray-100;
}
.table-header-cell {
  @apply p-4 font-bold text-gray-500 text-sm uppercase;
}

.table-row {
  @apply border-b border-gray-50 hover:bg-gray-50/50 transition-colors;
}
.table-cell {
  @apply p-4;
}

.badge {
  @apply px-3 py-1 rounded-full text-xs font-bold;
}
.role-admin {
  @apply bg-primary/10 text-primary;
}
.role-user {
  @apply bg-blue-100 text-blue-600;
}
.status-active {
  @apply bg-green-100 text-green-600;
}
.status-inactive {
  @apply bg-red-100 text-red-600;
}
</style>
