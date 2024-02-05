import './assets/main.css'

import { createApp } from 'vue'
import '@/scss/styles.scss'
import App from '@/App.vue'
import VocabAPI from '@/components/JVocabList.vue'
import navBar from '@/components/NavBar.vue'

const app = createApp(App)
app.component('vocab-api', VocabAPI)
app.component('navBar', navBar)
app.mount('#app')
