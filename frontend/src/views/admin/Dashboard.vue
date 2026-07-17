<template>
<div class="space-y-8">
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-primary hover:shadow-md transition-shadow">
        <p class="text-sm text-gray-500 font-medium">Propiedades Totales</p>
        <p class="text-3xl font-extrabold text-dark mt-2">124</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
        <p class="text-sm text-gray-500 font-medium">Usuarios Activos</p>
        <p class="text-3xl font-extrabold text-dark mt-2">890</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
        <p class="text-sm text-gray-500 font-medium">Cotizaciones (Construcción)</p>
        <p class="text-3xl font-extrabold text-dark mt-2">12</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
        <p class="text-sm text-gray-500 font-medium">Solicitudes Pendientes</p>
        <p class="text-3xl font-extrabold text-dark mt-2">5</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Chart.js Mockup Container -->
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 class="font-bold text-lg text-dark mb-4">Visitas Mensuales a Propiedades</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p class="text-gray-400 font-medium text-sm">Aquí se integrará el gráfico de Chart.js</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 class="font-bold text-lg text-dark mb-4">Acciones Rápidas</h3>
        <div class="space-y-4">
          <button class="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary/5 transition-colors group">
            <span class="font-bold text-dark group-hover:text-primary">Añadir Nueva Propiedad</span>
            <span class="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-xl">+</span>
          </button>
          <button class="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-colors group">
            <span class="font-bold text-dark group-hover:text-blue-600">Revisar Solicitudes</span>
            <span class="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center font-bold">5</span>
          </button>
          <button class="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-orange-500 hover:bg-orange-50 transition-colors group">
            <span class="font-bold text-dark group-hover:text-orange-600">Gestión de Usuarios</span>
            <span class="bg-orange-100 text-orange-600 w-8 h-8 rounded-lg flex items-center justify-center">→</span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

