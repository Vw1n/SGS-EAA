import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Router from './router'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(Router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')