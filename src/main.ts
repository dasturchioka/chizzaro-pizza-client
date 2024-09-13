import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import router from './router'
import PageTransition from 'vue3-page-transition'

createApp(App).use(router).use(PageTransition).mount('#app')
