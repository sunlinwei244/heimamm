import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'

// .less文件也可以导入到这个文件
// 导入less,webpack会让main.js这个入口文件和.less建立依赖关系
// 这里的路径的@等同于是目录的src
// import '@/styles/base.less';

Vue.config.productionTip = false

// 导入ElementUI
import './plugins/element'

// 导入路由
import router from './router'

new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')
