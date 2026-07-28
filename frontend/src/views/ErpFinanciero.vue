<template>
  <div class="erp-container">
    <div class="header">
      <h2 class="text-3xl font-extrabold text-[#003366]">ERP Construcción (Libro Mayor)</h2>
      <p class="text-slate-500">Gestión financiera y contabilidad en tiempo real de obras en ejecución.</p>
    </div>

    <!-- Acciones -->
    <div class="actions my-6 flex gap-4">
      <button @click="showModalObra = true" class="bg-[#003366] text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800">
        + Crear Nueva Obra
      </button>
    </div>

    <!-- Lista de Obras -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="obra in obras" :key="obra._id" class="bg-white rounded-xl shadow p-6 border border-slate-100 flex flex-col">
        <div class="flex justify-between items-start mb-4">
          <h3 class="font-bold text-lg text-slate-800">{{ obra.titulo }}</h3>
          <span class="px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">{{ obra.estado }}</span>
        </div>
        <div class="text-sm text-slate-600 mb-4">
          <p><strong>Presupuesto Base:</strong> {{ formatCurrency(obra.presupuesto_inicial) }}</p>
        </div>
        <div class="flex flex-col gap-2 mt-auto">
          <button @click="verFinanzas(obra._id)" class="w-full bg-slate-100 text-[#003366] py-2 rounded font-semibold hover:bg-slate-200">
            Gestionar Contabilidad
          </button>
          <div class="flex gap-2">
            <button @click="abrirEditarObra(obra)" class="flex-1 bg-amber-50 text-amber-700 py-1 rounded text-sm hover:bg-amber-100">Editar</button>
            <button @click="eliminarObra(obra._id)" class="flex-1 bg-red-50 text-red-600 py-1 rounded text-sm hover:bg-red-100">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Finanzas y Gastos -->
    <div v-if="obraSeleccionada" class="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-[#003366]">Contabilidad: {{ obraSeleccionada.obra.titulo }}</h3>
          <button @click="obraSeleccionada = null" class="text-slate-400 hover:text-red-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Dashboard Financiero -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <p class="text-sm text-slate-500 font-semibold uppercase">Presupuesto Inicial</p>
            <p class="text-xl font-bold text-slate-800">{{ formatCurrency(obraSeleccionada.finanzas.presupuesto_inicial) }}</p>
          </div>
          <div class="bg-red-50 p-4 rounded-lg border border-red-100">
            <p class="text-sm text-red-500 font-semibold uppercase">Total Gastado</p>
            <p class="text-xl font-bold text-red-700">{{ formatCurrency(obraSeleccionada.finanzas.total_gastado) }}</p>
          </div>
          <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <p class="text-sm text-emerald-600 font-semibold uppercase">Saldo / Avance Físico</p>
            <p class="text-xl font-bold text-emerald-700">{{ formatCurrency(obraSeleccionada.finanzas.saldo_disponible) }} ({{ obraSeleccionada.finanzas.avance_porcentaje }}%)</p>
          </div>
        </div>

        <!-- Formulario Nuevo Gasto -->
        <div class="bg-slate-100 p-6 rounded-lg mb-8">
          <h4 class="font-bold mb-4 text-slate-800">Registrar Nuevo Gasto</h4>
          <form @submit.prevent="registrarGasto" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <div class="md:col-span-2">
              <label class="block text-sm mb-1 font-semibold">Concepto / Ítem de Inventario</label>
              <input v-model="gastoForm.concepto" list="materiales-list" required type="text" class="w-full p-2 rounded border border-slate-300" placeholder="Buscar o escribir concepto...">
              <datalist id="materiales-list">
                <option v-for="mat in listaMateriales" :key="mat" :value="mat"></option>
              </datalist>
            </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label class="block text-sm mb-1 font-semibold">Cantidad</label>
              <input v-model="gastoForm.cantidad" required type="number" min="0.1" step="any" class="w-full p-2 rounded border border-slate-300" placeholder="Ej: 10">
            </div>
            <div>
              <label class="block text-sm mb-1 font-semibold">Valor Unitario</label>
              <input v-model="precioUnitarioInput" @input="calcularTotal" required type="number" min="0" step="any" class="w-full p-2 rounded border border-slate-300" placeholder="Costo por unidad">
            </div>
            <div>
              <label class="block text-sm mb-1 font-semibold">Precio Total</label>
              <input v-model="gastoForm.monto" readonly required type="number" class="w-full p-2 rounded border border-slate-300 bg-slate-100 font-bold text-slate-700" placeholder="Costo total">
            </div>
          </div>
            <div>
              <label class="block text-sm mb-1 font-semibold">Categoría</label>
              <select v-model="gastoForm.categoria" required class="w-full p-2 rounded border border-slate-300">
                <option value="MATERIALES">Materiales e Inventario</option>
                <option value="NOMINA">Nómina / Mano de Obra</option>
                <option value="SERVICIOS">Servicios / Alquiler</option>
                <option value="OTROS">Otros</option>
              </select>
            </div>
            <div>
              <label class="block text-sm mb-1 font-semibold">Precio Total (Monto Exacto)</label>
              <input v-model="gastoForm.monto" required type="number" class="w-full p-2 rounded border border-slate-300" placeholder="Costo total de la compra">
            </div>
            <div>
              <label class="block text-sm mb-1 font-semibold">Soporte PDF/Foto (Opcional)</label>
              <input type="file" @change="handleFileUpload" accept=".pdf,image/*" class="w-full p-1 text-sm">
            </div>
            <div class="md:col-span-2 flex justify-end mt-2">
              <button type="submit" :disabled="uploading" class="bg-emerald-600 text-white px-6 py-2 rounded font-bold hover:bg-emerald-700 disabled:opacity-50">
                {{ uploading ? 'Subiendo archivo...' : 'Añadir al Libro Mayor' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Tabla Historial -->
        <h4 class="font-bold mb-4 text-slate-800">Historial de Gastos (Auditoría)</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-100 text-slate-600 text-sm uppercase">
                <th class="p-3 border-b">Fecha</th>
                <th class="p-3 border-b">Concepto</th>
                <th class="p-3 border-b text-center">Cant.</th>
                <th class="p-3 border-b text-right">V. Unitario</th>
                <th class="p-3 border-b">Categoría</th>
                <th class="p-3 border-b text-right">Monto Total</th>
                <th class="p-3 border-b text-center">Soporte</th>
                <th class="p-3 border-b text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="g in obraSeleccionada.gastos" :key="g._id" class="border-b hover:bg-slate-50">
                <td class="p-3 text-sm">{{ new Date(g.fecha).toLocaleDateString() }}</td>
                <td class="p-3 font-medium">{{ g.concepto }}</td>
                <td class="p-3 text-center text-sm font-bold">{{ g.cantidad || 1 }}</td>
                <td class="p-3 text-right font-medium text-slate-500">{{ formatCurrency(g.monto / (g.cantidad || 1)) }}</td>
                <td class="p-3 text-xs"><span class="bg-slate-200 px-2 py-1 rounded">{{ g.categoria }}</span></td>
                <td class="p-3 text-right font-bold text-red-600">{{ formatCurrency(g.monto) }}</td>
                <td class="p-3 text-center">
                  <a v-if="g.soporte_url" :href="g.soporte_url" target="_blank" class="text-blue-500 hover:underline text-sm">Ver PDF/Foto</a>
                  <span v-else class="text-slate-300">-</span>
                </td>
                <td class="p-3 text-center flex justify-center gap-2">
                  <button @click="abrirEditarGasto(g)" class="text-amber-600 hover:text-amber-800 font-bold px-2 py-1 bg-amber-50 rounded">Editar</button>
                  <button @click="eliminarGasto(g._id)" class="text-red-500 hover:text-red-700 font-bold px-2 py-1 bg-red-50 rounded">Borrar</button>
                </td>
              </tr>
              <tr v-if="obraSeleccionada.gastos.length === 0">
                <td colspan="8" class="p-6 text-center text-slate-500">No hay gastos registrados aún.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Nueva Obra -->
    <div v-if="showModalObra" class="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h3 class="text-xl font-bold mb-4">Apertura de Obra</h3>
        <form @submit.prevent="crearObra">
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Título / Nombre Cliente</label>
            <input v-model="obraForm.titulo" required type="text" class="w-full p-2 rounded border">
          </div>
          <div class="mb-6">
            <label class="block text-sm font-semibold mb-1">Presupuesto Aprobado</label>
            <input v-model="obraForm.presupuesto_inicial" required type="number" class="w-full p-2 rounded border">
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" @click="showModalObra = false" class="px-4 py-2 text-slate-600">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-[#003366] text-white rounded font-bold">Crear Obra</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Editar Obra -->
    <div v-if="showModalEditarObra" class="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h3 class="text-xl font-bold mb-4">Editar Obra</h3>
        <form @submit.prevent="guardarEdicionObra">
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Título / Nombre Cliente</label>
            <input v-model="obraEditarForm.titulo" required type="text" class="w-full p-2 rounded border">
          </div>
          <div class="mb-6">
            <label class="block text-sm font-semibold mb-1">Presupuesto Aprobado</label>
            <input v-model="obraEditarForm.presupuesto_inicial" required type="number" class="w-full p-2 rounded border">
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" @click="showModalEditarObra = false" class="px-4 py-2 text-slate-600">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-[#003366] text-white rounded font-bold">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Editar Gasto -->
    <div v-if="showModalEditarGasto" class="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-[60] p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h3 class="text-xl font-bold mb-4">Editar Gasto (Concepto)</h3>
        <form @submit.prevent="guardarEdicionGasto">
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-1">Concepto</label>
            <input v-model="gastoEditarForm.concepto" required type="text" class="w-full p-2 rounded border">
          </div>
          <div class="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-1">Cantidad</label>
              <input v-model="gastoEditarForm.cantidad" required type="number" min="0.1" step="any" class="w-full p-2 rounded border">
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1">Total (Monto)</label>
              <input v-model="gastoEditarForm.monto" required type="number" class="w-full p-2 rounded border">
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" @click="showModalEditarGasto = false" class="px-4 py-2 text-slate-600">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-amber-600 text-white rounded font-bold">Guardar</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const obras = ref([])
const showModalObra = ref(false)
const showModalEditarObra = ref(false)
const showModalEditarGasto = ref(false)
const obraSeleccionada = ref(null)

const precioUnitarioInput = ref('')

const calcularTotal = () => {
  if (precioUnitarioInput.value && gastoForm.value.cantidad) {
    gastoForm.value.monto = precioUnitarioInput.value * gastoForm.value.cantidad
  }
}

import { watch } from 'vue'
watch(() => gastoForm.value.cantidad, () => {
  calcularTotal()
})

const listaMateriales = [
  "Cemento Gris (Bulto 50kg)",
  "Cemento Blanco (Bulto 40kg)",
  "Arena de Peña (Volquetada)",
  "Arena de Río (Volquetada)",
  "Arena Fina (Bulto)",
  "Tierra para jardín (Volquetada)",
  "Balastro / Triturado (Volquetada)",
  "Ladrillo Prensado (Unidad)",
  "Ladrillo Farol (Unidad)",
  "Bloque Número 4",
  "Bloque Número 5",
  "Varilla Corrugada 1/4\"",
  "Varilla Corrugada 3/8\"",
  "Varilla Corrugada 1/2\"",
  "Varilla Corrugada 5/8\"",
  "Varilla Corrugada 3/4\"",
  "Malla Electrosoldada",
  "Alambre Negro (Rollo/Kg)",
  "Alambre Dulce (Rollo)",
  "Tubo PVC Sanitario 2\"",
  "Tubo PVC Sanitario 3\"",
  "Tubo PVC Sanitario 4\"",
  "Tubo PVC Sanitario 6\"",
  "Tubo PVC Presión 1/2\"",
  "Tubo PVC Presión 3/4\"",
  "Tubo PVC Presión 1\"",
  "Tubo PVC Presión 1 1/2\"",
  "Tubo PVC Presión 2\"",
  "Tubería Eléctrica Conduit (Tubo)",
  "Cable de Cobre N° 12 (Rollo)",
  "Cable de Cobre N° 10 (Rollo)",
  "Cable de Cobre N° 14 (Rollo)",
  "Cinta Aislante",
  "Cinta Teflón",
  "Interruptor Eléctrico",
  "Tomacorriente",
  "Bombillo / Lámpara LED",
  "Puntillas con cabeza (Libras)",
  "Puntillas sin cabeza (Libras)",
  "Clavos para zinc (Libras)",
  "Listón de Madera (Unidad)",
  "Tabla de Madera (Unidad)",
  "Pintura Vinilo Tipo 1 (Cuñete)",
  "Pintura Vinilo Tipo 1 (Galón)",
  "Pintura Vinilo Tipo 2 (Cuñete)",
  "Pintura Vinilo Tipo 2 (Galón)",
  "Pintura Esmalte Sintético (Galón)",
  "Anticorrosivo (Galón)",
  "Estuco Plástico (Cuñete)",
  "Estuco en Polvo (Bulto 25kg)",
  "Pegacor / Pegante cerámico (Bulto)",
  "Cerámica / Porcelanato (Caja)",
  "Teja de Zinc",
  "Teja de Fibrocemento (Eternit)",
  "Soldadura Líquida PVC (1/4 Galón)",
  "Limpiador PVC",
  "Pegante para Madera (Colbón)",
  "Sika / Impermeabilizante (Cuñete/Galón)",
  "Thinner (Galón)",
  "Disco de Corte Metales",
  "Disco de Corte Diamantado",
  "Alquiler de Mezcladora (Días)",
  "Alquiler de Andamios (Secciones)",
  "Pago de Nómina (Maestro/Oficial)",
  "Pago de Nómina (Ayudante)",
  "Pago de Servicios Públicos",
  "Transporte / Fletes",
  "Otros"
];

const obraForm = ref({ titulo: '', presupuesto_inicial: '' })
const obraEditarForm = ref({ _id: null, titulo: '', presupuesto_inicial: '' })
const gastoForm = ref({ concepto: '', cantidad: 1, categoria: 'MATERIALES', monto: '', soporte_url: '' })
const gastoEditarForm = ref({ _id: null, concepto: '', cantidad: 1, monto: '' })
const fileToUpload = ref(null)
const uploading = ref(false)

const formatCurrency = (val) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(val)
}

const cargarObras = async () => {
  try {
    const { data } = await api.get('/erp/obras')
    obras.value = data
  } catch (error) {
    console.error(error)
  }
}

const crearObra = async () => {
  try {
    await api.post('/erp/obras', obraForm.value)
    showModalObra.value = false
    obraForm.value = { titulo: '', presupuesto_inicial: '' }
    cargarObras()
  } catch (error) {
    alert('Error al crear obra')
  }
}

const abrirEditarObra = (obra) => {
  obraEditarForm.value = { _id: obra._id, titulo: obra.titulo, presupuesto_inicial: obra.presupuesto_inicial }
  showModalEditarObra.value = true
}

const guardarEdicionObra = async () => {
  try {
    await api.put(`/erp/obras/${obraEditarForm.value._id}`, obraEditarForm.value)
    showModalEditarObra.value = false
    cargarObras()
  } catch (error) {
    alert('Error al editar obra')
  }
}

const eliminarObra = async (id) => {
  if (confirm('¿Estás seguro de eliminar esta obra? SE BORRARÁN TODOS SUS GASTOS DE FORMA PERMANENTE.')) {
    try {
      await api.delete(`/erp/obras/${id}`)
      cargarObras()
    } catch (error) {
      alert('Error al eliminar obra')
    }
  }
}

const verFinanzas = async (id) => {
  try {
    const { data } = await api.get(`/erp/obras/${id}/finanzas`)
    obraSeleccionada.value = data
    gastoForm.value.obra = id
  } catch (error) {
    alert('Error cargando finanzas')
  }
}

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      fileToUpload.value = e.target.result // Base64 string
    }
    reader.readAsDataURL(file)
  }
}

const registrarGasto = async () => {
  try {
    uploading.value = true
    let url = null
    
    // Subir a Cloudinary si hay archivo
    if (fileToUpload.value) {
      const resImg = await api.post('/upload', { imagenBase64: fileToUpload.value })
      url = resImg.data.url
    }

    const payload = {
      ...gastoForm.value,
      soporte_url: url
    }

    await api.post('/erp/gastos', payload)
    
    // Recargar finanzas de la obra actual
    await verFinanzas(obraSeleccionada.value.obra._id)
    cargarObras()
    
    // Reset form
    gastoForm.value.concepto = ''
    gastoForm.value.cantidad = 1
    gastoForm.value.monto = ''
    precioUnitarioInput.value = ''
    fileToUpload.value = null
    document.querySelector('input[type="file"]').value = ''
  } catch (error) {
    alert('Error registrando gasto')
  } finally {
    uploading.value = false
  }
}

const eliminarGasto = async (id) => {
  if (confirm('¿Deseas eliminar este registro de gasto del libro mayor?')) {
    try {
      await api.delete(`/erp/gastos/${id}`)
      await verFinanzas(obraSeleccionada.value.obra._id)
      cargarObras()
    } catch (error) {
      alert('Error al eliminar gasto')
    }
  }
}

const abrirEditarGasto = (gasto) => {
  gastoEditarForm.value = { _id: gasto._id, concepto: gasto.concepto, cantidad: gasto.cantidad || 1, monto: gasto.monto }
  showModalEditarGasto.value = true
}

const guardarEdicionGasto = async () => {
  try {
    await api.put(`/erp/gastos/${gastoEditarForm.value._id}`, {
      concepto: gastoEditarForm.value.concepto,
      cantidad: gastoEditarForm.value.cantidad,
      monto: gastoEditarForm.value.monto
    })
    showModalEditarGasto.value = false
    await verFinanzas(obraSeleccionada.value.obra._id)
    cargarObras()
  } catch (error) {
    alert('Error al editar gasto')
  }
}

onMounted(() => {
  cargarObras()
})
</script>
