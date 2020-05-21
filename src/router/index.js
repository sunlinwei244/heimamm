// 导入vue和vue-router插件
import Vue from 'vue'
import vueRouter from 'vue-router'

// 导入子组件
import Login from '../views/login'
import Layout from '../views/layout'

// 注册路由
Vue.use(vueRouter);

// 路由实例化和配置
let router = new vueRouter({
    routes: [
        {
            path: '/',
            // 路由重定向
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/layout',
            component: Layout
        }
    ]
})

// 导出路由
export default router;