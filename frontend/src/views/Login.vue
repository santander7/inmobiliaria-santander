<template>
  <div class="auth-page">
    <div class="auth-split">
      <!-- Lado Izquierdo: Formulario -->
      <div class="auth-form-side">
        <div class="auth-container">
          <div class="logo-area" @click="$router.push('/')">
            <div class="logo-icon">S</div>
            <span class="logo-text">Inmobiliaria Santander</span>
          </div>

          <div class="header-text">
            <h2>Bienvenido al módulo de ingreso</h2>
            <p class="subtitle">Inicia sesión con tus credenciales corporativas.</p>
          </div>

          <div v-if="isRedirectFromCotizador" class="alert-marketing">
            <span class="icon">🏢</span> Ingresa para acceder al Cotizador y guardar tu historial inmobiliario.
          </div>

          <div v-if="errorMsg" class="alert-error">
            <span class="icon">⚠️</span> {{ errorMsg }}
          </div>

          <form @submit.prevent="login" class="form-content">
            <div class="form-group">
              <label>Correo Electrónico</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <input v-model="email" type="email" placeholder="ejemplo@correo.com" required />
              </div>
            </div>

            <div class="form-group">
              <div class="label-row">
                <label>Contraseña</label>
                <a href="#" @click.prevent="alert('Funcionalidad en construcción')" class="forgot-link">¿Olvidaste tu contraseña?</a>
              </div>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <input v-model="password" type="password" placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" class="btn-corporate" :disabled="loading">
              <span v-if="loading" class="spinner"></span>
              {{ loading ? "Verificando..." : "SIGUIENTE" }}
            </button>
          </form>

          <p class="footer-text">
            ¿No estás registrado en nuestro sistema?
            <router-link :to="{ path: '/registro', query: { redirect: route.query.redirect } }" class="link">Crear cuenta</router-link>
          </p>
        </div>
      </div>
      
      <!-- Lado Derecho: Imagen Corporativa (Inspirado en Jaramillo Mora / Alianza) -->
      <div class="auth-image-side">
        <div class="overlay"></div>
        <div class="image-content">
          <div class="corporate-banner">
            <svg class="shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div class="banner-text">
              <h3>Por su seguridad, <strong>evite realizar transacciones</strong> en lugares de conexión pública</h3>
              <p>y procure utilizar siempre sitios confiables.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useAuthStore } from "../store/auth"

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const isRedirectFromCotizador = computed(() => {
  return route.query.redirect === '/dashboard/cotizador'
})

const email = ref("")
const password = ref("")
const errorMsg = ref("")
const loading = ref(false)

const login = async () => {
  errorMsg.value = ""

  if (!email.value || !password.value) {
    errorMsg.value = "Todos los campos son obligatorios"
    return
  }

  try {
    loading.value = true
    await auth.login({
      correo: email.value,
      password: password.value
    })

    if (auth.isAdmin) {
      router.push("/dashboard/admin")
    } else {
      const redirectPath = route.query.redirect || "/dashboard/user"
      router.push(redirectPath)
    }

  } catch (err) {
    errorMsg.value = err || "Error al iniciar sesión"
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  background-color: #ffffff;
  font-family: 'Arial', sans-serif; /* Tipografía más corporativa */
}

.auth-split {
  display: flex;
  width: 100%;
}

/* Lado Izquierdo (Formulario) */
.auth-form-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  position: relative;
}

.auth-container {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  cursor: pointer;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: #003366; /* Azul profundo corporativo */
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 51, 102, 0.3);
}

.logo-text {
  font-weight: 700;
  font-size: 1.3rem;
  color: #003366;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-text h2 {
  font-size: 2rem;
  font-weight: 400;
  color: #003366;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.header-text .subtitle {
  color: #666;
  font-size: 1rem;
  margin-bottom: 32px;
}

/* Alertas */
.alert-error {
  background: #fff0f0;
  color: #cc0000;
  padding: 12px 16px;
  border-left: 4px solid #cc0000;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.alert-marketing {
  background: #f0f7ff;
  color: #0055a4;
  padding: 14px;
  border-left: 4px solid #0055a4;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Formulario */
.form-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

label {
  font-size: 0.9rem;
  font-weight: 400;
  color: #0055a4;
}

.forgot-link {
  font-size: 0.85rem;
  color: #0055a4;
  text-decoration: none;
  font-weight: 400;
  transition: color 0.2s;
}

.forgot-link:hover {
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  width: 20px;
  height: 20px;
  color: #999;
  pointer-events: none;
}

input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 1rem;
  color: #333;
  transition: all 0.2s ease;
  background-color: transparent;
}

input:focus {
  outline: none;
  border-bottom-color: #0055a4;
  background-color: #f9fbfd;
}

input::placeholder {
  color: #aaa;
}

.btn-corporate {
  background-color: #0055a4 !important;
  color: white !important;
  border: none !important;
  padding: 14px !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  letter-spacing: 1px !important;
  cursor: pointer !important;
  transition: background 0.2s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  margin-top: 10px !important;
  text-transform: uppercase !important;
}

.btn-corporate:hover:not(:disabled) {
  background-color: #003366 !important;
}

.btn-corporate:active:not(:disabled) {
  transform: translateY(1px) !important;
}

.btn-corporate:disabled {
  background-color: #ccc !important;
  cursor: not-allowed !important;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.footer-text {
  margin-top: 32px;
  font-size: 0.95rem;
  color: #666;
  text-align: center;
}

.link {
  color: #0055a4;
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}

.link:hover {
  text-decoration: underline;
}

/* Lado Derecho (Azul Sólido Corporativo) */
.auth-image-side {
  flex: 1.2;
  position: relative;
  background-color: #003366; /* Azul Institucional */
  display: none; /* Oculto en móviles */
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 900px) {
  .auth-image-side {
    display: flex;
  }
}

.corporate-banner {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 400px;
  color: white;
}

.shield-icon {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.banner-text h3 {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.4;
  margin: 0 0 5px 0;
}

.banner-text h3 strong {
  font-weight: 700;
}

.banner-text p {
  font-size: 0.95rem;
  margin: 0;
  color: #99badd;
}
</style>
