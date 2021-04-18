import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import {Message, MessageBox, Notification} from "element-ui";
import 'element-ui/lib/theme-chalk/display.css';
// import './plugins/ant-design-vue'
axios.defaults.baseURL = '/api'  //关键代码
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['deviceCode'] = 'A95ZEF1-47B5-AC90BF3';
Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.use(VueAxios, axios)

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前给请求头添加token
    if (localStorage.getItem('token') != null) {
        config.headers = {'token': localStorage.getItem('token')}
    }
    return config;
}, function (error) {
    // 对请求错误统一处理
    Message.error("网络开小差了，请检查网络")
    return error
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据进行处理
    return response;
}, function (error) {
    // 对相应的错误统一处理
    if (error.config.timeout != 180000)
        Message.error("网络开小差了，请检查网络")
    return error
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
