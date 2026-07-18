<template>
  <div class="auth-page">
    <div class="background-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <div class="auth-container">
      <div class="auth-card glass-panel">
        <div class="logo-icon mx-auto"></div>
        <h2>Bienvenido de nuevo</h2>
        <p class="subtitle">Inicia sesión en tu cuenta</p>

        <!-- Mensaje de Marketing si viene del Cotizador -->
        <div v-if="isRedirectFromCotizador" class="alert-marketing">
          <span class="icon">✨</span> ¡Crea una cuenta o inicia sesión gratis para usar nuestro Cotizador Inteligente y guardar tu historial!
        </div>

        <!-- ERROR -->
        <div v-if="errorMsg" class="alert-error">
          <span class="icon">⚠️</span> {{ errorMsg }}
        </div>

        <div class="form-group">
          <label>Correo Electrónico</label>
          <div class="input-wrapper">
            <span class="input-icon">✉️</span>
            <input v-model="email" type="email" placeholder="ejemplo@correo.com" />
          </div>
        </div>

        <div class="form-group">
          <label>Contraseña</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input v-model="password" type="password" placeholder="••••••••" @keyup.enter="login" />
          </div>
        </div>

        <button class="btn-primary btn-block" @click="login" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? "Ingresando..." : "Ingresar" }}
        </button>

        <p class="footer-text">
          ¿No tienes cuenta?
          <router-link :to="{ path: '/registro', query: { redirect: route.query.redirect } }" class="link">Regístrate aquí</router-link>
        </p>
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
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: var(--bg-primary);
}

.background-blobs {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.blob {
  position: absolute;
  filter: blur(80px);
  opacity: 0.5;
  border-radius: 50%;
  animation: float 8s infinite alternate ease-in-out;
}

.blob-1 {
  top: -10%; left: -10%; width: 500px; height: 500px; background: var(--primary-light);
}

.blob-2 {
  bottom: -10%; right: -10%; width: 600px; height: 600px; background: rgba(236, 72, 153, 0.2); animation-delay: -4s;
}

@keyframes float {
  from { transform: translate(0, 0); }
  to { transform: translate(30px, -30px); }
}

.auth-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 420px;
  padding: 20px;
  animation: scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.auth-card {
  padding: 3rem 2.5rem;
  border-radius: var(--radius-xl);
  text-align: center;
  background: white;
}

.logo-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 14px;
  margin: 0 auto 1.5rem;
  box-shadow: var(--shadow-md);
}

h2 {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--text-muted);
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.alert-error {
  background: var(--danger-light);
  color: var(--danger-hover);
  padding: 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.alert-marketing {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(236, 72, 153, 0.1));
  color: var(--primary);
  padding: 1rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  text-align: left;
  gap: 10px;
  border: 1px solid rgba(79, 70, 229, 0.2);
}
.alert-marketing .icon {
  font-size: 1.2rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  font-size: 1.1rem;
  color: var(--text-muted);
  pointer-events: none;
}

input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.5rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  color: var(--text-main);
  transition: var(--transition-fast);
}

input:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), #6366f1);
  color: white;
  border: none;
  padding: 0.85rem;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-block {
  width: 100%;
  margin-top: 1rem;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md), var(--shadow-glow);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.footer-text {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.link {
  color: var(--primary);
  font-weight: 700;
}
.link:hover {
  text-decoration: underline;
}
</style>
