// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入reset.css样式
import './assets/css/reset.css'

// 引入Vuex->store
import store from './store/index.js'

// 引入 公共 filters
import './filters/index.js'

// 引入 公共 components
import './components/index.js'

// 引入 element-ui 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
