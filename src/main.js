import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

//import VueRouter
import * as VueRouter from 'vue-router'

//import components
import Configurator from './components/Configurator.vue'
import Shop from './components/Shop.vue'

//define routes
const routes = [
  { path: '/configurator', component: Configurator },
  { path: '/', component: Shop },
]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
});

const app = createApp(App)
app.use(router)
app.mount('#app')