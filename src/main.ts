import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'vue3-toastify/dist/index.css'
import type { ToastContainerOptions } from 'vue3-toastify'
import Vue3Toastify from 'vue3-toastify'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions)

app.mount('#app')
