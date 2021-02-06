import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index";
import Login from "../views/Login";
import Common from "../components/Login/Common";
import Wx from "../components/Login/Wx";
import Home from "../views/Home";
import Register from "../views/Register";
import RoomList from "../components/RoomSource/RoomList";
import BannerHandle from "../components/banner-handle/Banner-handle"
import NewsHandle from "../components/news-handle/News-handle"
import ReleaseNews from "../components/news-handle/ReleaseNews"
import NewsEdit from "../components/news-handle/NewsEdit";
import Details from "../components/Index/Details";
import WxRegister from "../views/WxRegister";
import {Message} from "element-ui";
import Info from "../components/Info/Info";
import SeeRoomApply from "../components/ApplyList/SeeRoomApply";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
    },
    {
        path: '/details',
        name: 'Details',
        component: Details
    },
    {
        name: "login",
        path: '/login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("token") == null) {
                next()
            } else {
                Vue.axios.get('/login/checked').then(res => {
                    if (res.status == 200) {
                        if (res.data.msg == '未登录') {
                            next()
                        } else {
                            next('/home')
                        }
                    }
                })
            }
        },
        children: [
            {
                path: 'common',
                name: 'common',
                component: Common,
            },
            {
                path: 'wx',
                name: 'Wx',
                component: Wx,
            },
            {
                path: 'WxRegister/:openid/',
                name: 'WxRegister',
                component: WxRegister
            }
        ]
    },
    {
        path: '/register',
        name: "register",
        component: Register,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("token") == null) {
                next()
            } else {
                Vue.axios.get('/login/checked').then(res => {
                    if (res.status == 200) {
                        if (res.data.msg == '未登录') {
                            next()
                        } else {
                            next('/home')
                        }
                    }
                })
            }
        }
    },
    {
        path: '/home/:token*',
        name: 'home',
        component: Home,

        children: [
            {
                path: "roomlist",
                name: "房源列表",
                component: RoomList
            },
            {
                path: "banner-handle",
                name: "轮播图管理",
                component: BannerHandle
            },
            {
                path: "news-handle",
                name: "新闻管理",
                component: NewsHandle,
            },
            {
                path: "news-release",
                name: "发布新闻",
                component: ReleaseNews,
            },
            {
                path: 'news-edit-page/:roomNewID',
                name: '新闻编辑',
                component: NewsEdit
            },
            {
                path: 'info',
                name: "实名认证",
                component: Info,
            },
            {
                path: 'seeroom',
                name: "看房申请",
                component: SeeRoomApply
            }
        ],
        beforeEnter: (to, from, next) => {
            if (to.params.token !== undefined && localStorage.getItem("token") == null) {
                localStorage.setItem("token", to.params.token)
                Vue.axios.get('/login/checked').then(res => {
                    if (res.status == 200) {
                        if (res.data.msg == '未登录') {
                            this.$message.error("登录失效")
                            next("/login/common")
                        } else {
                            this.$message.success("登录成功")
                            next("/home")
                        }
                    }
                }).catch(() => {
                    Message.error("登陆失败")
                    next("/login/common")
                })
            } else if (localStorage.getItem("token") == null) {
                this.$message.error("登录失效")
                next("/login/common")
            } else {
                Vue.axios.get('/login/checked').then(res => {
                    if (res.status == 200) {
                        if (res.data.msg == '未登录') {
                            next("/login/common")
                        } else {
                            next()
                        }
                    }
                })
            }
        },
    }
]

const router = new VueRouter({
    routes
})

export default router
