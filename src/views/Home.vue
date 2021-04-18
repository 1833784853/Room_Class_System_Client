<template>
    <el-container>
        <el-aside>
            <Side :collapse="isCollapse" :userMenuList="userMenuList" :bgc="bgc" :active-color="activeColor"
                  :text-color="textColor" v-loading="menuListLoading"
                  element-loading-background="rgba(255, 255, 255, 0.6)"/>
        </el-aside>
        <el-container>
            <el-header :style="{height:headHeight,backgroundColor:lineBgc}">
                <Myheader :username="username" :userMenuList="userMenuList" :menuTitle="menuTitle" :userType="userType"
                          :btnSize="btnSize" :updateModel="updateModel" :bgc="bgc" :text-color="textColor"
                          :active-color="activeColor" :flag="flag" :userID="userID"/>
            </el-header>
            <el-main :style="{backgroundColor:lineBgc}">
                <div class="main">
                    <transition name="el-fade-in-linear">
                        <router-view :small="isSmall" :updateMenuTitle="updateMenuTitle"
                                     :btnSize="btnSize" :style="{position:'absolute',width:'100%'}" :bgc="bgc"
                                     :text-color="textColor"
                                     :active-color="activeColor" :flag="flag"
                                     :formLabelPosition="formLabelPosition" :username="username" :userID="userID"
                                     :userType="userType"/>
                    </transition>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Side from "../components/Home/Side";
    import Myheader from "../components/Home/Myheader";
    import {Message} from 'element-ui'

    export default {
        name: 'Home',
        components: {
            Side,
            Myheader,
        },
        mounted: function () {
            this.screenSizeHandle()
            window.onresize = () => this.screenSizeHandle()
            this.menuListLoading = true
            this.axios.get('/login/getUser').then(res => {
                if (res.status == 200) {
                    if (res.data.data) {
                        let {username, userType, userID} = res.data.data
                        this.username = username
                        this.userType = userType
                        this.userID = userID
                        this.axios({
                            method: 'get',
                            url: `/getSideMenuScope?userType=${userType}`
                        }).then((res) => {
                            this.menuListLoading = false
                            this.formatMenu(res.data.data)
                        }).catch(() => {
                            this.menuListLoading = false
                        })
                    } else {
                        Message.error("加载数据失败")
                    }
                }
            }).catch(() => {
                this.menuListLoading = true
            })
        },
        data: function () {
            return {
                userMenuList: [],
                menuListLoading: false,
                isCollapse: true,
                isSmall: false,
                headHeight: 'auto',
                username: '',
                userID: '',
                userType: '',
                menuTitle: '首页',
                btnSize: 'small',
                bgc: "#fff",
                textColor: "#909399",
                activeColor: "#409eff",
                lineBgc: "#eee",
                flag: true,
                formLabelPosition: 'left'
            }
        },
        methods: {
            formatMenu(data) {
                let list = []
                data.forEach((item, i) => {
                    if (item.menuParent == null) {
                        item.index = i + ""
                        list.push(item)
                    }
                })
                data.forEach((item) => {
                    if (item.menuParent != null) {
                        list.forEach((parent) => {
                            if (item.menuParent == parent.menuId) {
                                if (parent.children) {
                                    parent.children.push(item)
                                } else {
                                    parent.children = []
                                    parent.children.push(item)
                                }
                            }
                        })
                    }
                })
                this.userMenuList = list
            },
            updateMenuTitle(title) {
                this.menuTitle = title
            },
            updateModel(flag) {
                this.flag = flag
                if (flag) {
                    this.bgc = "#fff"
                    this.textColor = "#909399"
                    this.activeColor = "#409eff"
                    this.lineBgc = "#eee"
                } else {
                    this.bgc = "#100C2A"
                    this.textColor = "#fff"
                    this.activeColor = "#ffd04b"
                    this.lineBgc = "#000"
                }
            },
            screenSizeHandle() {
                var clientWidth = document.body.clientWidth;
                if (clientWidth <= 375) {
                    this.btnSize = 'mini'
                    this.isCollapse = true;
                    this.isSmall = true;
                    this.formLabelPosition = 'top'
                } else if (clientWidth < 768) {
                    this.btnSize = 'mini'
                    this.isCollapse = true;
                    this.isSmall = true
                    this.formLabelPosition = 'top'
                } else {
                    this.btnSize = 'small'
                    this.isCollapse = false;
                    this.isSmall = false
                    this.formLabelPosition = 'left'
                }
            }
        },
    }
</script>

<style scoped>
    @media screen and (min-width: 240px) {
        .el-header, .el-footer {
            color: #333;
            padding: 0 !important;
            text-align: center;
            background-color: #eee;
        }

        .el-footer {
            height: 100%;
        }

        .el-aside {
            color: #333;
            text-align: center;
            height: 100%;
            width: 64px !important;
        }

        .hidden-xs-only {
            display: none;
        }

        .el-main {
            color: #333;
            text-align: center;
            height: 100%;
            transition: all .5s;
            padding: 0px !important;
            background-color: #eee;
        }

        .el-container {
            height: 100%;
        }

        .main {
            transition: all .5s;
            background-color: #fff;
            position: relative;
            height: 100%;
            width: 100%;
            overflow: visible;
        }
    }

    @media screen and (min-width: 768px) {
        .el-header, .el-footer {
            padding: 0 20px !important;
        }

        .el-aside {
            color: #333;
            text-align: center;
            height: 100%;
            width: 220px !important;
        }

        .hidden-xs-only {
            display: inline-block
        }

        #app .el-main {
            padding: 20px !important;
        }

        .main {
            transition: all .5s;
            background-color: #fff;
            position: relative;
            height: 100%;
            width: 100%;
            border-radius: 10px;
            overflow: visible;
        }

    }

    @media screen and (min-width: 1330px) {

        .el-aside {
            background-color: #D3DCE6;
            color: #333;
            text-align: center;
            height: 100%;
            width: 220px !important;
        }

        #app .el-main {
            overflow: auto;
        }
    }


</style>
