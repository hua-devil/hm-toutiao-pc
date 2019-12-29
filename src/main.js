import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import MyBread from '@/components/my-bread'
// 1.router文件夹 （当你导入一个文件夹）默认会加载文件夹下得index.js文件
// 1.1 index.js 含义 索引文件（默认会访问得文件）
// 1.2 index.js index.vue index.json 支持三种格式，优先级与这里得顺序一致
// 2.0 vue-cli 提高一个绝对路径别名  src绝对路径
import router from '@/router'
import plugin from '@/plugin'

import axios from '@/api'
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.use(plugin)
Vue.component('my-bread', MyBread)

// 日志的详情与否，生产环境 开发环境
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// main.js 入口文件
// 职责：做全局范围内的依赖和配置
// 职责：创建一个根VUE实例
