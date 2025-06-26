import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:8000'

const app = createApp(App)

app.use(createPinia())
app.use(router)
/* 7:36am 27 Jun 25 */ 
// use axios in typescript
app.use(axios, {
    baseURL: 'http://127.0.0.1:8000'
})

app.mount('#app')
