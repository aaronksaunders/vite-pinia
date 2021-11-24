import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
const pina = createPinia();
createApp(App).use(pina).mount('#app')
