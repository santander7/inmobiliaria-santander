<template>
<div class="user-dashboard">
    
    <!-- Estadísticas / Tarjetas Superiores (Estilo Premium) -->
    <div class="stats-grid">
      <div @click="abrirModal('favoritos')" class="stat-card group">
        <div class="stat-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </div>
        <div>
          <p class="stat-label">Favoritos</p>
          <p class="stat-value">0 Guardados</p>
        </div>
      </div>
      <div @click="abrirModal('cotizaciones')" class="stat-card group">
        <div class="stat-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
        <div>
          <p class="stat-label">Cotizaciones</p>
          <p class="stat-value">0 Activas</p>
        </div>
      </div>
      <div @click="abrirModal('citas')" class="stat-card group">
        <div class="stat-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <div>
          <p class="stat-label">Citas y Asesorías</p>
          <p class="stat-value">Ninguna</p>
        </div>
      </div>
    </div>

    <!-- Módulo Central interactivo -->
    <div class="interactive-module">
      <!-- Fondo decorativo -->
      <div class="module-decor"></div>
      
      <div class="module-content">
        
        <!-- Texto Promocional -->
        <div class="module-text-section">
          <span class="module-badge">
            Cotizador Integral
          </span>
          <h2 class="module-title">
            Construye la <span class="text-gradient">casa de tus sueños</span>
          </h2>
          <p class="module-description">
            Desde la elección del lote perfecto en Puerto Asís hasta la entrega de llaves. 
            Utiliza nuestra herramienta avanzada para obtener un presupuesto detallado, transparente y sin compromisos.
          </p>
          <router-link to="/dashboard/cotizador" class="btn-primary group">
            Abrir Cotizador Inteligente
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </router-link>
        </div>

        <!-- Asesor Virtual Interactivo (Reemplaza la vieja calculadora) -->
        <div class="module-interactive-section">
          <div class="interactive-card">
            
            <div class="card-header">
              <div class="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <div>
                <h3 class="card-title">Asesor Virtual de Proyectos</h3>
                <p class="card-subtitle">Descubre qué podemos hacer por ti.</p>
              </div>
            </div>

            <div class="card-body">
              <div>
                <label class="slider-label">
                  ¿Cuál es tu presupuesto actual?
                  <span class="slider-value">
                    {{ formatCurrency(presupuestoSlider) }}
                  </span>
                </label>
                <!-- Slider Range -->
                <input 
                  type="range" 
                  min="20000000" 
                  max="500000000" 
                  step="5000000" 
                  v-model="presupuestoSlider"
                  class="custom-slider"
                >
                <div class="slider-limits">
                  <span>$20M</span>
                  <span>$500M+</span>
                </div>
              </div>

              <!-- Recommendation Engine Output -->
              <div class="recommendation-box">
                <p class="recommendation-title">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" /></svg>
                  Nuestra Recomendación:
                </p>
                <p class="recommendation-text">
                  {{ recomendacionDinamica }}
                </p>
              </div>

              <a :href="whatsappAsesorLink" target="_blank" class="btn-outline group">
                Hablemos de este plan
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    <!-- Módulo de Avance de Obra (Transparencia Total) -->
    <div class="progress-module">
      <div class="progress-header">
        <div>
          <h3 class="progress-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            Avance de tu Obra
          </h3>
          <p class="progress-subtitle">Sigue el paso a paso de tu proyecto sin salir de casa.</p>
        </div>
        <div class="project-badge">
          <p class="project-badge-label">Proyecto Activo</p>
          <p class="project-badge-value">Casa Campestre (Lote 4)</p>
        </div>
      </div>

      <!-- Timeline de Construcción -->
      <div class="timeline">
        
        <!-- Etapa 1: Completada -->
        <div class="timeline-item">
          <div class="timeline-dot dot-completed"></div>
          <p class="timeline-status text-emerald-500">Fase 1 • Completado (100%)</p>
          <h4 class="timeline-title">Planos y Licencias</h4>
          <p class="timeline-description">Diseño arquitectónico aprobado y licencias de construcción emitidas por la Curaduría de Puerto Asís.</p>
          <div class="timeline-actions">
            <div class="action-card">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <div>
                <p class="action-card-title">Ver Planos .PDF</p>
                <p class="action-card-subtitle">Descargar (2.4 MB)</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Etapa 2: En progreso -->
        <div class="timeline-item">
          <div class="timeline-dot dot-progress"></div>
          <p class="timeline-status text-[#0F172A]">Fase 2 • En Progreso (60%)</p>
          <h4 class="timeline-title">Cimientos y Estructura</h4>
          <p class="timeline-description">Estamos levantando los muros principales y fundiendo las columnas según las normas de sismo resistencia.</p>
          <div class="gallery-grid">
            <img src="https://images.unsplash.com/photo-1541888086925-0c13d3cc0a44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Avance de Obra 1" class="gallery-img">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Avance de Obra 2" class="gallery-img">
          </div>
        </div>

        <!-- Etapa 3: Pendiente -->
        <div class="timeline-item opacity-50">
          <div class="timeline-dot dot-pending"></div>
          <p class="timeline-status text-slate-400">Fase 3 • Próximamente</p>
          <h4 class="timeline-title">Acabados y Entrega</h4>
          <p class="timeline-description">Instalación de pisos, carpintería, pintura y detalles finales para la entrega oficial de llaves.</p>
        </div>

      </div>
    </div>

    <!-- Modales de las Tarjetas (Empty States) -->
    <div v-if="modalActivo" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-content-box">
        <button @click="cerrarModal" class="btn-close">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div class="modal-body">
          <div class="modal-icon">
            <!-- Icono dinámico según el modal -->
            <svg v-if="modalActivo === 'favoritos'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <svg v-else-if="modalActivo === 'cotizaciones'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          
          <h3 class="modal-title">
            <span v-if="modalActivo === 'favoritos'">No hay Favoritos</span>
            <span v-if="modalActivo === 'cotizaciones'">Aún no has cotizado</span>
            <span v-if="modalActivo === 'citas'">Sin citas agendadas</span>
          </h3>
          
          <p class="modal-description">
            <span v-if="modalActivo === 'favoritos'">Parece que aún no has guardado ninguna propiedad. Explora nuestro catálogo y marca las que te gusten para guardarlas aquí.</span>
            <span v-if="modalActivo === 'cotizaciones'">Cuando realices una cotización en nuestra plataforma, podrás guardarla y aparecerá en este panel.</span>
            <span v-if="modalActivo === 'citas'">Si solicitas una asesoría por videollamada o visita presencial, el recordatorio aparecerá en este calendario.</span>
          </p>

          <router-link v-if="modalActivo === 'favoritos'" to="/" class="btn-modal">Explorar Catálogo</router-link>
          <router-link v-if="modalActivo === 'cotizaciones'" to="/dashboard/cotizador" class="btn-modal">Ir al Cotizador</router-link>
          <a v-if="modalActivo === 'citas'" href="https://wa.me/3175192043?text=Hola,%20quisiera%20agendar%20una%20asesor%C3%ADa" target="_blank" class="btn-modal">Agendar por WhatsApp</a>
        </div>
      </div>
    </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const presupuestoSlider = ref(150000000)
const modalActivo = ref(null)

const abrirModal = (tipo) => {
  modalActivo.value = tipo
}
const cerrarModal = () => {
  modalActivo.value = null
}

const formatCurrency = (val) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val)
}

// Motor de recomendación dinámica basado en el slider
const recomendacionDinamica = computed(() => {
  const p = parseInt(presupuestoSlider.value)
  
  if (p < 55000000) {
    return "Con este presupuesto podemos separar un Lote Campestre o Iniciar la cuota inicial de un Lote Periférico en Puerto Asís. ¡Te ayudamos a financiar el saldo a plazos!"
  } else if (p >= 55000000 && p < 120000000) {
    return "¡Perfecto! Tienes suficiente para comprar un Lote Urbano Periférico de contado. Si ya tienes lote, te alcanza para construir la Obra Gris de tu casa (Estructura sólida, cimientos y techo)."
  } else if (p >= 120000000 && p < 200000000) {
    return "Excelente presupuesto. Podemos construir una Casa Moderna de 1 piso full terminada (Llave en mano) en tu propio lote, o comprar un lote y construir en Obra Gris."
  } else if (p >= 200000000 && p < 350000000) {
    return "Inversión ideal. Te garantizamos la compra de un buen Lote y la construcción total de una Casa de 1 piso con acabados Estándar, todo 100% legalizado."
  } else {
    return "¡Un proyecto ambicioso! Con este capital podemos desarrollar una Casa de 2 Pisos con Acabados Premium en una zona exclusiva de Puerto Asís. Todo incluido, desde planos hasta escrituras."
  }
})

const whatsappAsesorLink = computed(() => {
  const msg = `Hola equipo Inmobiliaria Santander. Estaba en el Asesor Virtual y tengo un presupuesto de ${formatCurrency(presupuestoSlider.value)}. Me interesa su recomendación: "${recomendacionDinamica.value}". ¿Podemos agendar una cita gratuita?`
  return `https://wa.me/3175192043?text=${encodeURIComponent(msg)}`
})
</script>

<style scoped>
.user-dashboard {
  @apply space-y-8 font-sans text-slate-800;
}

.stats-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-6;
}

.stat-card {
  @apply bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow cursor-pointer;
}
.stat-icon-wrapper {
  @apply w-14 h-14 bg-slate-50 text-slate-400 group-hover:text-[#0F172A] group-hover:bg-slate-100 rounded-xl flex items-center justify-center transition-colors border border-slate-100;
}
.stat-label {
  @apply text-xs uppercase tracking-wider text-slate-400 font-bold;
}
.stat-value {
  @apply text-2xl font-extrabold text-slate-900;
}

.interactive-module {
  @apply bg-[#0F172A] rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800;
}
.module-decor {
  @apply absolute -right-20 -top-20 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl pointer-events-none;
}
.module-content {
  @apply relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12;
}

.module-text-section {
  @apply w-full lg:w-1/2;
}
.module-badge {
  @apply px-4 py-1.5 bg-white/10 backdrop-blur-md text-white font-bold rounded-full text-[10px] uppercase tracking-[0.2em] mb-6 inline-flex border border-white/10 shadow-sm;
}
.module-title {
  @apply text-3xl md:text-5xl font-extrabold mb-6 leading-tight;
}
.text-gradient {
  @apply text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500;
}
.module-description {
  @apply text-slate-400 text-lg mb-8 leading-relaxed font-light;
}
.btn-primary {
  @apply inline-flex items-center gap-3 bg-white text-[#0F172A] hover:bg-slate-200 font-bold py-3.5 px-8 rounded-xl transition-all shadow-xl text-sm uppercase tracking-wider;
}

.module-interactive-section {
  @apply w-full lg:w-1/2;
}
.interactive-card {
  @apply bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-inner;
}
.card-header {
  @apply flex items-center gap-3 mb-6 border-b border-white/10 pb-4;
}
.card-icon {
  @apply w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center;
}
.card-title {
  @apply font-extrabold text-lg text-white;
}
.card-subtitle {
  @apply text-xs text-slate-400 font-medium;
}

.card-body {
  @apply space-y-6;
}
.slider-label {
  @apply flex justify-between text-sm font-medium text-slate-300 mb-4;
}
.slider-value {
  @apply text-white font-bold bg-white/10 px-3 py-1 rounded-full text-xs;
}
.custom-slider {
  @apply w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-white;
}
.slider-limits {
  @apply flex justify-between text-[10px] text-slate-500 mt-2 font-bold uppercase;
}

.recommendation-box {
  @apply bg-[#0F172A]/50 p-5 rounded-2xl border border-slate-700/50;
}
.recommendation-title {
  @apply text-sm text-emerald-400 font-bold mb-2 flex items-center gap-2;
}
.recommendation-text {
  @apply text-sm text-slate-300 leading-relaxed min-h-[60px];
}

.btn-outline {
  @apply w-full bg-transparent border-2 border-slate-600 hover:border-white text-white font-bold py-3 px-4 rounded-xl transition-all flex justify-center items-center gap-2 text-sm uppercase tracking-wider;
}

.progress-module {
  @apply bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 mt-8;
}
.progress-header {
  @apply flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4;
}
.progress-title {
  @apply text-2xl font-extrabold text-slate-900 flex items-center gap-2;
}
.progress-subtitle {
  @apply text-slate-500 text-sm mt-1;
}
.project-badge {
  @apply bg-slate-50 px-4 py-2 rounded-lg border border-slate-200;
}
.project-badge-label {
  @apply text-[10px] uppercase tracking-widest font-bold text-slate-400;
}
.project-badge-value {
  @apply text-sm font-bold text-slate-800;
}

.timeline {
  @apply relative border-l-2 border-slate-100 ml-4 md:ml-6 space-y-10 py-4;
}
.timeline-item {
  @apply relative pl-8 md:pl-12;
}
.timeline-dot {
  @apply absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm;
}
.dot-completed {
  @apply bg-emerald-500;
}
.dot-progress {
  @apply bg-[#0F172A] ring-2 ring-[#0F172A]/20;
}
.dot-pending {
  @apply bg-slate-200;
}

.timeline-status {
  @apply text-xs font-bold uppercase tracking-wider mb-1;
}
.timeline-title {
  @apply text-lg font-bold text-slate-900 mb-2;
}
.timeline-description {
  @apply text-sm text-slate-500 leading-relaxed mb-4;
}

.timeline-actions {
  @apply flex gap-4;
}
.action-card {
  @apply bg-slate-50 rounded-lg p-3 border border-slate-200 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-colors;
}
.action-card-title {
  @apply text-xs font-bold text-slate-700;
}
.action-card-subtitle {
  @apply text-[10px] text-slate-400;
}

.gallery-grid {
  @apply grid grid-cols-2 md:grid-cols-4 gap-4;
}
.gallery-img {
  @apply rounded-lg h-24 w-full object-cover shadow-sm border border-slate-200 cursor-zoom-in hover:opacity-90;
}

.modal-overlay {
  @apply fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#0F172A]/80 backdrop-blur-sm transition-opacity;
}
.modal-content-box {
  @apply bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 border border-slate-100 relative transform transition-all;
}
.btn-close {
  @apply absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors;
}
.modal-body {
  @apply text-center;
}
.modal-icon {
  @apply w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100;
}
.modal-title {
  @apply text-xl font-bold text-slate-900 mb-2;
}
.modal-description {
  @apply text-slate-500 text-sm mb-8 leading-relaxed;
}
.btn-modal {
  @apply block w-full py-3 px-4 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-lg transition-colors text-sm uppercase tracking-wider;
}
</style>
