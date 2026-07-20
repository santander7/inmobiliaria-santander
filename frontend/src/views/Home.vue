<template>
  <div class="home-container">
    <!-- Navbar Premium -->
    <header :class="['navbar-fixed', { 'navbar-scrolled': scrolled, 'navbar-top': !scrolled }]">
      <div class="navbar-content">
        <div class="navbar-inner">
          <div class="brand-wrapper">
            <div class="brand-logo">S</div>
            <div class="brand-text">
              <span :class="['brand-title', { 'text-white': !scrolled }]">Inmobiliaria & Constructora</span>
              <span :class="['brand-subtitle', { 'text-gray-300': !scrolled }]">SANTANDER</span>
            </div>
          </div>
          <nav class="desktop-nav">
            <a href="#inicio" :class="['nav-link', { 'nav-link-scrolled': scrolled, 'nav-link-top': !scrolled }]">Inicio</a>
            <a href="#historia" :class="['nav-link', { 'nav-link-scrolled': scrolled, 'nav-link-top': !scrolled }]">Nosotros</a>
            <a href="#servicios" :class="['nav-link', { 'nav-link-scrolled': scrolled, 'nav-link-top': !scrolled }]">Servicios</a>
            <a href="#propiedades" :class="['nav-link', { 'nav-link-scrolled': scrolled, 'nav-link-top': !scrolled }]">Catálogo</a>
          </nav>
          <div class="nav-actions">
            <router-link to="/login" :class="['nav-login', { 'nav-login-scrolled': scrolled, 'nav-login-top': !scrolled }]">Acceder</router-link>
            <router-link to="/dashboard/cotizador" class="btn-cotizar">
              Cotizar Proyecto
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section Elegante -->
    <section id="inicio" class="hero-section">
      <!-- Background Image with Overlay -->
      <div class="hero-bg">
        <img src="/images/aerial_night.png" alt="Puerto Asís de Noche" class="hero-img" />
        <div class="hero-overlay"></div>
      </div>

      <div class="hero-content">
        <div class="hero-text-wrapper">
          <span class="hero-badge">Puerto Asís, Putumayo</span>
          <h1 class="hero-title">
            Porque una familia segura merece un hogar para toda la vida.
          </h1>
          <p class="hero-description">
            Sabemos que no estás buscando solo ladrillos, sino el refugio donde crecerán tus hijos. En Inmobiliaria & Constructora Santander somos los indicados para acompañarte: desde diseñar y cotizar tu presupuesto de forma honesta en tiempo real, hasta construir con nuestras propias manos la solidez y la seguridad jurídica que tu familia necesita.
          </p>
        </div>

        <!-- Buscador Superpuesto (Estilo Premium) -->
        <div class="search-box">
          <div class="search-grid">
            <div>
              <label class="search-label">Interés</label>
              <select v-model="filtros.tipo" class="search-select">
                <option value="">Cualquiera</option>
                <option value="CASA">Comprar Casa</option>
                <option value="LOTE">Comprar Lote</option>
              </select>
            </div>
            <div>
              <label class="search-label">Ubicación</label>
              <select v-model="filtros.ubicacion" class="search-select">
                <option value="">Todas las zonas</option>
                <option value="CENTRO">Puerto Asís (Centro/Urbano)</option>
                <option value="PERIFERIA">Puerto Asís (Periferia)</option>
                <option value="RURAL">Puerto Asís (Rural/Campestre)</option>
              </select>
            </div>
            <div>
              <label class="search-label">Presupuesto</label>
              <select v-model="filtros.presupuesto" class="search-select">
                <option value="">Sin límite</option>
                <option value="50">Hasta $50 Millones</option>
                <option value="100">Hasta $100 Millones</option>
                <option value="300">Hasta $300 Millones</option>
              </select>
            </div>
            <div>
              <a href="#propiedades" class="btn-search">
                Explorar Inventario
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Historia y Valores (Emprendimiento Familiar) -->
    <section id="historia" class="history-section">
      <!-- Decoración minimalista -->
      <div class="history-decor"></div>
      
      <div class="history-content">
        <div class="history-grid">
          <div>
            <span class="section-badge">Nuestra Historia</span>
            <h2 class="section-title">
              De un sueño familiar a <br/>tu constructora de confianza.
            </h2>
            <div class="history-text">
              <p>
                Todo gran proyecto comienza con un sueño. Nuestra historia nace como un emprendimiento familiar, construido desde cero con esfuerzo y visión. Tras años de recorrer diferentes lugares buscando oportunidades, nuestros padres volvieron a Puerto Asís convencidos de su enorme potencial: una ciudad segura, de clima tropical, rodeada de naturaleza y con una innegable proyección comercial.
              </p>
              <p>
                Hace más de 10 años, en el histórico Barrio Buenos Aires, pusimos la primera piedra de lo que hoy es Inmobiliaria & Constructora Santander. Empezamos adquiriendo un pequeño lote y construyendo con nuestras propias manos, respaldados por la experiencia técnica de nuestra familia.
              </p>
              <p>
                Desde aquel primer proyecto, nuestra filosofía ha sido inquebrantable: <strong>absoluta transparencia, claridad y seriedad en cada trato</strong>. Sabemos que comprar una casa o un lote no es solo una transacción, es el ahorro de toda una vida. Por eso nos caracterizamos por brindar confianza y responder siempre con hechos.
              </p>
            </div>
            
            <div class="history-stats">
              <div>
                <p class="stat-number">10+</p>
                <p class="stat-label">Años de Exp.</p>
              </div>
              <div>
                <p class="stat-number">100%</p>
                <p class="stat-label">Transparencia</p>
              </div>
            </div>
          </div>
          
          <div class="history-image-wrapper">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Construcción Familiar" class="history-img" />
            <div class="history-quote-box">
              <p class="history-quote">"Seguimos mejorando cada día con las ganas de ofrecer el mejor servicio de Putumayo."</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Descubre Puerto Asís (Marketing de Ciudad) -->
    <section id="descubre-putumayo" class="discover-section">
      <!-- Decoración de fondo -->
      <div class="discover-bg-img"></div>
      <div class="discover-bg-gradient"></div>

      <div class="discover-content">
        <div class="discover-grid">
          <div>
            <span class="discover-badge">El Motor de la Amazonía</span>
            <h2 class="discover-title">
              Puerto Asís, la verdadera <br/>capital comercial del Sur.
            </h2>
            <p class="discover-description">
              Aunque Mocoa es la capital política, Puerto Asís es indiscutiblemente el motor económico del Putumayo. Una ciudad vibrante, conectada por el majestuoso Río Putumayo y el Aeropuerto 3 de Mayo, atrayendo inversión de todo el país.
            </p>
            
            <div class="discover-features">
              <div class="feature-item">
                <div class="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </div>
                <div>
                  <h4 class="feature-title">Ecoturismo en Auge</h4>
                  <p class="feature-text">Cerca de la ciudad contamos con hermosos lugares turísticos rodeados de naturaleza. Esto ha hecho que cada vez más personas busquen construir casas campestres para descansar los fines de semana o para alquilar, creando una gran oportunidad de negocio para ti.</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 class="feature-title">Conectividad Total</h4>
                  <p class="feature-text">Punto clave de transporte fluvial hacia el Amazonas y Brasil, y conexión aérea directa. Puerto Asís es el epicentro logístico del departamento, garantizando flujo constante de personas.</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <div>
                  <h4 class="feature-title">Tu inversión crecerá rápido</h4>
                  <p class="feature-text">Puerto Asís es la ciudad más comercial de todo el Putumayo. Comprar aquí significa que tu casa o tu lote valdrá mucho más dinero en los próximos años, gracias al comercio constante, nuestro río que nos conecta con países vecinos y el turismo que no para de crecer. Es el lugar más seguro para que tu dinero rinda frutos.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="discover-images">
            <img src="/images/sunset_river_2.png" alt="Majestuoso Río Putumayo al atardecer" class="discover-img-1">
            <img src="/images/plaza_taxis.png" alt="Parque Principal de Puerto Asís" class="discover-img-2">
          </div>
        </div>
      </div>
    </section>

    <!-- Transparencia y Servicios Premium -->
    <section id="servicios" class="services-section">
      <div class="services-content">
        <div class="services-header">
          <span class="section-badge-center">Nuestros Servicios</span>
          <h2 class="section-title-dark">Soluciones Inmobiliarias Integrales</h2>
        </div>

        <div class="services-grid">
          
          <!-- Card 1 -->
          <div class="service-card group">
            <div class="service-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-700 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 class="service-card-title">Facilidades de Pago</h3>
            <p class="service-card-text">
              No dejes que el presupuesto detenga tus sueños. Ofrecemos modalidades flexibles: pago de contado (con excelentes beneficios), gestión de crédito hipotecario bancario y financiamiento a plazos directo con nosotros (máximo 6 meses).
            </p>
          </div>

          <!-- Card 2 -->
          <div class="service-card group">
            <div class="service-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-700 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="service-card-title">100% Legalidad y Seguridad</h3>
            <p class="service-card-text">
              La transparencia es nuestro pilar. Todos nuestros lotes y casas se entregan con documentación al día, escrituración notariada y licencias de construcción aprobadas. Cero riesgos legales.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="service-card group">
            <div class="service-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-700 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="service-card-title">Diseño y Construcción</h3>
            <p class="service-card-text">
              Compramos, vendemos y construimos. Si adquieres un lote con nosotros, te diseñamos y construimos la vivienda a tu medida (Obra gris o llave en mano). Asesoría integral y cotizaciones totalmente gratuitas.
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- Estadísticas Animadas (Cronómetro) -->
    <section class="stats-section" ref="statsRef">
      <div class="stats-content">
        <div class="stats-grid">
          <!-- Años de Experiencia -->
          <div class="stat-card">
            <h3 class="stat-value">+{{ expCount }}</h3>
            <p class="stat-label">Años de Experiencia</p>
          </div>
          <!-- Metros Construidos -->
          <div class="stat-card">
            <h3 class="stat-value">+{{ m2Count }}m²</h3>
            <p class="stat-label">Construidos</p>
          </div>
          <!-- Familias Felices -->
          <div class="stat-card">
            <h3 class="stat-value">{{ familiesCount }}</h3>
            <p class="stat-label">Familias Felices</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Portafolio de Obras -->
    <section class="showcase-section">
      <div class="showcase-content">
        <div class="showcase-header">
          <span class="section-badge-center">Proyectos 100% Terminados</span>
          <h2 class="section-title-dark text-center">Nuestras Obras Entregadas</h2>
          <p class="showcase-subtitle">
            Conoce la calidad de nuestros acabados y el nivel de detalle en nuestras construcciones. Haz clic en un proyecto para ver el recorrido completo.
          </p>
        </div>

        <div class="obras-grid">
          <div v-for="obra in obrasEntregadas" :key="obra.id" class="obra-card group">
            <div class="obra-img-box">
              <img :src="obra.imagenPrincipal" :alt="obra.titulo" class="obra-img">
              <div class="obra-overlay">
                <button @click="abrirModalObra(obra)" class="btn-ver-obra">
                  Ver Recorrido Completo
                </button>
              </div>
            </div>
            <div class="obra-info">
              <h3 class="obra-title">{{ obra.titulo }}</h3>
              <p class="obra-desc">{{ obra.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Recorrido de Obra -->
    <div v-if="obraActiva" class="obra-modal-backdrop" @click.self="cerrarModalObra">
      <div class="obra-modal-content">
        <button @click="cerrarModalObra" class="btn-close-modal">&times;</button>
        
        <div class="modal-header">
          <span class="section-badge-center">Recorrido Fotográfico</span>
          <h2 class="section-title-dark text-center">{{ obraActiva.titulo }}</h2>
        </div>

        <div class="showcase-gallery">
          <div v-for="(detalle, index) in obraActiva.detalles" :key="index" class="showcase-item">
            <img :src="detalle.imagen" :alt="detalle.titulo" class="showcase-img">
            <div class="showcase-info">
              <h3 class="showcase-item-title">{{ detalle.titulo }}</h3>
              <p class="showcase-item-text">{{ detalle.texto }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call To Action (Cotizador) -->
    <section class="cta-section">
      <div class="cta-content">
        <div class="cta-box">
          <div class="cta-bg-texture"></div>
          <h2 class="cta-title">¿Listo para proyectar tu vivienda?</h2>
          <p class="cta-text">
            Utiliza nuestro exclusivo Software de Cotización Inteligente. Selecciona la zona de Puerto Asís, los metros cuadrados y los acabados para obtener un presupuesto transparente, detallado e instantáneo.
          </p>
          <router-link to="/dashboard/cotizador" class="btn-cta">
            Abrir Santander Cotiza
          </router-link>
        </div>
      </div>
    </section>

    <!-- Catálogo en Vivo -->
    <section id="propiedades" class="catalog-section">
      <div class="catalog-content">
        <div class="catalog-header">
          <div>
            <span class="section-badge">Inventario Destacado</span>
            <h2 class="section-title-dark">Propiedades Disponibles</h2>
          </div>
          <router-link to="/dashboard/user" class="catalog-link">
            Ver todo el catálogo →
          </router-link>
        </div>

        <div v-if="cargando" class="loading-state">
          <svg class="spinner-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Cargando propiedades de alto valor...
        </div>

        <!-- Grid -->
        <div v-else-if="propiedadesMostrar.length > 0" class="property-grid">
          
          <!-- Propiedades Reales o Mocks -->
          <div v-for="propiedad in propiedadesMostrar" :key="propiedad.id" class="property-card group">
            <div class="property-img-box">
              <img :src="getImagen(propiedad)" :alt="propiedad.titulo" class="property-img">
              <div class="property-type-badge">
                {{ propiedad.tipo }}
              </div>
            </div>
            <div class="property-body">
              <div>
                <h3 class="property-title">{{ propiedad.titulo }}</h3>
                <p class="property-location">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {{ propiedad.municipio }}, Putumayo
                </p>
                <div class="property-stats">
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                    {{ propiedad.area }} m²
                  </span>
                  <span v-if="propiedad.tipo === 'CASA' && propiedad.caracteristicas" class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    {{ propiedad.caracteristicas.habitaciones || 3 }} Hab
                  </span>
                </div>
              </div>
              <div class="property-footer">
                <span class="property-price">{{ formatCurrency(propiedad.precio) }}</span>
                <router-link to="/dashboard/user" class="property-btn-view">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </router-link>
              </div>
            </div>
          </div>

        </div>
        
        <!-- Estado sin resultados -->
        <div v-else class="empty-state">
          <div class="empty-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 class="empty-title">No encontramos propiedades con esos filtros</h3>
          <p class="empty-text">Prueba ajustando el presupuesto o el tipo de inmueble para ver más opciones.</p>
          <button @click="limpiarFiltros" class="btn-clear-filters">
            Limpiar Filtros
          </button>
        </div>
      </div>
    </section>

    <!-- Noticias y Blog de Inversión (SEO & Autoridad) -->
    <section id="noticias" class="blog-section">
      <div class="blog-content">
        <div class="blog-header">
          <div>
            <span class="section-badge">Blog de Inversión</span>
            <h2 class="section-title-dark">Mantente Informado</h2>
          </div>
        </div>

        <div class="blog-grid">
          <!-- Noticia 1: Aeropuerto -->
          <article class="blog-card group">
            <div class="blog-img-box">
              <img src="/images/aerial_town_day.png" alt="Aeropuerto Tres de Mayo y Panorámica" class="blog-img">
            </div>
            <div class="blog-body">
              <div class="blog-meta">
                <span class="text-emerald-500">Conectividad</span>
                <span>Julio 2026</span>
              </div>
              <h3 class="blog-title">
                El Aeropuerto Tres de Mayo: Motor del desarrollo en el Sur
              </h3>
              <p class="blog-text">
                Ubicado en las afueras de Puerto Asís, es el principal terminal aéreo del Putumayo. Esta conectividad asegura el constante flujo comercial e incrementa el valor de la propiedad raíz en la zona.
              </p>
              <a href="#" class="blog-link">
                Leer Artículo <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </article>

          <!-- Noticia 2: Desarrollo Urbano -->
          <article class="blog-card group">
            <div class="blog-img-box">
              <img src="/images/night_street.png" alt="Calles iluminadas de Puerto Asís" class="blog-img">
            </div>
            <div class="blog-body">
              <div class="blog-meta">
                <span class="text-emerald-500">Desarrollo</span>
                <span>Agosto 2026</span>
              </div>
              <h3 class="blog-title">
                Desarrollo Urbano: Una ciudad que nunca se detiene
              </h3>
              <p class="blog-text">
                Con un crecimiento constante impulsado por el comercio, Puerto Asís cuenta con una vibrante vida nocturna y una infraestructura en rápida modernización. Este dinamismo urbano incrementa enormemente el valor de las propiedades comerciales y residenciales.
              </p>
              <a href="#" class="blog-link">
                Leer Artículo <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </article>

          <!-- Noticia 3: Cultura y Centenario -->
          <article class="blog-card group">
            <div class="blog-img-box">
              <img src="/images/plaza_taxis.png" alt="Catedral y Parque Principal de Puerto Asís" class="blog-img">
            </div>
            <div class="blog-body">
              <div class="blog-meta">
                <span class="text-emerald-500">Cultura</span>
                <span>Mayo 2026</span>
              </div>
              <h3 class="blog-title">
                Una ciudad con historia y enorme proyección futura
              </h3>
              <p class="blog-text">
                Desde su fundación por los misioneros capuchinos y su Monumento al Centenario, Puerto Asís ha crecido siendo el pilar económico del departamento. Conoce por qué invertir aquí es apostar a lo seguro.
              </p>
              <a href="#" class="blog-link">
                Leer Artículo <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Footer Elegante -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
            <div class="footer-logo">S</div>
            <span class="footer-brand-text">Santander Constructora</span>
        </div>
        <p class="footer-copy">
          &copy; {{ new Date().getFullYear() }} Inmobiliaria & Constructora Santander. Puerto Asís, Putumayo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import api from '../services/api'

const scrolled = ref(false)
const propiedadesReales = ref([])
const obrasEntregadas = ref([])
const cargando = ref(true)
const cargandoProyectos = ref(true)

// Fetch Propiedades (Para venta)
const cargarPropiedades = async () => {
  try {
    const res = await api.get('/propiedades')
    propiedadesReales.value = res.data.filter(p => p.estado === 'DISPONIBLE')
  } catch (error) {
    console.error("Error cargando inventario", error)
  } finally {
    cargando.value = false
  }
}

// Fetch Proyectos Entregados
const cargarProyectos = async () => {
  try {
    const res = await api.get('/proyectos')
    obrasEntregadas.value = res.data
  } catch (error) {
    console.error('Error al cargar proyectos', error)
  } finally {
    cargandoProyectos.value = false
  }
}

const obraActiva = ref(null)

const abrirModalObra = (obra) => {
  obraActiva.value = obra
  document.body.style.overflow = 'hidden' // prevent background scrolling
}
const cerrarModalObra = () => {
  obraActiva.value = null
  document.body.style.overflow = 'auto'
}

// Variables para el cronómetro de estadísticas
const statsRef = ref(null)
const expCount = ref(0)
const m2Count = ref(0)
const familiesCount = ref(0)
let observer = null

const animateValue = (refVar, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    refVar.value = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const filtros = reactive({
  tipo: '',
  ubicacion: '',
  presupuesto: ''
})

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

// Datos de simulación (Mocks Premium) por si la BD está vacía
const mocks = [
  {
    id: 'mock1',
    titulo: 'Proyecto Residencial Campestre',
    tipo: 'CASA',
    municipio: 'Puerto Asís',
    area: 120,
    precio: 350000000,
    caracteristicas: { habitaciones: 4 },
    imagen_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mock2',
    titulo: 'Lote Urbano Premium',
    tipo: 'LOTE',
    municipio: 'Puerto Asís',
    area: 450,
    precio: 120000000,
    imagen_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mock3',
    titulo: 'Casa Moderna Familiar',
    tipo: 'CASA',
    municipio: 'Puerto Asís',
    area: 90,
    precio: 210000000,
    caracteristicas: { habitaciones: 3 },
    imagen_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  cargarPropiedades()
  cargarProyectos()

  // Configurar IntersectionObserver para iniciar cronómetro
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateValue(expCount, 0, 10, 2000)
      animateValue(m2Count, 0, 2100, 2000) // 20 casas * 105m2 promedio
      animateValue(familiesCount, 0, 20, 2000)
      observer.disconnect()
    }
  }, { threshold: 0.3 })
  
  if (statsRef.value) observer.observe(statsRef.value)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})

const propiedadesMostrar = computed(() => {
  let list = propiedadesReales.value.length > 0 ? propiedadesReales.value : mocks
  
  // Aplicar filtros
  if (filtros.tipo) {
    list = list.filter(p => p.tipo === filtros.tipo)
  }
  
  if (filtros.ubicacion) {
    // Si usas zonificación específica en los mocks o en la BD. 
    // Por simplicidad, filtraremos asumiendo un keyword simple en título o descripción,
    // pero si tuvieras un campo zona, se usaría p.zona === filtros.ubicacion.
  }
  
  if (filtros.presupuesto) {
    const max = Number(filtros.presupuesto) * 1000000;
    list = list.filter(p => p.precio <= max)
  }
  
  return list
})

const limpiarFiltros = () => {
  filtros.tipo = ''
  filtros.ubicacion = ''
  filtros.presupuesto = ''
}

const getImagen = (propiedad) => {
  if (propiedad.imagen_url) return propiedad.imagen_url // Mocks
  if (propiedad.imagenes && propiedad.imagenes.length > 0) return propiedad.imagenes[0].url // DB Real
  // Fallback si no tiene foto
  return propiedad.tipo === 'LOTE' 
    ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&w=800&q=80' 
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&w=800&q=80'
}

const formatCurrency = (val) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val)
}
</script>

<style scoped>
.home-container {
  @apply min-h-screen bg-[#F8FAFC] font-sans text-slate-800 selection:bg-[#0F172A] selection:text-white;
}

/* Navbar */
.navbar-fixed {
  @apply fixed w-full z-50 transition-all duration-500;
}
.navbar-scrolled {
  @apply bg-white/95 backdrop-blur-md shadow-sm py-2;
}
.navbar-top {
  @apply bg-transparent py-4;
}
.navbar-content {
  @apply max-w-7xl mx-auto px-6 lg:px-8;
}
.navbar-inner {
  @apply flex justify-between items-center;
}
.brand-wrapper {
  @apply flex-shrink-0 flex items-center gap-3 cursor-pointer;
}
.brand-logo {
  @apply w-10 h-10 bg-[#0F172A] rounded-lg flex items-center justify-center text-[#E2E8F0] font-serif font-bold text-xl;
}
.brand-text {
  @apply flex flex-col;
}
.brand-title {
  @apply font-bold text-lg tracking-tight text-[#0F172A] uppercase leading-none;
}
.brand-subtitle {
  @apply font-light text-sm tracking-[0.2em] text-[#64748B];
}

.desktop-nav {
  @apply hidden md:flex space-x-10;
}
.nav-link {
  @apply text-[13px] uppercase tracking-widest font-semibold transition-colors;
}
.nav-link-scrolled {
  @apply text-slate-600 hover:text-black;
}
.nav-link-top {
  @apply text-gray-200 hover:text-white;
}

.nav-actions {
  @apply flex items-center space-x-6;
}
.nav-login {
  @apply hidden md:block text-sm font-semibold transition-colors;
}
.nav-login-scrolled {
  @apply text-slate-600 hover:text-black;
}
.nav-login-top {
  @apply text-gray-200 hover:text-white;
}
.btn-cotizar {
  @apply bg-[#0F172A] hover:bg-slate-800 text-white px-6 py-2.5 rounded-md font-medium text-sm transition-all shadow-lg border border-slate-700;
}

/* Hero Section */
.hero-section {
  @apply relative min-h-[90vh] flex items-center justify-center pt-20;
}
.hero-bg {
  @apply absolute inset-0 z-0;
}
.hero-img {
  @apply w-full h-full object-cover;
}
.hero-overlay {
  @apply absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/60 to-[#0F172A]/90;
}
.hero-content {
  @apply max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full pt-10;
}
.hero-text-wrapper {
  @apply text-center max-w-4xl mx-auto mb-16;
}
.hero-badge {
  @apply inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md text-gray-200 font-medium text-xs uppercase tracking-widest mb-6 border border-white/20;
}
.hero-title {
  @apply text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1];
}
.hero-title-highlight {
  @apply text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500;
}
.hero-description {
  @apply mt-4 text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-light max-w-2xl mx-auto;
}

/* Search Box */
.search-box {
  @apply max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-4 md:p-6 translate-y-10 relative z-20 border border-slate-100;
}
.search-grid {
  @apply grid grid-cols-1 md:grid-cols-4 gap-4 items-end;
}
.search-label {
  @apply block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2;
}
.search-select {
  @apply w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-slate-800 text-sm focus:ring-1 focus:ring-slate-400 focus:border-slate-400 outline-none transition-all;
}
.btn-search {
  @apply w-full bg-[#0F172A] hover:bg-slate-800 text-white font-medium text-sm py-3 px-4 rounded-md shadow-md transition-all flex items-center justify-center gap-2;
}

/* History Section */
.history-section {
  @apply py-24 bg-white relative overflow-hidden;
}
.history-decor {
  @apply absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 transform origin-top-right;
}
.history-content {
  @apply max-w-7xl mx-auto px-6 lg:px-8 relative z-10;
}
.history-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-16 items-center;
}
.section-badge {
  @apply text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 block;
}
.section-badge-center {
  @apply text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 block text-center;
}
.section-title {
  @apply text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight;
}
.section-title-dark {
  @apply text-3xl md:text-4xl font-extrabold text-slate-900;
}
.history-text {
  @apply space-y-4 text-slate-600 text-sm md:text-base leading-relaxed;
}
.history-stats {
  @apply mt-8 flex gap-8 border-t border-slate-100 pt-8;
}
.stat-number {
  @apply text-3xl font-bold text-slate-900;
}
.stat-label {
  @apply text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1;
}
.history-image-wrapper {
  @apply relative;
}
.history-img {
  @apply rounded-lg shadow-2xl object-cover h-[500px] w-full;
}
.history-quote-box {
  @apply absolute -bottom-8 -left-8 bg-white p-6 rounded-lg shadow-xl border border-slate-100 max-w-xs;
}
.history-quote {
  @apply italic text-slate-600 text-sm;
}

/* Discover Section */
.discover-section {
  @apply py-24 bg-[#0F172A] relative overflow-hidden text-white;
}
.discover-bg-img {
  @apply absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1616892548261-2ce0bd5e8e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-no-repeat mix-blend-overlay;
}
.discover-bg-gradient {
  @apply absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/40 z-0;
}
.discover-content {
  @apply max-w-7xl mx-auto px-6 lg:px-8 relative z-10;
}
.discover-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-16 items-center;
}
.discover-badge {
  @apply inline-block py-1.5 px-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-6 border border-emerald-500/20;
}
.discover-title {
  @apply text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight;
}
.discover-description {
  @apply text-slate-300 text-lg mb-8 leading-relaxed font-light;
}
.discover-features {
  @apply space-y-6;
}
.feature-item {
  @apply flex items-start gap-4;
}
.feature-icon {
  @apply w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0;
}
.feature-title {
  @apply text-white font-bold mb-1;
}
.feature-text {
  @apply text-slate-400 text-sm leading-relaxed;
}
.discover-images {
  @apply grid grid-cols-2 gap-4;
}
.discover-img-1 {
  @apply rounded-2xl shadow-2xl w-full h-56 object-cover translate-y-8 border-2 border-slate-700/50 hover:scale-105 transition-transform duration-500;
}
.discover-img-2 {
  @apply rounded-2xl shadow-2xl w-full h-72 object-cover border-2 border-slate-700/50 hover:scale-105 transition-transform duration-500;
}

/* Services Section */
.services-section {
  @apply py-24 bg-[#F8FAFC];
}
.services-content {
  @apply max-w-7xl mx-auto px-6 lg:px-8;
}
.services-header {
  @apply text-center mb-16;
}
.services-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-8;
}
.service-card {
  @apply bg-white p-10 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg transition-all;
}
.service-icon-box {
  @apply w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#0F172A] transition-colors;
}
.service-card-title {
  @apply text-xl font-bold text-slate-900 mb-3;
}
.service-card-text {
  @apply text-slate-500 text-sm leading-relaxed;
}

/* Stats Section (Cronómetro) */
.stats-section {
  @apply pb-24 bg-[#F8FAFC];
}
.stats-content {
  @apply max-w-5xl mx-auto px-6 lg:px-8;
}
.stats-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-6;
}
.stat-card {
  @apply bg-white p-10 rounded-xl text-center border-2 border-orange-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1;
}
.stat-value {
  @apply text-5xl md:text-6xl font-extrabold text-[#0F172A] mb-2 tracking-tighter;
}
.stat-label {
  @apply text-lg font-medium text-slate-500;
}

/* Showcase Section */
.showcase-section {
  @apply py-24 bg-white border-t border-slate-100;
}
.showcase-content {
  @apply max-w-7xl mx-auto px-6 lg:px-8;
}
.showcase-header {
  @apply mb-12 max-w-3xl mx-auto;
}
.showcase-subtitle {
  @apply text-center text-slate-500 mt-4 text-lg font-light;
}
.obras-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
}
.obra-card {
  @apply bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1;
}
.obra-img-box {
  @apply relative h-64 overflow-hidden;
}
.obra-img {
  @apply w-full h-full object-cover transition-transform duration-700 group-hover:scale-110;
}
.obra-overlay {
  @apply absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center;
}
.btn-ver-obra {
  @apply bg-white text-slate-900 px-6 py-3 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300;
}
.obra-info {
  @apply p-6 text-center;
}
.obra-title {
  @apply text-xl font-bold text-slate-900 mb-2;
}
.obra-desc {
  @apply text-sm text-slate-500 leading-relaxed;
}

/* Modal Obra */
.obra-modal-backdrop {
  @apply fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 overflow-y-auto;
}
.obra-modal-content {
  @apply relative bg-white w-full max-w-6xl rounded-3xl p-6 md:p-12 my-auto shadow-2xl;
}
.btn-close-modal {
  @apply absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-2xl text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors;
}
.modal-header {
  @apply mb-12;
}
.showcase-gallery {
  @apply flex flex-col gap-16;
}
.showcase-item {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm transition-shadow hover:shadow-lg;
}
.showcase-item:nth-child(even) {
  @apply lg:-scale-x-100; /* Mirror the layout for even items so image is on right */
}
.showcase-item:nth-child(even) > * {
  @apply lg:-scale-x-100; /* Un-mirror the inner content */
}
.showcase-img {
  @apply w-full h-[400px] object-cover rounded-2xl shadow-md;
}
.showcase-info {
  @apply px-4 lg:px-10;
}
.showcase-item-title {
  @apply text-2xl font-bold text-slate-900 mb-4;
}
.showcase-item-text {
  @apply text-slate-600 leading-relaxed text-lg;
}

/* CTA Section */
.cta-section {
  @apply py-20;
}
.cta-content {
  @apply max-w-7xl mx-auto px-6 lg:px-8;
}
.cta-box {
  @apply bg-[#0F172A] rounded-2xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl;
}
.cta-bg-texture {
  @apply absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')];
}
.cta-title {
  @apply text-3xl md:text-4xl font-extrabold text-white mb-4 relative z-10;
}
.cta-text {
  @apply text-slate-400 max-w-2xl mx-auto mb-8 relative z-10;
}
.btn-cta {
  @apply inline-block bg-white text-[#0F172A] font-bold py-3.5 px-8 rounded-md hover:bg-gray-100 transition-colors shadow-lg relative z-10 text-sm uppercase tracking-wide;
}

/* Catalog Section */
.catalog-section {
  @apply py-24 bg-white border-t border-slate-100;
}
.catalog-content {
  @apply max-w-7xl mx-auto px-6 lg:px-8;
}
.catalog-header {
  @apply flex justify-between items-end mb-12;
}
.catalog-link {
  @apply hidden md:inline-block text-sm font-semibold text-slate-500 hover:text-[#0F172A] transition-colors border-b border-transparent hover:border-[#0F172A];
}

.loading-state {
  @apply text-center py-20 text-slate-500;
}
.spinner-icon {
  @apply animate-spin h-8 w-8 mx-auto mb-4 text-slate-300;
}

.property-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
}
.property-card {
  @apply bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col;
}
.property-img-box {
  @apply relative h-64 overflow-hidden bg-slate-100;
}
.property-img {
  @apply w-full h-full object-cover group-hover:scale-105 transition-transform duration-700;
}
.property-type-badge {
  @apply absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#0F172A] text-xs font-bold px-3 py-1.5 rounded-md shadow-sm uppercase tracking-wide;
}
.property-body {
  @apply p-6 flex-grow flex flex-col justify-between;
}
.property-title {
  @apply text-lg font-bold text-slate-900 mb-1 line-clamp-1;
}
.property-location {
  @apply text-sm text-slate-500 mb-4 flex items-center gap-1;
}
.property-stats {
  @apply flex items-center gap-4 text-xs font-medium text-slate-400 mb-6 pb-6 border-b border-slate-50;
}
.property-footer {
  @apply flex items-center justify-between;
}
.property-price {
  @apply text-xl font-extrabold text-[#0F172A];
}
.property-btn-view {
  @apply text-[#0F172A] p-2 hover:bg-slate-50 rounded-full transition-colors;
}

.empty-state {
  @apply text-center py-20 bg-slate-50 rounded-2xl border border-slate-100;
}
.empty-icon-box {
  @apply w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm;
}
.empty-title {
  @apply text-xl font-bold text-slate-900 mb-2;
}
.empty-text {
  @apply text-slate-500 text-sm;
}
.btn-clear-filters {
  @apply mt-6 px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-md shadow-sm font-medium hover:bg-slate-50 transition-colors;
}

/* Blog Section */
.blog-section {
  @apply py-24 bg-[#F8FAFC];
}
.blog-content {
  @apply max-w-7xl mx-auto px-6 lg:px-8;
}
.blog-header {
  @apply flex justify-between items-end mb-12;
}
.blog-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-8;
}
.blog-card {
  @apply bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100;
}
.blog-img-box {
  @apply relative h-48 overflow-hidden bg-slate-100 flex items-center justify-center;
}
.blog-img {
  @apply w-full h-full object-cover group-hover:scale-105 transition-transform duration-500;
}
.blog-body {
  @apply p-6;
}
.blog-meta {
  @apply flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3;
}
.blog-title {
  @apply text-lg font-bold text-slate-900 mb-3 group-hover:text-[#0F172A] transition-colors leading-tight;
}
.blog-text {
  @apply text-slate-500 text-sm leading-relaxed mb-4;
}
.blog-link {
  @apply text-sm font-bold text-[#0F172A] flex items-center gap-1 hover:text-slate-600 transition-colors;
}

/* Footer */
.footer {
  @apply bg-[#0F172A] border-t border-slate-800 py-12;
}
.footer-content {
  @apply max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6;
}
.footer-brand {
  @apply flex items-center gap-2;
}
.footer-logo {
  @apply w-8 h-8 bg-white rounded flex items-center justify-center text-[#0F172A] font-serif font-bold text-sm;
}
.footer-brand-text {
  @apply text-white font-medium tracking-widest text-xs uppercase;
}
.footer-copy {
  @apply text-slate-500 text-xs text-center md:text-left;
}
</style>
