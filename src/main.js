import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAxios from './plugins/axios';
import './plugins/bootstrap-vue'
import VueClipboard from 'vue-clipboard2'
import router from './router'
import { store } from './store'
import CKEditor from 'ckeditor4-vue';
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

Vue.use(CKEditor);
Vue.use(VueAxios);
Vue.use(VueClipboard);

//VueSweetalert2
Vue.config.productionTip = false
const options = {
    confirmButtonColor: "#39A2DB",
    cancelButtonColor: "#DBE6FD",
};
Vue.use(VueSweetalert2, options);


new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')