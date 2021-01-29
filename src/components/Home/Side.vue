<template>
    <div class="tac" :style="{backgroundColor:bgc}">
        <div class="logo-box hidden-xs-only">
            <img :src="logo" />
        </div>
        <el-menu
                :default-active="this.$route.path"
                @open="handleOpen"
                @close="handleClose"
                :collapse="collapse"
                router
                :background-color="bgc"
                :text-color="textColor"
                :active-text-color="activeColor">
            <template v-for="item in userMenuList">
                <el-menu-item :index="item.menuUrl" v-if="item.children?false:true" :key="item.menuId">
                    <i :class="item.menuIcon"></i>
                    <span slot="title">{{item.menuTitle}}</span>
                </el-menu-item>

                <el-submenu :index="item.index" :key="item.menuId" v-else>
                    <template slot="title">
                        <i :class="item.menuIcon"></i>
                        <span>{{item.menuTitle}}</span>
                    </template>
                    <el-menu-item-group v-for="childMenu in item.children" :key="childMenu.menuId">
                        <el-menu-item :index="item.menuUrl+''+childMenu.menuUrl"
                                      :key="item.menuUrl+''+childMenu.menuUrl">{{childMenu.menuTitle}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </template>

        </el-menu>
    </div>
</template>

<script>
    import logo from '../../assets/gxzjy-logo.png'

    export default {

        name: "Side",
        props: {
            collapse: Boolean,
            userMenuList: Array,
            bgc:String,
            textColor: String,
            activeColor: String
        },
        data: function () {
            return {
                logo: logo,
            }
        },
        methods: {
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            }
        }
    }
</script>

<style scoped>
    @media screen and (min-width: 240px) {
        .el-aside {
            color: #333;
            text-align: center;
            height: 100%;
            width: 64px !important;
        }


        .hidden-xs-only {
            display: none;
        }

        .logo-box {
            text-align: center;
            display: none;
            padding: 20px 0;
        }

        .header {
            background-color: #fff;
            overflow: hidden;
            transition: all 1s;
            text-align: center;
            height: 64px;
            padding: 0 5px;
            border-bottom: 1px solid #ccc;
        }

        .header .left {
            float: left;
            text-align: center;
        }

        .header .right {
            float: right;
            text-align: center;
        }

        .el-breadcrumb {
            transition: all .5s;
            margin-top: 25px;
            font-size: 16px;
            margin-right: 15px;
        }

        #app .el-menu > .el-submenu .el-submenu__title {
            color: #000;
        }

        .header .right .el-button {
            transition: all .5s;
            transform: translateY(10px);
        }

        .header .right .username {
            display: inline-block;
            transition: all .5s;
            transform: translateY(10px);
            margin: 0 10px;
        }

        .header .right .el-dropdown {
            transform: translateY(-10px);
            margin-right: 10px;
        }
    }

    @media screen and (min-width: 768px) {
        .el-aside {
            color: #333;
            text-align: center;
            height: 100%;
            width: 220px !important;
        }

        .hidden-xs-only {
            display: inline-block
        }

        .logo-box {
            text-align: center;
            display: block;
        }

        .logo-box img {
            width: 70%;
        }

        .header {
            margin: 15px 0;
            border-radius: 15px;
            padding: 0 15px;
            background-color: #fff;
            overflow: hidden;
            text-align: center;
            height: auto;
        }

        .header .left {
            float: left;
            text-align: center;
        }

        .header .right {
            float: right;
            text-align: center;
        }

        .el-breadcrumb {
            margin-top: 30px;
            font-size: 16px;
            margin-right: 15px;
        }

        .header .right .el-button {
            transform: translateY(-14px);
        }

        .header .right .username {
            display: inline-block;
            transform: translateY(-12px);
            margin: 0 10px;
        }

        .header .right .el-dropdown {
            transform: translateY(-10px);
            margin-right: 10px;
        }
    }

    @media screen and (min-width: 1330px) {
        .header {
            margin: 15px 0;
            border-radius: 15px;
            padding: 0 20px;
            background-color: #fff;
            overflow: hidden;
            text-align: center;
        }

        .header .left {
            float: left;
            text-align: center;
            width: 50%;
        }

        .header .right {
            float: right;
            text-align: center;
        }

        .el-breadcrumb {
            margin-top: 30px;
            font-size: 16px;
            margin-right: 15px;
        }

        .header .right .el-button {
            transform: translateY(-14px);
        }

        .header .right .username {
            display: inline-block;
            transform: translateY(-12px);
            margin: 0 10px;
        }

        .header .right .el-dropdown {
            transform: translateY(-10px);
            margin-right: 10px;
        }
    }

    /*侧边栏*/
    .tac {
        height: 100%;
        background-color: #fff;
    }
</style>
