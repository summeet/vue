
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from "./router"

createApp(App)
.use(createPinia())
.use(router)
.use(Toast)
.mount('#app');
