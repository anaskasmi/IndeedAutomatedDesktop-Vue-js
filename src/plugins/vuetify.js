import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    breakpoint: {
        thresholds: {
            xs: 340,
            sm: 800,
            md: 1058,
            lg: 1280,
        },
        scrollBarWidth: 24,
    },
});