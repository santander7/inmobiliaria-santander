<template>
<div class="min-h-screen bg-light font-sans text-darker selection:bg-primary selection:text-white">
    <!-- Navbar -->
    <header class="fixed w-full z-50 transition-all duration-300" :class="{ 'bg-white/80 backdrop-blur-md shadow-sm': scrolled, 'bg-transparent': !scrolled }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
              S
            </div>
            <span class="font-bold text-xl tracking-tight text-dark">Inmobiliaria & Constructora<span class="text-primary">Santander</span></span>
          </div>
          <nav class="hidden md:flex space-x-8">
            <a href="#inicio" class="text-dark hover:text-primary font-medium transition-colors">Inicio</a>
            <a href="#servicios" class="text-dark hover:text-primary font-medium transition-colors">Servicios</a>
            <a href="#nosotros" class="text-dark hover:text-primary font-medium transition-colors">Nosotros</a>
            <a href="#propiedades" class="text-dark hover:text-primary font-medium transition-colors">Propiedades</a>
          </nav>
          <div class="flex items-center space-x-4">
            <router-link to="/login" class="hidden md:block text-dark font-medium hover:text-primary transition-colors">Iniciar Sesión</router-link>
            <router-link to="/registro" class="bg-primary hover:bg-secondary text-white px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-primary/30">
              Registrarse
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section id="inicio" class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <!-- Background Decorations -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div class="absolute top-40 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center max-w-4xl mx-auto">
          <span class="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
            Trámites 100% legales y escrituras al día
          </span>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-dark tracking-tight mb-8 leading-tight">
            Encuentra el lugar donde <br class="hidden md:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">construir tu futuro</span>
          </h1>
          <p class="mt-4 text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Venta de lotes, casas y asesoría para construir la vivienda de tus sueños en Putumayo. Más de 10 años de experiencia a tu servicio.
          </p>
          <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#propiedades" class="w-full sm:w-auto px-8 py-4 bg-dark text-white rounded-full font-bold text-lg hover:bg-darker transition-all transform hover:-translate-y-1 shadow-xl flex items-center justify-center gap-2">
              Ver Propiedades
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="https://wa.me/3175192043" target="_blank" class="w-full sm:w-auto px-8 py-4 bg-white text-dark border-2 border-gray-200 rounded-full font-bold text-lg hover:border-primary hover:text-primary transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Solicitar Asesoría
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Beneficios / Nosotros -->
    <section id="nosotros" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div class="bg-light p-8 rounded-3xl hover:shadow-xl transition-shadow border border-gray-100 group">
            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-dark mb-4">Totalmente Legal y Seguro</h3>
            <p class="text-gray-600">Procesos 100% legales con escrituras al día. Negocios transparentes y confiables con nuestros clientes.</p>
          </div>

          <div class="bg-light p-8 rounded-3xl hover:shadow-xl transition-shadow border border-gray-100 group">
            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-dark mb-4">Facilidades de Pago</h3>
            <p class="text-gray-600">Aceptamos pago de contado, financiamiento con banco y a plazos (máximo 6 meses).</p>
          </div>

          <div class="bg-light p-8 rounded-3xl hover:shadow-xl transition-shadow border border-gray-100 group">
            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-dark mb-4">Construcción a tu Medida</h3>
            <p class="text-gray-600">Si compras un lote, te construimos la casa a tu gusto con pago adelantado. Asesoría y cotización totalmente gratis.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- Sección Buscador Inteligente y Propiedades -->
    <section id="propiedades" class="py-20 bg-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-extrabold text-dark tracking-tight">Encuentra tu Propiedad Ideal</h2>
          <p class="mt-4 text-xl text-gray-500">Usa nuestro buscador inteligente para filtrar por municipio, precio y más.</p>
        </div>

        <!-- Buscador -->
        <div class="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 mb-12 border border-gray-100 relative z-20">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select class="w-full bg-light border-transparent rounded-xl px-4 py-3 text-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none">
                <option value="">Todos</option>
                <option value="CASA">Casas</option>
                <option value="LOTE">Lotes</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Municipio</label>
              <select class="w-full bg-light border-transparent rounded-xl px-4 py-3 text-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none">
                <option value="">Todos los municipios</option>
                <option value="Mocoa">Mocoa</option>
                <option value="Puerto Asís">Puerto Asís</option>
                <option value="Villagarzón">Villagarzón</option>
                <option value="Sibundoy">Sibundoy</option>
                <option value="Orito">Orito</option>
                <option value="Valle del Guamuez">Valle del Guamuez</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Colón">Colón</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Precio Mín.</label>
              <input type="number" placeholder="$0" class="w-full bg-light border-transparent rounded-xl px-4 py-3 text-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Precio Máx.</label>
              <input type="number" placeholder="$ Sin límite" class="w-full bg-light border-transparent rounded-xl px-4 py-3 text-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none">
            </div>
            <div>
              <button class="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
                Buscar
              </button>
            </div>
          </div>
        </div>

        <!-- Grid de Propiedades (Mockups temporales) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 group cursor-pointer flex flex-col h-full">
            <div class="relative h-64 overflow-hidden bg-gray-200">
              <div class="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent z-10"></div>
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Casa en Mocoa" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <div class="absolute top-4 right-4 z-20 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                CASA
              </div>
              <div class="absolute bottom-4 left-4 z-20">
                <p class="text-white font-bold text-2xl">$ 250.000.000</p>
                <p class="text-white/90 text-sm flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Mocoa, Putumayo
                </p>
              </div>
            </div>
            <div class="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 class="text-xl font-bold text-dark mb-2">Casa Moderna Familiar</h3>
                <div class="flex items-center gap-4 text-sm text-gray-500 mb-4 border-b border-gray-100 pb-4">
                  <span class="flex items-center gap-1">🛏️ 3 Hab</span>
                  <span class="flex items-center gap-1">🚿 2 Baños</span>
                  <span class="flex items-center gap-1">📐 120 m²</span>
                </div>
              </div>
              <button class="w-full py-2.5 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors">
                Ver Detalles
              </button>
            </div>
          </div>

          <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 group cursor-pointer flex flex-col h-full">
            <div class="relative h-64 overflow-hidden bg-gray-200">
              <div class="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent z-10"></div>
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Lote en Puerto Asís" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <div class="absolute top-4 right-4 z-20 bg-secondary text-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                LOTE
              </div>
              <div class="absolute bottom-4 left-4 z-20">
                <p class="text-white font-bold text-2xl">$ 85.000.000</p>
                <p class="text-white/90 text-sm flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Puerto Asís, Putumayo
                </p>
              </div>
            </div>
            <div class="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 class="text-xl font-bold text-dark mb-2">Lote Campestre Listo para Construir</h3>
                <div class="flex items-center gap-4 text-sm text-gray-500 mb-4 border-b border-gray-100 pb-4">
                  <span class="flex items-center gap-1">📐 500 m²</span>
                  <span class="flex items-center gap-1">💡 Servicios listos</span>
                </div>
              </div>
              <button class="w-full py-2.5 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors">
                Ver Detalles
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
