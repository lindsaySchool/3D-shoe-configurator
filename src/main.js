import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

//import VueRouter
import * as VueRouter from 'vue-router'

//import components
import Configurator from './components/Configurator.vue'
import Shop from './components/Shop.vue'
import Detail from './components/Detail.vue'
import Client from './components/Client.vue'
import Shopbag from './components/Shopbag.vue'

//define routes
const routes = [
  { path: '/configurator', component: Configurator },
  { path: '/', component: Shop },
  { path: '/product-detail', component: Detail },
  { path: '/client', component: Client },
  { path: '/shopbag', component: Shopbag },
]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
});

const app = createApp(App)
app.use(router)
app.mount('#app')