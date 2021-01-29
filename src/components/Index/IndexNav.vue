<template>
    <el-row class="nav-box">
        <el-col :lg="4" :md="4" :sm="8" :xs="8">
            <img :src="indexLogo" style="margin: 5px 0 0 10px"/>
        </el-col>
        <el-col :lg="0" :md="0" :sm="$route.path.indexOf('/login')!=-1?16:(isLogin?16:10)" :xs="16"
                style="text-align: right;padding: 15px">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <i class="el-icon-menu" style="font-size: 40px"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-s-home" command="/">首页</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-school" command="/renting">租房</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-house" command="/new-house">新房</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-phone-outline" command="/contact">联系我们
                    </el-dropdown-item>
                    <el-dropdown-item icon="el-icon-edit" command="/Feedback">意见反馈</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-s-custom" command="/login/common" v-if="$route.path.indexOf('/login')!=-1?false:(isLogin?false:true)">登录</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-edit-outline" command="/register" v-if="$route.path.indexOf('/login')!=-1?false:(isLogin?false:($route.path.indexOf('/register')!=-1?false:true))">注册</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-s-custom" command="/home" v-if="isLogin">个人中心</el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
        <el-col :lg="16" :md="14" class="hidden-sm-only" :xs="0">
            <el-menu :default-active="activeIndex" mode="horizontal" router @select="handleSelect">
                <el-menu-item index="/">
                    <i class="el-icon-s-home" style="font-size: 22px"></i>首页
                </el-menu-item>

                <el-menu-item index="/renting">租房</el-menu-item>
                <el-menu-item index="/new-house">新房</el-menu-item>
                <el-submenu index="/about">
                    <template slot="title">关于我们</template>
                    <el-menu-item index="/contact">联系我们</el-menu-item>
                    <el-menu-item index="/Feedback">意见反馈</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
        <el-col :lg="4" :md="6" class="hidden-sm-only hidden-xs-only" v-if="$route.path.indexOf('/login')!=-1?false:(isLogin?false:true)">
            <el-button round class="loginBtn" icon="el-icon-s-custom" @click="$router.push('/login/common')">登录
            </el-button>
            <el-button type="primary" round class="registerBtn" icon="el-icon-edit-outline"
                       v-if="$route.path.indexOf('/register')!=-1?false:true" @click="$router.push('/register')">注册
            </el-button>
        </el-col>
        <el-col :lg="4" :md="6" :sm="6" class="hidden-sm-only" :xs="0" v-if="isLogin">
            <div class="personal">
                <el-link :underline="false" icon="el-icon-s-custom" href="/#/home" style="transition: all .3s">个人中心</el-link>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import indexLogo from '../../assets/index-logo.png'

    export default {
        name: "IndexNav",
        data() {
            return {
                activeIndex: this.$router.history.current.path,
                indexLogo: indexLogo,
                isLogin: false
            };
        },
        mounted() {
            this.axios.get('/login/checked').then(res => {
                if (res.status == 200) {
                    if (res.data.msg == '未登录') {
                        this.isLogin = false;
                    } else {
                        this.isLogin = true;
                    }
                }
            })
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleCommand(command) {
                this.$router.push(command);
            }
        }
    }
</script>

<style lang="less">
    @bgc: #00d2ff;
    @activeColor: #0125ff;
    .nav-box(@width) {
        min-width: @width;
        margin: 0 auto;
    }
    #app .el-menu.el-menu--horizontal {
        border-bottom: 0;
    }
    @media screen and (min-width: 240px) {
        #app {
            .el-main {
                overflow: visible;
                height: auto;
            }

            .nav-box {
                .nav-box(240px);
                .el-menu .el-menu-item.is-active {
                    border-bottom: 7px solid #fff;
                    color: @activeColor;
                }

                .el-menu .el-menu-item, .el-submenu {
                    font-size: 16px;
                    height: 100% !important;
                    margin: 0 10px;
                    color: #fff;
                }

                .el-menu .el-menu-item:hover, .el-menu .el-menu-item:focus {
                    background-color: transparent;
                    color: @activeColor;
                }

                .el-menu {
                    height: 70px;
                    background-color: @bgc;
                }

                .loginBtn, .registerBtn {
                    margin-top: 13px;
                }

                .personal {
                    .el-link {
                        font-size: 16px;
                        color: #fff;

                        &:hover {
                            color: @activeColor;
                        }
                    }

                    margin-top: 25px;
                }
            }
        }
    }

    @media screen and (min-width: 768px) {
        .nav-box {
            .nav-box(576px);

            .el-menu .el-menu-item.is-active {
                border-bottom: 7px solid #fff;
                color: @activeColor;
            }

            .el-menu .el-menu-item, .el-submenu {
                font-size: 16px;
                height: 100% !important;
                margin: 0 10px;
                color: #fff;
            }

            .el-menu .el-menu-item:hover, .el-menu .el-menu-item:focus {
                background-color: transparent;
                color: @activeColor;
            }

            .el-menu {
                height: 70px;
                background-color: @bgc;
            }

            .loginBtn, .registerBtn {
                margin-top: 13px;
            }

            .personal {
                .el-link {
                    font-size: 16px;
                    color: #fff;

                    &:hover {
                        color: @activeColor;
                    }
                }

                margin-top: 25px;
            }
        }
    }

    @media screen and (min-width: 1400px) {
        .nav-box {
            max-width: 1400px;
            margin: 0 auto;
        }
    }

</style>
