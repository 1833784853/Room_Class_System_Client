<template>
    <div class="right" style="position: relative">
        <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
            <el-tab-pane name="first">
                <span slot="label"><i class="el-icon-paperclip myicon-style"></i>已有账号，请绑定</span>
                <el-form status-icon :model="commonForm" :rules="rules" ref="commonForm" label-width="70px"
                         label-position="center">
                    <el-form-item label-width="0">
                        <div class="userInfo-box">
                            <p class="avatar-box">
                                <el-avatar :size="avatarSize" :src="avatarSrc" @error="errorHandler">
                                    <i class="el-icon-user-solid" style="color: #eeeeee"></i>
                                </el-avatar>
                            </p>
                            <p style="float: left;color:#ffffff;">Hi, {{wxNickName}} 完成绑定后可以微信账号 一键登录哦~</p>
                        </div>
                    </el-form-item>
                    <el-form-item label="账号" prop="username">
                        <el-input type="text" autocomplete="off" v-model="commonForm.username" placeholder="用户名/手机号"
                                  prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password"
                                  autocomplete="off" v-model="commonForm.password" placeholder="请输入密码"
                                  prefix-icon="el-icon-lock"></el-input>
                    </el-form-item>
                    <el-form-item label-width="0">
                        <el-button @click="submitForm('commonForm')" class="login-btn" type="primary"
                        >立即绑定
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane name="second">
                <span slot="label"><i class="el-icon-edit myicon-style"></i>没有账号，请完善信息</span>
                <WxRegisterAndBindCompoent/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import WxRegisterAndBindCompoent from "../components/Login/WxRegisterAndBindCompoent";

    export default {
        name: "WxRegister",
        components: {
            WxRegisterAndBindCompoent
        },
        mounted() {
            this.axios.get(`/getWxUserInfo?openid=${this.$route.params.openid}`).then(res => {
                if (res.status == 200 && res.data.code == 200) {
                    let {nickname, headimgurl} = res.data.data
                    this.wxNickName = nickname
                    this.avatarSrc = headimgurl
                }
            })
        },
        data() {
            let validateUsername = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error("请输入用户名或手机号"))
                } else {
                    callback()
                }
            }

            let validatePwd = (rule, value, callback) => {
                if (value.trim() == '') {
                    callback(new Error("请输入密码"))
                } else {
                    callback()
                }
            }
            return {
                commonForm: {
                    username: '',
                    password: ''
                },
                activeName: 'first',
                avatarSize: 30,
                avatarSrc: "",
                wxNickName: "",
                rules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePwd, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(commonForm) {
                this.$refs[commonForm].validate((vaild) => {
                    if (vaild) {
                        this.axios.post("/login/bindAccount", {
                            username: this.commonForm.username,
                            password: this.commonForm.password,
                            openid: this.$route.params.openid
                        }).then(res => {
                            if (res.status == 200 && res.data.code == 200) {
                                localStorage.setItem("token", res.data.token)
                                this.$router.push("/home")
                                this.$message.success(res.data.msg)
                            } else {
                                this.$router.push("/login/wx")
                                this.$message.error(res.data.msg + "，请重试")
                            }
                        })
                    }
                })
            },
            handleClick() {

            },
            errorHandler() {
                return true;
            }
        }
    }
</script>

<style lang="less" scoped>
    @bgc: #00d2ff;
    @media screen and (min-width: 240px) {
        #weixin {
            height: 405px;
            overflow: hidden;
        }

        .right {
            text-align: left;
        }

        .main {
            .bottom {
                padding: 80px 15px;

                .left {
                    margin-left: 125px;
                }

                .right {
                    border-radius: 15px;

                    .login-btn {
                        width: 100%;
                        display: block;
                    }

                    .userInfo-box {
                        padding: 5px;
                        background-color: @bgc;
                        overflow: hidden;
                        border-radius: 7px;

                        .avatar-box {
                            float: left;
                            margin: 7px 7px 0;
                        }

                        p {
                            margin-top: 3px;
                            font-size: 12px;
                        }
                    }

                    .myicon-style {
                        font-size: 20px;
                        margin-right: 5px;
                    }

                    .registerBtn {
                        font-size: 16px;
                        color: @bgc;
                        text-decoration-line: underline;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 768px) {
        .main {
            .bottom {
                .left {
                    margin-left: 125px;
                }

                .right {
                    .userInfo-box {
                        padding: 5px;
                        background-color: @bgc;
                        overflow: hidden;
                        border-radius: 7px;

                        .avatar-box {
                            float: left;
                            margin: 8px 15px 0;
                        }

                        p {
                            margin-top: 5px;
                            font-size: 14px;
                        }
                    }
                }
            }
        }

    }

    @media screen and (min-width: 1400px) {
        #weixin {
            height: 365px;
            overflow: hidden;
        }


        .main {
            .bottom {
                padding: 80px 15px;

                .left {
                    margin-left: 125px;
                }

                .right {
                    padding: 30px 40px;
                    margin-left: 50px;
                    margin-right: 150px;
                    background-color: #fff;
                    border-radius: 15px;

                    .userInfo-box {
                        padding: 5px;
                        background-color: @bgc;
                        overflow: hidden;
                        border-radius: 7px;
                    }

                    .myicon-style {
                        font-size: 20px;
                        margin-right: 5px;
                    }

                    .login-btn {
                        width: 100%;
                        display: block;
                    }

                }
            }
        }
    }
</style>
