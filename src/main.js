import Vue from 'vue';
import 'normalize.css';
import './style/index.less';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// mock
import './mock';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
