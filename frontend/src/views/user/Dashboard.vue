<template>
<div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold">❤️</div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Favoritos</p>
          <p class="text-2xl font-bold text-dark">5 Propiedades</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div class="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-2xl font-bold">📄</div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Solicitudes</p>
          <p class="text-2xl font-bold text-dark">2 Activas</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div class="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl font-bold">📅</div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Citas</p>
          <p class="text-2xl font-bold text-dark">1 Próxima</p>
        </div>
      </div>
    </div>

    <!-- Módulo de Construcción Promocional -->
    <div class="bg-gradient-to-br from-dark to-darker rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="max-w-2xl">
          <span class="px-3 py-1 bg-primary/20 text-primary font-bold rounded-full text-xs uppercase tracking-wider mb-4 inline-block">Módulo de Construcción</span>
          <h2 class="text-3xl font-extrabold mb-4">Construye la casa de tus sueños</h2>
          <p class="text-gray-300 text-lg mb-6">Si ya elegiste un lote, podemos construir tu vivienda a medida. Dinos cuántos metros cuadrados, habitaciones y presupuesto tienes, y te generamos una cotización gratuita.</p>
          <button class="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-primary/30">
            Iniciar Cotización
          </button>
        </div>
        <div class="w-full md:w-1/3">
          <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <h3 class="font-bold text-xl mb-4 text-center">Calculadora Rápida</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-xs text-gray-300 mb-1">Metros Cuadrados (m²)</label>
                <input type="number" class="w-full bg-dark/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-primary focus:border-primary" placeholder="Ej: 100">
              </div>
              <div>
                <label class="block text-xs text-gray-300 mb-1">Habitaciones</label>
                <select class="w-full bg-dark/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-primary focus:border-primary">
                  <option>2</option><option>3</option><option>4+</option>
                </select>
              </div>
              <button class="w-full bg-white text-dark font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Calcular Estimado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

