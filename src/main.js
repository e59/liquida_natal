import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(VueMask)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
