import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAxios from './plugins/axios';
import store from './store'
import './plugins/bootstrap-vue'

Vue.use(VueAxios)
Vue.config.productionTip = false

new Vue({
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')