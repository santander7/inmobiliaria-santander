<template>
  <div class="cotizador-container">
    <div class="cotizador-header">
      <h2 class="cotizador-title">Santander Cotiza</h2>
      <p class="cotizador-subtitle">Obtén un presupuesto realista y detallado para tu proyecto en Puerto Asís.</p>
      
      <!-- Aviso de Venta/Compra -->
      <div class="aviso-badge">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        Nosotros te vendemos el lote, o si ya tienes uno, ¡te lo compramos!
      </div>
    </div>

    <!-- Resultados -->
    <div v-if="resultado" class="resultado-wrapper animate-fade-in-up">
      <div class="resultado-card">
        <div class="resultado-decor"></div>
        
        <div class="resultado-header">
          <div class="resultado-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <h3 class="resultado-title">¡Tu Cotización está Lista!</h3>
            <p class="resultado-subtitle">Desglose transparente del mercado en Puerto Asís.</p>
          </div>
        </div>

        <div class="desglose-grid">
          <div class="desglose-item" v-if="resultado.desglose.costo_materiales !== '$ 0'">
            <span class="desglose-label">Materiales & Acabados</span>
            <span class="desglose-value">{{ resultado.desglose.costo_materiales }}</span>
          </div>
          <div class="desglose-item" v-if="resultado.desglose.costo_mano_obra !== '$ 0'">
            <span class="desglose-label">Mano de Obra</span>
            <span class="desglose-value">{{ resultado.desglose.costo_mano_obra }}</span>
          </div>
          <div v-if="resultado.desglose.costo_lote !== 'N/A' && resultado.desglose.costo_lote !== '$ 0'" class="desglose-item col-span-full">
            <span class="desglose-label">Valor Estimado del Lote</span>
            <span class="desglose-value">{{ resultado.desglose.costo_lote }}</span>
          </div>
        </div>

        <div class="total-box">
            <p class="total-label">Inversión Total Estimada</p>
            <p class="total-value">{{ resultado.desglose.costo_total }}</p>
            <p v-if="form.tipo_proyecto !== 'SOLO_LOTE'" class="tiempo-obra-badge">
              Tiempo de Obra: <span class="text-slate-900 font-bold">{{ resultado.desglose.tiempo_estimado }}</span>
            </p>
            
            <!-- Simulador Financiero (Hipotecario) -->
            <div class="simulador-box">
              <div class="simulador-header">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h4 class="simulador-title">Simulador de Crédito a 15 Años</h4>
              </div>
              
              <div class="simulador-grid">
                <div>
                  <label class="form-label">Porcentaje Cuota Inicial</label>
                  <select v-model="simulador.porcentaje_inicial" class="form-select">
                    <option :value="30">30%</option>
                    <option :value="40">40%</option>
                    <option :value="50">50%</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Moneda</label>
                  <select disabled class="form-select cursor-not-allowed">
                    <option value="COP">Pesos Colombianos (COP)</option>
                  </select>
                </div>
              </div>
              
              <div class="simulador-results-grid">
                <div>
                  <p class="sim-res-label">Cuota Inicial Aprox.</p>
                  <p class="sim-res-val-dark">{{ formatCurrency(calculosFinancieros.cuotaInicial) }}</p>
                </div>
                <div>
                  <p class="sim-res-label">Monto a Financiar</p>
                  <p class="sim-res-val-dark">{{ formatCurrency(calculosFinancieros.montoFinanciar) }}</p>
                </div>
                <div class="sim-res-highlight">
                  <p class="sim-res-label-green">Cuota Mensual Aprox.</p>
                  <p class="sim-res-val-green">{{ formatCurrency(calculosFinancieros.cuotaMensual) }}</p>
                </div>
                <div>
                  <p class="sim-res-label">Ingreso Requerido</p>
                  <p class="sim-res-val-muted">{{ formatCurrency(calculosFinancieros.ingresoRequerido) }}</p>
                </div>
              </div>
              <p class="sim-disclaimer">Valores referenciales a 15 años con tasa promedio mensual (1.5%). Sujetos a estudio de crédito por parte del banco.</p>
            </div>
        </div>

        <div class="acuerdos-box">
          <div class="acuerdos-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h4 class="acuerdos-title">Acuerdos de Pago Flexibles</h4>
            <p class="acuerdos-text">
              <strong>El precio final es totalmente negociable.</strong> Ofrecemos facilidades: de contado, crédito hipotecario o pagos a plazos directos con nosotros. Todos nuestros proyectos se entregan 100% legales, con escrituras al día y licencias aprobadas. ¡Contáctanos para revisar detalles!
            </p>
          </div>
        </div>

        <div v-if="mostrandoPerfil" class="perfil-box mt-8 animate-fade-in-up">
          <h4 class="perfil-title">Queremos ser tus aliados estratégicos</h4>
          <p class="perfil-subtitle">No te preocupes si no tienes el 100% del dinero hoy. Cuéntanos un poco sobre tu situación y juntos diseñaremos un plan de pagos a tu medida.</p>
          
          <div class="perfil-form space-y-4 mt-6">
            <div>
              <label class="form-label text-left">¿Cuál es tu fuente de ingresos principal?</label>
              <select v-model="form.respuestas_cliente.fuente_ingresos" class="form-select">
                <option value="EMPLEADO">Empleado (Empresa pública/privada)</option>
                <option value="INDEPENDIENTE">Independiente / Tengo mi propio negocio</option>
                <option value="PENSIONADO">Pensionado</option>
                <option value="EXTERIOR">Vivo en el exterior / Remesas</option>
              </select>
            </div>
            
            <div>
              <label class="form-label text-left">¿Cómo tienes pensado financiar este proyecto?</label>
              <select v-model="form.respuestas_cliente.metodo_financiacion" class="form-select">
                <option value="AHORROS">Tengo ahorros propios / Cesantías listas para usar</option>
                <option value="BANCO">Quiero pedir un crédito hipotecario con un Banco</option>
                <option value="SUBSIDIO">Tengo un Subsidio (Mi Casa Ya, Caja de compensación, etc)</option>
                <option value="CONSTRUCTORA">Me encantaría un plan de pagos directo con la Constructora</option>
              </select>
            </div>

            <div>
              <label class="form-label text-left">¿Cuentas con alguna cuota inicial?</label>
              <select v-model="form.respuestas_cliente.cuota_inicial" class="form-select">
                <option value="MENOS_30">Sí, tengo entre un 10% y un 30% ahorrado</option>
                <option value="MAS_30">Sí, tengo más del 30% listo para invertir</option>
                <option value="NADA">Aún no, estoy buscando opciones para empezar desde cero</option>
              </select>
            </div>
          </div>
          
          <div class="mt-6 flex justify-end">
            <a :href="whatsappLinkFinal" target="_blank" class="btn-whatsapp w-full sm:w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" /></svg>
              Hablar con un asesor ahora
            </a>
          </div>
        </div>

        <div v-else class="resultado-actions">
          <button @click="resetForm" class="btn-reset">
            Hacer otro cálculo
          </button>
          <button @click="mostrandoPerfil = true" class="btn-whatsapp">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" /></svg>
            Negociar por WhatsApp
          </button>
        </div>
      </div>
    </div>

    <!-- Formulario -->
    <div v-else class="form-wrapper">
      <!-- Minimalist Decor -->
      <div class="form-decor"></div>
      
      <form @submit.prevent="calcularCotizacion" class="form-main">
        
        <!-- Sección 1: Detalles del Proyecto -->
        <div>
          <h3 class="section-title">
            <span class="section-number">1</span>
            Detalles del Proyecto
          </h3>
          
          <div class="form-grid">
            <div class="col-span-full">
              <label class="form-label">¿Qué necesitas que hagamos?</label>
              <select v-model="form.tipo_proyecto" class="form-select">
                <option value="" disabled>Selecciona el tipo de proyecto</option>
                <option value="LOTE_Y_CASA">Comprar un lote y construir mi casa</option>
                <option value="SOLO_LOTE">Solo quiero comprar un lote</option>
                <option value="SOLO_CASA">Construir casa (ya tengo mi propio lote)</option>
                <option value="REMODELACION">Remodelar un espacio existente</option>
              </select>
            </div>

            <!-- Selección de Lote (Inventario vs Estimado) -->
            <template v-if="form.tipo_proyecto === 'LOTE_Y_CASA' || form.tipo_proyecto === 'SOLO_LOTE'">
              <div class="col-span-full">
                <label class="form-label">Opciones de Lotes Disponibles</label>
                <select v-model="loteSeleccionado" class="form-select">
                  <option value="ESTIMAR">No sé aún, quiero cotizar un lote genérico por zona</option>
                  <optgroup label="Inventario Real de Inmobiliaria Santander">
                    <option v-for="lote in lotesDisponibles" :key="lote.id" :value="lote">
                      {{ lote.titulo }} - {{ lote.municipio }} ({{ lote.area }} m²) - {{ formatCurrency(lote.precio) }}
                    </option>
                  </optgroup>
                </select>
              </div>

              <!-- Si elige Estimar -->
              <template v-if="loteSeleccionado === 'ESTIMAR'">
                <div class="col-span-full">
                  <label class="form-label">Ubicación Preferida</label>
                  <select v-model="form.zona_lote" required class="form-select">
                    <option value="" disabled>Selecciona la zona en Puerto Asís</option>
                    <option value="PERIFERIA">Zona Urbana Periférica (Barrios residenciales, ~ $55M)</option>
                    <option value="CENTRO">Zona Centro / Comercial (~ $120M)</option>
                    <option value="RURAL">Zona Rural Campestre / Veredas (~ $35M)</option>
                  </select>
                </div>
              </template>
            </template>

            <!-- Construcción -->
            <template v-if="form.tipo_proyecto && form.tipo_proyecto !== 'SOLO_LOTE'">
              
              <div class="col-span-full md:col-span-1">
                <label class="form-label">Estructura de la Casa</label>
                <select v-model="form.tipo_estructura" class="form-select">
                  <option value="UN_PISO_TECHO">Casa de 1 Piso (Con Techo Normal)</option>
                  <option value="UN_PISO_PLANCHA">Casa de 1 Piso (Con Plancha para 2do piso)</option>
                  <option value="DOS_PISOS">Casa de 2 Pisos</option>
                  <option value="TRES_MAS_PISOS">Casa de 3 Pisos o más (Columnas reforzadas)</option>
                </select>
              </div>

              <div class="col-span-full md:col-span-1">
                <label class="form-label">¿Fase de entrega?</label>
                <select v-model="form.fase_construccion" class="form-select">
                  <option value="OBRA_BLANCA">Obra Blanca (100% Terminada)</option>
                  <option value="OBRA_GRIS">Obra Gris (Sin acabados visuales)</option>
                </select>
              </div>

              <div class="col-span-full">
                <div class="tooltip-container">
                  <label class="form-label-inline">Área de Construcción (m²)</label>
                  <div class="relative group cursor-pointer">
                    <span class="tooltip-icon">?</span>
                    <div class="tooltip-content hidden group-hover:block">
                      <strong class="tooltip-title">¿Qué es un Metro Cuadrado (m²)?</strong>
                      Equivale a un cuadro de 1 metro x 1 metro.<br><br>
                      <span class="text-slate-300">💡 Tip: Si tu lote mide 8x18 (144 m²), lo normal es construir una casa de unos <strong>90 m²</strong> dejando espacio para garaje y patio.</span>
                    </div>
                  </div>
                </div>
                <input type="number" v-model="form.metros_cuadrados" placeholder="Ej: 90" min="10" required class="form-input">
              </div>

              <div v-if="form.fase_construccion === 'OBRA_BLANCA' || form.tipo_proyecto === 'REMODELACION'" class="col-span-full">
                <label class="form-label">Nivel de Acabados</label>
                <select v-model="form.tipo_acabados" class="form-select">
                  <option value="ECONOMICO">Económico (Lo Básico / Funcional)</option>
                  <option value="ESTANDAR">Estándar (Acabados Tradicionales)</option>
                  <option value="PREMIUM">Premium (Acabados de Lujo / Porcelanatos)</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-4 col-span-full md:col-span-1">
                <div>
                  <label class="form-label">Habitaciones</label>
                  <input type="number" v-model="form.habitaciones" min="0" required class="form-input">
                </div>
                <div>
                  <label class="form-label">Baños</label>
                  <input type="number" v-model="form.banos" min="0" required class="form-input">
                </div>
              </div>
            </template>

            <div class="col-span-full md:col-span-1">
              <label class="form-label">Presupuesto Planeado *</label>
              <input type="number" v-model="form.presupuesto_cliente" placeholder="Presupuesto obligatorio" required class="form-input">
            </div>
          </div>
        </div>

        <!-- Las preguntas de perfilamiento se movieron al final -->

        <div v-if="errorMsg" class="alert-error">
          {{ errorMsg }}
        </div>

        <div class="pt-6">
          <button type="submit" :disabled="loading" class="btn-submit">
            {{ loading ? 'Analizando costos del mercado...' : 'Generar Mi Cotización' }}
          </button>
        </div>

      </form>
    </div>

    <!-- Preguntas Frecuentes (FAQ) Premium -->
    <div class="mt-20">
      <h3 class="faq-title">Preguntas Frecuentes</h3>
      <div class="space-y-4">
        <!-- FAQ 1: Seguridad Legal -->
        <details class="faq-item group cursor-pointer">
          <summary class="faq-summary">
            ¿Es seguro invertir mis ahorros con ustedes? ¿Qué garantías legales tengo?
            <span class="faq-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></span>
          </summary>
          <p class="faq-text">
            Absolutamente. Somos una empresa constituida legalmente. Todo negocio se respalda mediante <strong>contratos notariados, escrituras públicas al día y licencias de construcción aprobadas</strong>. Tu inversión está 100% blindada por la ley desde el día cero.
          </p>
        </details>
        
        <!-- FAQ 2: Precios Fijos -->
        <details class="faq-item group cursor-pointer">
          <summary class="faq-summary">
            ¿Los precios de la cotización son definitivos o me pueden cobrar más a mitad de obra?
            <span class="faq-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></span>
          </summary>
          <p class="faq-text">
            Los valores que ves aquí son estimaciones muy precisas. Sin embargo, al firmar contrato contigo, trabajamos bajo la modalidad de <strong>precio cerrado</strong> o presupuesto garantizado. Esto significa que los riesgos de inflación los asumimos nosotros; no tendrás "sorpresas" de cobros extras a mitad de camino.
          </p>
        </details>

        <!-- FAQ 3: Sin dinero completo -->
        <details class="faq-item group cursor-pointer">
          <summary class="faq-summary">
            ¿Qué pasa si no tengo todo el dinero o el banco me niega el crédito?
            <span class="faq-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></span>
          </summary>
          <p class="faq-text">
            En Inmobiliaria Santander somos tus aliados. Si el banco dice "no" o no tienes el 100% de tu presupuesto, nosotros te ofrecemos <strong>planes de financiación directa con la constructora</strong>. Acordamos pagos a plazos, recibimos vehículos en parte de pago y nos adaptamos a tu bolsillo. No dejes que la falta de efectivo ahogue tu sueño.
          </p>
        </details>

        <!-- FAQ 4: Tiempo -->
        <details class="faq-item group cursor-pointer">
          <summary class="faq-summary">
            ¿Cuánto tiempo real se tardan en construir y entregar la casa lista?
            <span class="faq-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></span>
          </summary>
          <p class="faq-text">
            Depende del área, pero una casa estándar de 90 m² suele entregarse <strong>entre 4 a 6 meses</strong> (incluyendo los tiempos de secado estructural). En el contrato estipulamos fechas claras de entrega, y somos muy estrictos con nuestros cronogramas de obra.
          </p>
        </details>

        <!-- FAQ 5: Qué incluye -->
        <details class="faq-item group cursor-pointer">
          <summary class="faq-summary">
            ¿Qué incluye exactamente el valor que arroja el cotizador?
            <span class="faq-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></span>
          </summary>
          <p class="faq-text">
            ¡Absolutamente todo! Es un servicio llave en mano. Incluye: diseños arquitectónicos personalizados, gestión de licencias ante la alcaldía, toda la mano de obra, todos los materiales y los acabados (según elijas). <strong>Te entregamos las llaves en la mano para que solo lleves tus muebles.</strong>
          </p>
        </details>

        <!-- FAQ 6: Transparencia y Visitas -->
        <details class="faq-item group cursor-pointer">
          <summary class="faq-summary">
            ¿Puedo ir a ver la obra mientras la construyen o visitar proyectos anteriores?
            <span class="faq-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></span>
          </summary>
          <p class="faq-text">
            ¡Por supuesto! Tu casa es tuya desde el primer ladrillo. Tienes puertas abiertas para auditar el avance cuando desees. Además, si quieres estar más seguro, <strong>te invitamos a dar un recorrido por las casas que ya le hemos entregado a familias felices</strong> en Puerto Asís. 
          </p>
        </details>

        <!-- FAQ 7: Lote propio -->
        <details class="faq-item group cursor-pointer">
          <summary class="faq-summary">
            Si ya tengo mi propio lote, ¿ustedes construyen sobre él? ¿Importa si es rural?
            <span class="faq-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></span>
          </summary>
          <p class="faq-text">
            Sí. Solo debes seleccionar la opción "Construir casa (ya tengo mi propio lote)" en el cotizador. Construimos tanto en zonas céntricas, periféricas como rurales. Nuestro equipo técnico hará una visita gratuita para evaluar las condiciones del terreno (desniveles, acceso a servicios) antes de iniciar.
          </p>
        </details>

        <!-- FAQ 8: Calidad Materiales -->
        <details class="faq-item group cursor-pointer">
          <summary class="faq-summary">
            ¿Usan materiales de buena calidad o intentan ahorrar usando los más baratos?
            <span class="faq-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></span>
          </summary>
          <p class="faq-text">
            Nuestra reputación es nuestro mayor activo. Trabajamos bajo estrictas normas de sismo-resistencia (NSR-10) con hierro y cemento certificados. En cuanto a los acabados (Económico, Estándar o Premium), usamos marcas reconocidas; <strong>tú mismo aprobarás los materiales, baldosas y griferías</strong> antes de instalarlos.
          </p>
        </details>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import api from '../services/api'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()

const lotesDisponibles = ref([])
const loteSeleccionado = ref('ESTIMAR')

const form = reactive({
  tipo_proyecto: '',
  fase_construccion: 'OBRA_BLANCA',
  tipo_estructura: 'UN_PISO_TECHO',
  metros_cuadrados: 0,
  habitaciones: 3,
  banos: 2,
  tipo_acabados: 'ESTANDAR',
  presupuesto_cliente: '',
  zona_lote: '',
  lote_id: null,
  lote_precio_real: null,
  respuestas_cliente: {
    fuente_ingresos: 'EMPLEADO',
    metodo_financiacion: 'AHORROS',
    cuota_inicial: 'MENOS_30'
  }
})

const loading = ref(false)
const errorMsg = ref('')
const resultado = ref(null)
const mostrandoPerfil = ref(false)

const simulador = reactive({
  porcentaje_inicial: 30
})

const calculosFinancieros = computed(() => {
  if (!resultado.value || !resultado.value.cotizacion) return { cuotaInicial: 0, montoFinanciar: 0, cuotaMensual: 0, ingresoRequerido: 0 }
  
  const costoTotal = Number(resultado.value.cotizacion.costo_calculado)
  const pInicial = simulador.porcentaje_inicial / 100
  
  const cuotaInicial = costoTotal * pInicial
  const montoFinanciar = costoTotal - cuotaInicial
  
  // Fórmula de amortización: M * (i(1+i)^n) / ((1+i)^n - 1)
  const tasaMensual = 0.015 // 1.5% mensual
  const plazoMeses = 15 * 12 // 15 años
  
  let cuotaMensual = 0
  if(montoFinanciar > 0) {
    cuotaMensual = montoFinanciar * (tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) / (Math.pow(1 + tasaMensual, plazoMeses) - 1)
  }
  
  // Por ley, la cuota no debe superar el 30% del ingreso familiar
  const ingresoRequerido = cuotaMensual / 0.30

  return {
    cuotaInicial,
    montoFinanciar,
    cuotaMensual,
    ingresoRequerido
  }
})

const formatCurrency = (val) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val)
}

const cargarLotes = async () => {
  try {
    const res = await api.get('/propiedades')
    lotesDisponibles.value = res.data.filter(p => p.estado === 'DISPONIBLE' && (p.tipo === 'LOTE' || p.tipo === 'CASA'))
  } catch (error) {
    console.error("No se pudo cargar el inventario", error)
  }
}

onMounted(() => {
  cargarLotes()
})

const calcularCotizacion = async () => {
  errorMsg.value = ''
  
  if (form.tipo_proyecto !== 'SOLO_LOTE') {
    if (!form.metros_cuadrados || form.metros_cuadrados <= 0) {
      errorMsg.value = 'Por favor ingresa los metros cuadrados de construcción válidos.'
      return
    }
  } else {
    form.metros_cuadrados = 0;
  }

  if ((form.tipo_proyecto === 'LOTE_Y_CASA' || form.tipo_proyecto === 'SOLO_LOTE')) {
    if (loteSeleccionado.value === 'ESTIMAR' && !form.zona_lote) {
       errorMsg.value = 'Por favor selecciona la zona de preferencia para estimar el valor del lote.'
       return
    } else if (loteSeleccionado.value !== 'ESTIMAR') {
       form.lote_id = loteSeleccionado.value.id
       form.lote_precio_real = loteSeleccionado.value.precio
    } else {
       form.lote_id = null
       form.lote_precio_real = null
    }
  }

  loading.value = true
  try {
    const payload = { ...form }
    const res = await api.post('/cotizaciones', payload)
    resultado.value = res.data
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Error al conectar con el servidor.'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  resultado.value = null
  mostrandoPerfil.value = false
}

const whatsappLinkFinal = computed(() => {
  if (!resultado.value) return '#'
  
  // Incluimos datos del simulador si está disponible
  let txtFinanciero = ''
  if(calculosFinancieros.value.cuotaMensual > 0) {
    txtFinanciero = `\nMe interesa el pago a cuotas. Tendría una cuota inicial aproximada de ${formatCurrency(calculosFinancieros.value.cuotaInicial)}.`
  }

  let msg = `Hola Inmobiliaria Santander. Acabo de cotizar un proyecto con ustedes.
- Tipo: ${form.tipo_proyecto.replace(/_/g, ' ')}
- Construcción: ${form.metros_cuadrados}m2
- Estructura: ${form.tipo_estructura.replace(/_/g, ' ')}
- Inversión Total Estimada: ${resultado.value.desglose.costo_total}
- Presupuesto planeado: ${formatCurrency(form.presupuesto_cliente)}${txtFinanciero}

*Perfil del Cliente:*
- Ingresos: ${form.respuestas_cliente.fuente_ingresos}
- Financiación: ${form.respuestas_cliente.metodo_financiacion}
- Ahorros: ${form.respuestas_cliente.cuota_inicial}

Me interesa conversar sobre este proyecto y los acuerdos de pago.`
  return `https://wa.me/3175192043?text=${encodeURIComponent(msg)}`
})
</script>

<style scoped>
.cotizador-container {
  @apply max-w-4xl mx-auto space-y-8 pb-20 font-sans text-slate-800;
}
.cotizador-header {
  @apply text-center mb-10;
}
.cotizador-title {
  @apply text-3xl font-extrabold text-slate-900 tracking-tight;
}
.cotizador-subtitle {
  @apply text-slate-500 mt-2 text-sm;
}
.aviso-badge {
  @apply mt-6 inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-full text-xs font-bold border border-slate-200 shadow-sm uppercase tracking-wider;
}

.resultado-wrapper {
  @apply bg-gradient-to-br from-[#003366] to-slate-800 rounded-3xl p-1 shadow-2xl;
}
.resultado-card {
  @apply bg-white rounded-[23px] p-4 sm:p-6 md:p-8 relative overflow-hidden;
}
.resultado-decor {
  @apply absolute -right-20 -top-20 w-64 h-64 bg-slate-100 rounded-full blur-3xl pointer-events-none;
}
.resultado-header {
  @apply flex items-center gap-4 mb-6 relative z-10;
}
.resultado-icon-box {
  @apply w-12 h-12 bg-[#003366] text-white rounded-lg flex items-center justify-center shadow-md;
}
.resultado-title {
  @apply text-2xl font-extrabold text-slate-900;
}
.resultado-subtitle {
  @apply text-slate-500 text-xs uppercase tracking-widest mt-1;
}

.desglose-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 relative z-10;
}
.desglose-item {
  @apply bg-slate-50 p-5 rounded-xl border border-slate-100 flex justify-between items-center;
}
.desglose-label {
  @apply text-xs font-bold text-slate-500 uppercase tracking-wider;
}
.desglose-value {
  @apply text-lg font-black text-slate-900;
}

.total-box {
  @apply bg-slate-50 border border-slate-200 p-4 sm:p-6 md:p-8 rounded-2xl mb-8 relative z-10 flex flex-col items-center text-center;
}
.total-label {
  @apply text-xs font-bold text-slate-500 uppercase tracking-widest mb-2;
}
.total-value {
  @apply text-5xl font-black text-[#003366] mb-3;
}
.tiempo-obra-badge {
  @apply text-sm text-slate-500 font-medium bg-white px-4 py-1.5 rounded-full border border-slate-100 mb-6;
}

.simulador-box {
  @apply w-full mt-4 bg-white p-4 sm:p-5 md:p-6 rounded-xl border border-slate-100 shadow-sm text-left;
}
.simulador-header {
  @apply flex items-center gap-2 mb-6 border-b border-slate-100 pb-4;
}
.simulador-title {
  @apply font-bold text-slate-900 uppercase tracking-widest text-sm;
}
.simulador-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6 mb-6;
}

.simulador-results-grid {
  @apply grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100;
}
.sim-res-label {
  @apply text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1;
}
.sim-res-val-dark {
  @apply text-sm font-extrabold text-slate-900;
}
.sim-res-highlight {
  @apply bg-emerald-50 p-2 rounded border border-emerald-100;
}
.sim-res-label-green {
  @apply text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1;
}
.sim-res-val-green {
  @apply text-base font-black text-emerald-700;
}
.sim-res-val-muted {
  @apply text-sm font-bold text-slate-700;
}
.sim-disclaimer {
  @apply text-[10px] text-slate-400 mt-4 text-center;
}

.acuerdos-box {
  @apply bg-slate-100 border border-slate-200 p-4 md:p-6 rounded-xl mb-8 relative z-10 flex flex-col sm:flex-row gap-4;
}
.acuerdos-icon {
  @apply text-[#003366] mt-1;
}
.acuerdos-title {
  @apply font-bold text-slate-900 mb-1 text-sm uppercase tracking-wider;
}
.acuerdos-text {
  @apply text-slate-600 text-sm leading-relaxed;
}

.resultado-actions {
  @apply flex flex-col sm:flex-row gap-4 justify-end border-t border-slate-100 pt-6 relative z-10;
}
.btn-reset {
  @apply px-6 py-3 font-bold text-slate-500 hover:text-slate-900 transition-colors text-sm uppercase tracking-wider;
}
.btn-whatsapp {
  @apply px-8 py-3 bg-[#003366] hover:bg-slate-800 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2;
}

.form-wrapper {
  @apply bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden;
}
.form-decor {
  @apply absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10;
}
.form-main {
  @apply space-y-8 relative z-10;
}
.section-title {
  @apply text-xs font-extrabold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 mb-6 flex items-center gap-2;
}
.section-number {
  @apply w-6 h-6 bg-slate-100 text-slate-500 rounded flex items-center justify-center;
}
.form-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}
.form-label {
  @apply block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2;
}
.form-label-inline {
  @apply block text-xs font-bold text-slate-500 uppercase tracking-wider;
}
.form-select, .form-input {
  @apply w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:ring-1 focus:ring-[#003366] focus:border-[#003366] transition-all outline-none text-sm font-medium;
}

.tooltip-container {
  @apply flex items-center gap-2 mb-2;
}
.tooltip-icon {
  @apply inline-flex items-center justify-center w-5 h-5 bg-slate-200 text-slate-600 rounded-full text-[10px] font-bold;
}
.tooltip-content {
  @apply absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-[#003366] text-white text-xs p-4 rounded-lg shadow-xl z-20 font-medium;
}
.tooltip-title {
  @apply text-slate-300 uppercase tracking-wider text-[10px] block mb-1;
}

.alert-error {
  @apply bg-red-50 text-red-500 p-4 rounded-lg text-sm font-medium border border-red-100 text-center;
}
.btn-submit {
  @apply w-full bg-[#003366] hover:bg-slate-800 text-white font-bold py-4 rounded-lg shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-70 uppercase tracking-widest text-sm;
}

.faq-title {
  @apply text-xs font-extrabold text-slate-400 uppercase tracking-[0.2em] text-center mb-8;
}
.faq-item {
  @apply bg-white p-6 rounded-xl shadow-sm border border-slate-100;
}
.faq-summary {
  @apply font-bold text-slate-900 flex justify-between items-center outline-none list-none;
}
.faq-icon {
  @apply text-slate-400 group-open:rotate-180 transition-transform;
}
.faq-text {
  @apply mt-4 text-slate-500 text-sm leading-relaxed;
}
</style>
