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
            <h2>Crear Cuenta</h2>
            <p class="subtitle">Regístrate para acceder a herramientas exclusivas.</p>
          </div>

          <div v-if="isRedirectFromCotizador" class="alert-marketing">
            <span class="icon">🏢</span> Crea tu cuenta para acceder al Cotizador y guardar tu historial inmobiliario.
          </div>

          <div v-if="errorMsg" class="alert-error">
            <span class="icon">⚠️</span> {{ errorMsg }}
          </div>

          <form @submit.prevent="handleRegister" class="form-content">
            <div class="form-group">
              <label>Nombre Completo</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <input v-model="form.nombre" type="text" placeholder="Tu nombre completo" required />
              </div>
            </div>

            <div class="form-group">
              <label>Correo Electrónico</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <input v-model="form.correo" @input="validateEmailFormat" type="email" placeholder="ejemplo@correo.com" required />
              </div>
              <span v-if="emailError" class="inline-error">{{ emailError }}</span>
            </div>

            <div class="form-group">
              <label>Teléfono o Celular</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <input v-model="form.telefono" type="tel" placeholder="Tu número de contacto" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Contraseña</label>
                <div class="input-wrapper">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <input v-model="form.password" type="password" placeholder="••••••••" required />
                </div>
              </div>
              <div class="form-group">
                <label>Confirmar Contraseña</label>
                <div class="input-wrapper">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <input v-model="form.confirmPassword" type="password" placeholder="••••••••" required />
                </div>
              </div>
            </div>

            <button type="submit" class="btn-primary" :disabled="loading || !!emailError">
              <span v-if="loading" class="spinner"></span>
              {{ loading ? "Procesando..." : "REGISTRARSE Y ENTRAR" }}
            </button>
          </form>

          <p class="footer-text">
            ¿Ya tienes una cuenta con nosotros?
            <router-link :to="{ path: '/login', query: { redirect: route.query.redirect } }" class="link">Inicia sesión</router-link>
          </p>
        </div>
      </div>
      
      <!-- Lado Derecho: Imagen Corporativa -->
      <div class="auth-image-side">
        <div class="overlay"></div>
        <div class="image-content">
          <div class="corporate-banner">
            <svg class="shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            <div class="banner-text">
              <h3>Construimos el <strong>futuro de tu familia</strong></h3>
              <p>Únete a la red inmobiliaria más confiable de la región.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'

const form = reactive({
  nombre: '',
  correo: '',
  telefono: '',
  password: '',
  confirmPassword: ''
})

const errorMsg = ref('')
const emailError = ref('')
const loading = ref(false)

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isRedirectFromCotizador = computed(() => {
  return route.query.redirect === '/dashboard/cotizador'
})

// Validación en tiempo real (Nivel 1 Frontend)
const validateEmailFormat = () => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (form.correo && !regex.test(form.correo)) {
    emailError.value = "Introduzca una dirección de email válida";
  } else {
    emailError.value = "";
  }
}

const handleRegister = async () => {
  errorMsg.value = ''
  
  if (form.password !== form.confirmPassword) {
    errorMsg.value = "Las contraseñas no coinciden"
    return
  }

  validateEmailFormat();
  if (emailError.value) {
    return;
  }
  
  loading.value = true
  try {
    await authStore.register({
      nombre: form.nombre,
      correo: form.correo,
      telefono: form.telefono,
      password: form.password
    })
    
    // Auto-login automático después del registro exitoso
    await authStore.login({
      correo: form.correo,
      password: form.password
    })

    const redirectPath = route.query.redirect || "/dashboard/user"
    router.push(redirectPath)
    
  } catch (error) {
    errorMsg.value = error
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
  font-family: 'Arial', sans-serif;
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
  max-width: 480px;
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
  margin-bottom: 30px;
  cursor: pointer;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: #003366;
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
  margin-bottom: 24px;
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
  gap: 20px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  font-weight: 400;
  color: #0055a4;
  margin-bottom: 8px;
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

.inline-error {
  color: #cc0000;
  font-size: 0.85rem;
  margin-top: 4px;
}

.btn-primary {
  background: #0055a4;
  color: white;
  border: none;
  padding: 14px;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  text-transform: uppercase;
}

.btn-primary:hover:not(:disabled) {
  background: #003366;
}

.btn-primary:active:not(:disabled) {
  transform: translateY(1px);
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
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
  background-color: #003366;
  display: none;
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
