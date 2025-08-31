import Vue from 'vue'
import App from './App.vue'
// import VueCookie from 'vue-cookie'
// Vue.use(VueCookie)

//引入UI组件库
import ElementUI from 'element-ui';
//引入Element UI全部样式
import 'element-ui/lib/theme-chalk/index.css';
//使用UI组件库
Vue.use(ElementUI);
//引入路由
import router from '@/router/index';
//引入echarts
import 'echarts';
import ECharts from 'vue-echarts';
Vue.component('ECharts',ECharts);
//引入百度地图
import BaiduMap from 'vue-baidu-map'
//引入初始样式
import '@/assets/normalize.css'
//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Lazyload } from 'vant';
Vue.use(Lazyload);
import { Rate } from 'vant';
Vue.use(Rate);
import { Form } from 'vant';
import { Field } from 'vant';
Vue.use(Form);
Vue.use(Field);
import { List } from 'vant';
Vue.use(List);
import { NoticeBar } from 'vant';
Vue.use(NoticeBar);
import { AddressList } from 'vant';
Vue.use(AddressList);
import { Popup } from 'vant';
Vue.use(Popup);
import { Toast } from 'vant';
Vue.use(Toast);
import { Uploader } from 'vant';
Vue.use(Uploader);
import { ActionSheet } from 'vant';
Vue.use(ActionSheet);
import { Tag } from 'vant';
Vue.use(Tag);
import { RadioGroup, Radio } from 'vant';
Vue.use(Radio);
Vue.use(RadioGroup);
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);
import { ShareSheet } from 'vant';
Vue.use(ShareSheet);
import { SwipeCell } from 'vant';
Vue.use(SwipeCell);
import { Stepper } from 'vant';
Vue.use(Stepper);

//使用百度地图
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'LHYxYaMcMkd8mOy8ja2pTpHX7mJfG62I'
})

Vue.config.productionTip = false

// 检查localStorage中是否有登录标记
function isAuthenticated() {
  return localStorage.getItem('userLoggedIn') === 'true';
}

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    // 如果用户已登录，则重定向到 /footer/start
    if (isAuthenticated()) {
      next('/footer/start');
    } else {
      // 如果用户未登录，则重定向到 /login
      next('/login');
    }
  } else {
    next();
  }
});

new Vue({
  render: h => h(App),
  //注册路由
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route，$router属性
  router,
}).$mount('#app')


