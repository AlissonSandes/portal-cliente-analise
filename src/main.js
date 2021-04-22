import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import VueClipboard from 'vue-clipboard2';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VueClipboard,
  render: h => h(App)
}).$mount('#app')
