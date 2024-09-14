import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import router from './router'
import PageTransition from 'vue3-page-transition'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).use(PageTransition).mount('#app')
