<template>
    <div>
        <div class="header" :style="{backgroundColor:bgc,color:textColor}">
            <div style="float: left">
                <span class="menu-title">{{ menuTitle }}</span>
            </div>
            <div class="left hidden-xs-only">
                <el-tag style="margin-top: 15px" :type="flag?'':'info'">{{ time }}</el-tag>
                <el-tooltip :content="'当前主题：' + isAuto" placement="top" style="margin: 0 10px">
                    <el-switch
                        v-model="isAuto"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="系统自适应"
                        :inactive-value="hour >7 && hour < 18? '黑':'白'">
                    </el-switch>
                </el-tooltip>
            </div>
            <div class="right">
                <MessageBadge :user-type="userType" :color="textColor" :userID="userID"/>
                <span class="username">
                    <span v-if="userType=='管理员'">管理员：</span>
                    {{ username }}
                </span>
                <el-button :type="flag?'primary':'info'" icon="el-icon-switch-button" round plain
                           @click="dialogVisible = true"
                           :size="btnSize">退出
                </el-button>
            </div>
        </div>
        <el-dialog
            title="退出提醒"
            :visible.sync="dialogVisible"
            style="text-align: left">
            <span>您确定要退出吗？</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="exit()">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
import {Message} from 'element-ui'
import MessageBadge from "./MessageBadge";

export default {
    name: "Myheader",
    components: {
        MessageBadge
    },
    props: {
        username: String,
        userMenuList: Array,
        userType: String,
        menuTitle: String,
        btnSize: String,
        updateModel: Function,
        bgc: String,
        textColor: String,
        activeColor: String,
        flag: Boolean,
        userID: String
    },

    data: function () {
        return {
            time: "",
            dialogVisible: false,
            hour: 0,
            isAuto: "系统自适应"
        }
    },
    mounted: function () {
        this.getTime()
        setInterval(this.getTime, 1000)
        this.updateView(new Date().getHours())
    },
    watch: {
        isAuto: {
            handler(val) {
                this.isAuto = val
                if (val != '系统自适应') {
                    this.updateModel(!this.flag)
                } else {
                    this.updateModel(!this.flag)
                }
            },
            immediate: true
        }
    },
    methods: {
        getDays(days) {
            let str = ''
            switch (days) {
                case 1:
                    str = "一"
                    break;
                case 2:
                    str = "二"
                    break;
                case 3:
                    str = "三"
                    break;
                case 4:
                    str = "四"
                    break;
                case 5:
                    str = "五"
                    break;
                case 6:
                    str = "六"
                    break;
                case 0:
                    str = "日"
                    break;
            }
            return str
        },
        getTime() {
            var date = new Date();
            var fullYear = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var days = date.getDay();
            if (this.isAuto == "系统自适应") {
                if (this.hour != date.getHours()) {
                    this.hour = date.getHours()
                    this.updateView(this.hour)
                }
            }
            this.time = `${fullYear}年${month + 1}月${day}日 星期${this.getDays(days)} ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`
        },
        exit() {
            if (localStorage.getItem('token') != null) {
                localStorage.removeItem('token')
                this.$router.push('/')
                Message.success("退出成功！！")
            }
        },
        updateView(hours) {
            if (hours > 7 && hours < 18) {
                this.updateModel(true)
            } else {
                this.updateModel(false)
            }
        }

    }
}
</script>

<style lang="less" scoped>
@bgc: #00d2ff;
@media screen and (min-width: 240px) {

    .hidden-xs-only {
        display: none;
    }

    .logo-box {
        text-align: center;
        display: none;
    }

    .el-container {
        height: 100%;
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
        font-size: 14px;
        line-height: 38px;
    }

    .menu-title {
        transition: all .5s;
        line-height: 60px;
        font-size: 14px;
        margin-right: 15px;
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

    .main {
        transition: all .5s;
        background-color: #fff;
    }
}

@media screen and (min-width: 768px) {

    .hidden-xs-only {
        display: inline-block
    }

    #app .el-dialog {
        width: 60%;
    }

    .header {
        margin: 15px 0;
        border-radius: 10px;
        padding: 0 15px;
        background-color: #fff;
        overflow: hidden;
        text-align: center;
        height: auto;
        border: none;
    }

    .header .left {
        float: left;
        text-align: center;
    }

    .header .right {
        margin-top: 25px;
        float: right;
        text-align: center;

        .el-dropdown-link {
            cursor: pointer;
            color: @bgc;
        }
    }

    .menu-title {
        margin-top: 25px;
        font-size: 16px;
        margin-right: 15px;
    }

    .header .right .el-button {
        transform: translateY(-14px);
    }

    .header .right .username {
        display: inline-block;
        transform: translateY(-12px);
        margin: 0 20px;
    }

    .header .right .el-dropdown {
        transform: translateY(-10px);
        margin-right: 10px;
    }

    .main {
        padding: 15px;
        border-radius: 12px;
        background-color: #fff;
    }
}

@media screen and (min-width: 1330px) {

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        height: 100%;
        width: 200px !important;
    }

    #app .el-dialog {
        width: 30%;
    }

    .header {
        margin: 15px 0;
        border-radius: 12px;
        padding: 0 20px;
        background-color: #fff;
        overflow: hidden;
        text-align: center;
        border: none;
    }

    .header .left {
        float: left;
        text-align: center;
    }

    .header .right {
        float: right;
        text-align: center;
    }

    .menu-title {
        margin-top: 25px;
        font-size: 16px;
        margin-right: 15px;
    }

    .header .right .el-button {
        transform: translateY(-14px);
    }

    .header .right .username {
        display: inline-block;
        transform: translateY(-12px);
        margin: 0 20px 0 50px;
    }

    .header .right .el-dropdown {
        transform: translateY(-10px);
    }
}
</style>
