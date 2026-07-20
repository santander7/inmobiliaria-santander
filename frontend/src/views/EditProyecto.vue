<template>
  <div class="edit-proyecto">
    <div class="header-section">
      <h2 class="page-title">Editar Obra Entregada</h2>
      <button @click="$router.push('/dashboard/admin/proyectos')" class="btn-secondary">Volver</button>
    </div>

    <div v-if="loadingData" class="text-center p-8 text-gray-500">
      Cargando información de la obra...
    </div>

    <form v-else @submit.prevent="submitProyecto" class="form-container">
      <div class="form-group">
        <label>Título General</label>
        <input v-model="form.titulo" required class="form-input" />
      </div>

      <div class="form-group">
        <label>Descripción General</label>
        <textarea v-model="form.descripcion" required class="form-textarea" rows="3"></textarea>
      </div>

      <div class="form-group">
        <label>Foto Principal (Sube una imagen para reemplazarla)</label>
        <input type="file" @change="uploadMainImage" accept="image/*" class="file-input" />
        <div v-if="form.imagenPrincipal" class="mt-2">
          <img :src="form.imagenPrincipal" class="w-32 h-32 object-cover rounded-lg" />
        </div>
        <p v-if="uploadingMain" class="text-sm text-blue-500">Subiendo nueva imagen...</p>
      </div>

      <hr class="my-8" />
      <h3 class="text-xl font-bold mb-4">Recorrido Fotográfico (Detalles)</h3>
      
      <div v-for="(detalle, index) in form.detalles" :key="index" class="detalle-card">
        <div class="flex justify-between items-center mb-4">
          <h4 class="font-bold">Foto #{{ index + 1 }}</h4>
          <button type="button" @click="removeDetalle(index)" class="text-red-500 font-bold">Quitar</button>
        </div>
        
        <div class="form-group">
          <label>Título de la foto</label>
          <input v-model="detalle.titulo" required class="form-input" />
        </div>
        <div class="form-group">
          <label>Descripción / Acabados</label>
          <textarea v-model="detalle.texto" required class="form-textarea" rows="2"></textarea>
        </div>
        <div class="form-group">
          <label>Cambiar Foto</label>
          <input type="file" @change="uploadDetalleImage($event, index)" accept="image/*" class="file-input" />
          <div v-if="detalle.imagen" class="mt-2">
            <img :src="detalle.imagen" class="w-32 h-32 object-cover rounded-lg" />
          </div>
          <p v-if="detalle.uploading" class="text-sm text-blue-500">Subiendo...</p>
        </div>
      </div>

      <button type="button" @click="addDetalle" class="btn-add-detail w-full mb-8">
        + Añadir otra foto al recorrido
      </button>

      <div class="form-actions">
        <button type="submit" class="btn-primary w-full" :disabled="loading">
          {{ loading ? 'Guardando Cambios...' : 'Actualizar Proyecto' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const route = useRoute();
const projectId = route.params.id;

const form = ref({
  titulo: '',
  descripcion: '',
  imagenPrincipal: '',
  detalles: []
});

const loadingData = ref(true);
const loading = ref(false);
const uploadingMain = ref(false);

const loadProjectData = async () => {
  try {
    const res = await api.get(`/proyectos/${projectId}`);
    form.value = {
      titulo: res.data.titulo,
      descripcion: res.data.descripcion,
      imagenPrincipal: res.data.imagenPrincipal,
      detalles: res.data.detalles.map(d => ({ ...d, uploading: false }))
    };
  } catch (err) {
    alert('Error al cargar la obra');
    router.push('/dashboard/admin/proyectos');
  } finally {
    loadingData.value = false;
  }
};

onMounted(() => {
  loadProjectData();
});

const uploadImageToServer = async (file) => {
  const formData = new FormData();
  formData.append('imagen', file);
  const res = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data.url;
};

const uploadMainImage = async (e) => {
  if (!e.target.files[0]) return;
  uploadingMain.value = true;
  try {
    form.value.imagenPrincipal = await uploadImageToServer(e.target.files[0]);
  } catch (err) {
    alert('Error al subir imagen');
  } finally {
    uploadingMain.value = false;
  }
};

const addDetalle = () => {
  form.value.detalles.push({ titulo: '', texto: '', imagen: '', uploading: false });
};

const removeDetalle = (index) => {
  form.value.detalles.splice(index, 1);
};

const uploadDetalleImage = async (e, index) => {
  if (!e.target.files[0]) return;
  form.value.detalles[index].uploading = true;
  try {
    form.value.detalles[index].imagen = await uploadImageToServer(e.target.files[0]);
  } catch (err) {
    alert('Error al subir imagen');
  } finally {
    form.value.detalles[index].uploading = false;
  }
};

const submitProyecto = async () => {
  if (!form.value.imagenPrincipal) {
    return alert('Debes tener una foto principal');
  }
  for (const d of form.value.detalles) {
    if (!d.imagen) return alert('Todas las fotos del recorrido deben estar subidas');
  }

  loading.value = true;
  try {
    const dataToSend = {
      titulo: form.value.titulo,
      descripcion: form.value.descripcion,
      imagenPrincipal: form.value.imagenPrincipal,
      detalles: form.value.detalles.map(d => ({
        titulo: d.titulo,
        texto: d.texto,
        imagen: d.imagen
      }))
    };

    await api.put(`/proyectos/${projectId}`, dataToSend);
    alert('Obra actualizada con éxito');
    router.push('/dashboard/admin/proyectos');
  } catch (error) {
    alert('Error al actualizar: ' + (error.response?.data?.message || error.message));
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.edit-proyecto { @apply max-w-4xl mx-auto space-y-6; }
.header-section { @apply flex items-center justify-between; }
.page-title { @apply text-2xl font-bold text-dark; }
.btn-primary { @apply px-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors; }
.btn-secondary { @apply px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors; }
.btn-add-detail { @apply px-4 py-3 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg font-bold hover:bg-blue-100 transition-colors; }

.form-container { @apply bg-white p-8 rounded-3xl shadow-sm border border-gray-100; }
.form-group { @apply mb-6; }
.form-group label { @apply block text-sm font-bold text-gray-700 mb-2; }
.form-input, .form-textarea { @apply w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all; }
.file-input { @apply w-full; }

.detalle-card { @apply bg-gray-50 border border-gray-200 p-6 rounded-xl mb-6; }
</style>
