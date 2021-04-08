import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAxios from './plugins/axios';
import './plugins/bootstrap-vue'
import VueClipboard from 'vue-clipboard2'
import router from './router'
import { store } from './store'
Vue.use(VueAxios)
Vue.use(VueClipboard)
Vue.config.productionTip = false

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')