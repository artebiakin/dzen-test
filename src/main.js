import Vue from 'vue';
import App from './App.vue';
import i18n from './i18n';
import { createProvider } from './vue-apollo';

Vue.config.productionTip = false;

new Vue({
  i18n,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
