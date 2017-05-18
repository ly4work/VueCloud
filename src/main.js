import Vue from 'vue';
import App from './App';
import router from './router/index.js';
import axios from 'axios';
// import VueAxios from 'vue-axios';
import Vuex from 'vuex';

Vue.use(Vuex, axios);

Vue.prototype.axios = axios;
Vue.config.productionTip = false;

import store from './store/store.js';
let _extend = function($tar, $sour) {
    for (let k in $sour) {
        $tar[k] = $sour[k];
    }
}
Vue.prototype._extendObj = _extend;
var vm = new Vue({
    el: '#app',
    data: {},
    router,
    store,
    template: '<App/>',
    components: { App },
});