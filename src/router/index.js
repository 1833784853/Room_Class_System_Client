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
import Details from "../views/Details";
import WxRegister from "../views/WxRegister";
import {Message} from "element-ui";
import Info from "../components/Info/Info";
import SeeRoomApply from "../components/ApplyList/SeeRoomApply";
import UserRoomList from "../components/ApplyList/UserRoomList";
import Daily from "../components/Daily/Daily";
import UserRoomLease from "../components/RoomLease/UserRoomLease";
import AdminRoomLease from "../components/RoomLease/AdminRoomLease";
import Contract from "../views/Contract";
import AdminReroomLease from "../components/RoomLease/AdminReroomLease";
import UserReroomLease from "../components/RoomLease/UserReroomLease";
import UserSeeRoomList from "../components/RoomSource/UserSeeRoomList";
import AdminAppleReroom from "../components/ApplyList/AdminAppleReroom";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
    },
    {
        path: '/details/:id',
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
                            next('/home/info')
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
                            next('/home/info')
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
                path: "info",
                name: "info",
                component: Info,
            },
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
            },
            {
                path: 'userseeapply',
                name: "用户看房申请",
                component: UserRoomList
            },
            {
                path: 'see-daily',
                name: "日常管理",
                component: Daily
            },
            {
                path: 'userleaselist',
                name: "用户在租列表",
                component: UserRoomLease
            },
            {
                path: 'list',
                name: '管理员在租列表',
                component: AdminRoomLease
            },
            {
                path: 'relist',
                name: 'adminRelist',
                component: AdminReroomLease
            },
            {
                path: 'userreleaselist',
                name: "userreleaselist",
                component: UserReroomLease
            },
            {
                path: "userroomlist",
                name: "userroomlist",
                component: UserSeeRoomList
            },
            {
                path: "reroom",
                name: "reroom",
                component: AdminAppleReroom
            }

        ],
        beforeEnter: (to, from, next) => {
            if (to.params.token !== undefined && localStorage.getItem("token") == null) {
                localStorage.setItem("token", to.params.token)
                Vue.axios.get('/login/checked').then(res => {
                    if (res.status == 200) {
                        if (res.data.msg == '未登录') {
                            next("/login/common")
                        } else {
                            Message.success("登录成功")
                            next("/home/info")
                        }
                    }
                }).catch(() => {
                    next("/login/common")
                })
            } else if (localStorage.getItem("token") == null) {
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
    },

    {
        path: '/contract',
        name: "seeContract",
        component: Contract
    }
]

const router = new VueRouter({
    routes
})

export default router
