import './assets/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import GenshinAPI from '@/components/GenshinAPI.vue'


const app = createApp(App)
app.component('genshin-api', GenshinAPI)
app.mount('#app')



