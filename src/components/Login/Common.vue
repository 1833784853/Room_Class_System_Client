<template>
    <div class="right">
        <el-form status-icon :model="commonForm" :rules="rules" ref="commonForm" label-width="70px"
                 label-position="center"
                 class="demo-ruleForm">
            <el-form-item label-width="0"  prop="username">
                <el-input type="text" autocomplete="off" v-model="commonForm.username" placeholder="用户名/手机号"
                          prefix-icon="el-icon-user"  @keyup.native.enter="submitForm('commonForm')"></el-input>
            </el-form-item>
            <el-form-item label-width="0" prop="password">
                <el-input type="password"
                          autocomplete="off" v-model="commonForm.password" placeholder="请输入密码"
                          prefix-icon="el-icon-lock" @keyup.native.enter="submitForm('commonForm')"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;margin-right: 20px">
                <el-button type="text" class="registerBtn" @click="$router.push('/register')">立即注册</el-button>
            </el-form-item>
            <el-form-item label-width="0">
                <el-button @click="submitForm('commonForm')" :loading="isloading" class="login-btn" plain >登录</el-button>
                <el-button @click="$router.push('/login/Wx')" class="login-btn-phone">微信登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {Message} from 'element-ui'

    export default {
        name: "Common",
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
                    password: ""
                },
                isloading: false,
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
                        // 登录

                        let {username, password} = this.commonForm

                        this.isloading = true;
                        this.axios.post(
                            '/login', {
                                "username": username,
                                "password": password
                            }
                        ).then((res) => {
                            this.isloading = false
                            if (res.status == 200) {
                                var data = res.data;
                                if (data.msg == '登录失败') {
                                    Message.error(data.data)
                                } else if (data.msg == "登录成功") {
                                    // 登录成功
                                    localStorage.setItem("token", data.data.token)
                                    this.$message.success("登录成功")
                                    this.$router.push('/home/info')
                                }
                            } else {
                                Message.error("网络不稳定，请检测网络！！")
                            }
                        }).catch(() => {
                            this.isloading = false
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @bgc: #00d2ff;
    @media screen and (min-width: 240px) {
        .main {
            .bottom {
                .left {
                    margin-left: 125px;
                }

                .right {
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: #fff;
                    border-radius: 15px;
                    width: 72%;

                    .login-btn {
                        font-size: 16px;
                        display: block;
                        width: 100%;
                    }

                    .login-btn-phone {
                        font-size: 16px;
                        display: block;
                        width: 100%;
                        color: #fff;
                        margin: 10px 0;
                        background-color: @bgc;
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
            }
        }

    }

    @media screen and (min-width: 1400px) {
        .main {
            .bottom {
                .left {
                    margin-left: 125px;
                }

                .right {
                    position: absolute;
                    top: 0;
                    left: 0;
                    padding: 30px 40px;
                    margin-left: 50px;
                    margin-right: 150px;
                    background-color: #fff;
                    border-radius: 15px;
                    width: 72%;

                    .login-btn {
                        padding: 12px 30px;
                        font-size: 18px;
                        margin-right: 80px;
                        display: inline-block;
                        width: auto;
                    }

                    .login-btn-phone {
                        color: #fff;
                        font-size: 18px;
                        padding: 12px 30px;
                        background-color: @bgc;
                        display: inline-block;
                        width: auto;
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
</style>
