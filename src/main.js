import Vue from "vue";
import App from "./App.vue";
import VueGridLayout from "vue-grid-layout";
import * as echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
Vue.use(VueGridLayout);
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App)
}).$mount("#app");
