import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(Toast).mount('#app')
