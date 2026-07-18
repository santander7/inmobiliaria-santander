<template>
  <div class="add-propiedad-view">
    <div class="header-section">
      <h2 class="page-title">Añadir Nueva Propiedad</h2>
      <button @click="$router.push('/dashboard/admin')" class="btn-secondary">
        Cancelar
      </button>
    </div>

    <form @submit.prevent="submitForm" class="form-container">
      
      <div class="form-grid">
        <!-- Título -->
        <div class="form-group full-width">
          <label class="form-label">Título de la Propiedad</label>
          <input v-model="form.titulo" type="text" required class="form-input" placeholder="Ej: Hermosa Casa en el Centro">
        </div>

        <!-- Descripción -->
        <div class="form-group full-width">
          <label class="form-label">Descripción</label>
          <textarea v-model="form.descripcion" required rows="4" class="form-textarea" placeholder="Describe los detalles..."></textarea>
        </div>

        <!-- Precio -->
        <div class="form-group">
          <label class="form-label">Precio (COP)</label>
          <input v-model.number="form.precio" type="number" required class="form-input" placeholder="Ej: 150000000">
        </div>

        <!-- Municipio -->
        <div class="form-group">
          <label class="form-label">Municipio</label>
          <input v-model="form.municipio" type="text" required class="form-input" placeholder="Ej: Puerto Asís">
        </div>

        <!-- Área -->
        <div class="form-group">
          <label class="form-label">Área (m²)</label>
          <input v-model.number="form.area" type="number" required class="form-input" placeholder="Ej: 120">
        </div>

        <!-- Tipo -->
        <div class="form-group">
          <label class="form-label">Tipo de Inmueble</label>
          <select v-model="form.tipo" required class="form-select">
            <option value="CASA">Casa</option>
            <option value="LOTE">Lote</option>
          </select>
        </div>

        <!-- Estado -->
        <div class="form-group">
          <label class="form-label">Estado de Venta</label>
          <select v-model="form.estado" required class="form-select">
            <option value="DISPONIBLE">Disponible</option>
            <option value="RESERVADO">Reservado</option>
            <option value="VENDIDO">Vendido</option>
          </select>
        </div>

        <!-- Características Extras (Habitaciones, Baños) solo si es CASA -->
        <div v-if="form.tipo === 'CASA'" class="form-group">
          <label class="form-label">Habitaciones</label>
          <input v-model.number="form.caracteristicas.habitaciones" type="number" class="form-input" placeholder="Ej: 3">
        </div>
        <div v-if="form.tipo === 'CASA'" class="form-group">
          <label class="form-label">Baños</label>
          <input v-model.number="form.caracteristicas.banos" type="number" class="form-input" placeholder="Ej: 2">
        </div>
      </div>

      <hr class="form-divider">

      <!-- Subida de Imágenes -->
      <div class="form-group full-width">
        <label class="form-label">Fotografías (Sube múltiples imágenes)</label>
        <div class="upload-container">
          <label class="upload-dropzone">
            <div class="upload-content">
              <span class="upload-icon">📸</span>
              <p class="upload-title">Haz clic para seleccionar imágenes</p>
              <p class="upload-subtitle">PNG, JPG (Máx. 5 fotos)</p>
            </div>
            <input type="file" class="hidden" multiple accept="image/*" @change="handleFileUpload" />
          </label>
        </div>
        
        <!-- Previsualización de nombres de archivos -->
        <div v-if="files.length > 0" class="file-preview">
          <p class="preview-title">Archivos seleccionados:</p>
          <ul class="preview-list">
            <li v-for="(file, index) in files" :key="index">{{ file.name }}</li>
          </ul>
        </div>
      </div>

      <!-- Alertas -->
      <div v-if="error" class="alert alert-error">
        {{ error }}
      </div>
      <div v-if="success" class="alert alert-success">
        ¡Propiedad subida exitosamente! Redirigiendo...
      </div>

      <!-- Botón de Envío -->
      <div class="form-actions">
        <button type="submit" :disabled="loading" class="btn-submit">
          <span v-if="loading" class="spinner"></span>
          <span>{{ loading ? 'Subiendo Propiedad...' : 'Publicar Propiedad' }}</span>
        </button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const loading = ref(false);
const error = ref('');
const success = ref(false);

const form = reactive({
  titulo: '',
  descripcion: '',
  precio: null,
  municipio: 'Puerto Asís',
  area: null,
  tipo: 'CASA',
  estado: 'DISPONIBLE',
  caracteristicas: {
    habitaciones: null,
    banos: null
  }
});

const files = ref([]);

const handleFileUpload = (event) => {
  const selectedFiles = Array.from(event.target.files);
  if (selectedFiles.length > 5) {
    error.value = "Solo puedes subir un máximo de 5 imágenes a la vez.";
    return;
  }
  error.value = '';
  files.value = selectedFiles;
};

const submitForm = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const formData = new FormData();
    formData.append('titulo', form.titulo);
    formData.append('descripcion', form.descripcion);
    formData.append('precio', form.precio);
    formData.append('municipio', form.municipio);
    formData.append('area', form.area);
    formData.append('tipo', form.tipo);
    formData.append('estado', form.estado);
    formData.append('caracteristicas', JSON.stringify(form.caracteristicas));

    files.value.forEach(file => {
      formData.append('imagenes', file);
    });

    const token = localStorage.getItem('token');
    
    await axios.post('http://localhost:3000/api/propiedades', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    success.value = true;
    setTimeout(() => {
      router.push('/dashboard/admin');
    }, 2000);
    
  } catch (err) {
    console.error(err);
    error.value = err.response?.data?.message || 'Ocurrió un error al subir la propiedad.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.add-propiedad-view {
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

.form-container {
  @apply bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6;
}

.form-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.form-group {
  @apply space-y-2;
}
.full-width {
  @apply md:col-span-2;
}
.form-label {
  @apply block text-sm font-bold text-gray-700;
}

.form-input, .form-textarea, .form-select {
  @apply w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all;
}

.form-divider {
  @apply border-gray-100 my-6;
}

.upload-container {
  @apply flex items-center justify-center w-full;
}
.upload-dropzone {
  @apply flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-primary transition-all;
}
.upload-content {
  @apply flex flex-col items-center justify-center pt-5 pb-6 text-gray-500;
}
.upload-icon {
  @apply text-4xl mb-2;
}
.upload-title {
  @apply mb-2 text-sm font-semibold;
}
.upload-subtitle {
  @apply text-xs;
}

.file-preview {
  @apply mt-4;
}
.preview-title {
  @apply text-sm font-bold text-gray-700 mb-2;
}
.preview-list {
  @apply list-disc pl-5 text-sm text-gray-600 space-y-1;
}

.alert {
  @apply p-4 rounded-xl text-sm font-medium;
}
.alert-error {
  @apply bg-red-50 text-red-600;
}
.alert-success {
  @apply bg-green-50 text-green-600;
}

.form-actions {
  @apply flex justify-end pt-4;
}
.btn-submit {
  @apply px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:opacity-90 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center space-x-2 shadow-lg shadow-primary/30;
}

.spinner {
  @apply w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin;
}
</style>
