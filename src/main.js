import Vue from 'vue';
import App from './App.vue';
import store from './store/store.js';

import GameManager from './managers/GameManager.js';

Vue.config.productionTip = false;

Vue.prototype.$manager = new GameManager(store);

window.app = new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
