import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import { URL1,URL2,URL3 } from './gobal'
import './assets/css/icon.css'
// 引入echarts
import * as echarts from 'echarts'
//引入axios
import axios from 'axios'


const app = createApp(App)
app.config.globalProperties.$URL1=URL1
app.config.globalProperties.$URL2=URL2
app.config.globalProperties.$URL3=URL3
app.config.globalProperties.$axios=axios
app.config.globalProperties.$echarts=echarts


installElementPlus(app)
app
    .use(store)
    .use(router)
    .mount('#app')