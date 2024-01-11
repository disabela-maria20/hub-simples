import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.use(require("moment"));

import jQuery from "jquery";
const $ = jQuery;
window.$ = $;


import Tooltip from "vue-directive-tooltip";
import "vue-directive-tooltip/dist/vueDirectiveTooltip.css";
Vue.use(Tooltip);

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')