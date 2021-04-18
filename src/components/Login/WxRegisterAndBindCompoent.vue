<template>
    <el-row>
        <el-col :lg="24">
            <div class="content">
                <el-form status-icon :model="commonForm" :rules="rules" ref="commonForm"
                         label-position="center"
                         class="demo-ruleForm">
                    <el-form-item prop="phone">
                        <el-input type="text" autocomplete="off" v-model="commonForm.phone"
                                  prefix-icon="el-icon-phone-outline"
                                  placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password"
                                  autocomplete="off" v-model="commonForm.password" prefix-icon="el-icon-lock"
                                  placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-progress :percentage="percentage" :color="customColorMethod"
                                     :format="formatpwd"></el-progress>
                    </el-form-item>
                    <el-form-item prop="repassword">
                        <el-input type="password" prefix-icon="el-icon-lock"
                                  autocomplete="off" v-model="commonForm.repassword"
                                  placeholder="请输入确认密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="code" style="">
                        <el-input
                                autocomplete="off" v-model="commonForm.code" placeholder="请输入验证码"
                                prefix-icon="el-icon-orange"
                                class="code-input" style="float: left"></el-input>
                        <VerificationCode :cgCode='cgCode' :identifyCode="identifyCode"
                                          style="float: right;"/>
                    </el-form-item>
                    <el-form-item label-width="0" style="margin-top: 40px">
                        <el-button type="primary" class="register-btn" @click="submitForm('commonForm')"
                                   :loading="isloading">
                            注册并绑定
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import VerificationCode from "./VerificationCode";

    export default {
        name: "Register",
        mounted() {
            this.cgCode()
        },
        data() {
            let validatePwd = (rule, value, callback) => {
                value = value.trim()
                if (value === '') {
                    callback(new Error("请输入密码"))
                    this.percentage = 0;
                } else if (value.length < 6 || value.length > 18) {
                    callback(new Error("请输入6-18位，数字、大小写字母组成的密码！！"))
                } else if (/^\d+$/.test(value) || /^[a-z]+$/.test(value) || /^[A-Z]+$/.test(value)) {
                    this.percentage = 33;
                    callback()
                } else if (/^[a-z0-9]+$/g.test(value)) {
                    this.percentage = 66;
                    callback()
                } else if (/^[A-Za-z0-9]+$/g.test(value)) {
                    this.percentage = 100;
                    callback()
                } else {
                    callback()
                }
            }
            let validatePhone = (rule, value, callback) => {
                value = value.trim()
                if (value == '') {
                    callback(new Error("请输入手机号码!"))
                } else if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
                    callback(new Error("请输入正确的手机号码!!"))
                } else {
                    callback()
                }
            }
            let validateRepassword = (rule, value, callback) => {
                if (value.trim() == '') {
                    callback(new Error("请输入确认密码"))
                } else if (value != this.commonForm.password) {
                    callback(new Error("密码不一致"))
                } else {
                    callback()
                }
            }
            let validateCode = (rule, value, callback) => {
                if (value.trim() == '') {
                    callback(new Error("请输入验证码"))
                } else {
                    callback()
                }
            }
            return {
                commonForm: {
                    password: "",
                    phone: '',
                    repassword: '',
                    code: ''
                },
                percentage: 0,
                isloading: false,
                identifyCode: "",
                rules: {
                    password: [
                        {validator: validatePwd, trigger: 'change'}
                    ],
                    phone: [
                        {validator: validatePhone, trigger: 'blur'}
                    ],
                    repassword: [
                        {validator: validateRepassword, trigger: 'blur'}
                    ],
                    code: [
                        {validator: validateCode, trigger: 'blur'}
                    ]
                }
            }
        },
        components: {
            VerificationCode
        },
        methods: {
            submitForm(commonForm) {
                this.$refs[commonForm].validate((vaild) => {
                    if (vaild) {
                        let {password, phone, code, repassword} = this.commonForm
                        this.axios.post('/login/wxRegisterAndBind', {
                            phone,
                            password,
                            repassword,
                            code,
                            openid: this.$route.params.openid
                        }).then(res => {
                            if (res.status == 200 && res.data.code == 200) {
                                this.$message.success(res.data.msg)
                                if (res.data.token) {
                                    localStorage.setItem("token", res.data.token)
                                    this.$router.push("/home/info")
                                } else {
                                    this.$router.push("/login/wx")
                                }
                            } else {
                                this.$message.error(res.data.msg)
                                if (res.data.msg == "网络错误，请重新登录" || res.data.msg == "注册绑定成功，将跳转到登录页面") {
                                    this.$router.push("/login/wx")
                                }
                            }
                        })
                    }
                })
            },
            cgCode() {
                this.axios.get("/getCode", {
                    params: this.$qs.stringify({
                        phone: this.submitForm.phone
                    })
                }).then(res => {
                    if (res.status == 200) {
                        this.identifyCode = res.data.data.code
                    }
                })
            },
            formatpwd(percentage) {
                if (percentage == 33) {
                    return '弱'
                } else if (percentage == 66) {
                    return '中'
                } else if (percentage == 100) {
                    return '强'
                }
            },
            customColorMethod(percentage) {
                if (percentage <= 33) {
                    return '#f56c6c';
                } else if (percentage <= 66) {
                    return '#e6a23c';
                } else if (percentage <= 100) {
                    return '#5cb87a';
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @media screen and (min-width: 240px) {
        .register-btn {
            width: 100%;
        }

        #app .el-main {
            background-color: #fff;

            .main {
                margin-top: 20px;
                position: static;

                .content {
                    width: 100%;
                    padding: 20px;
                    background-color: #fff;
                    /*border-radius: 10px;*/
                    margin: 0 auto;

                    .code-input {
                        width: 45%;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 768px) {
        #app .el-main {
            background-color: #fff;

            .main {
                margin-top: 45px;

                .content {
                    width: 100%;
                    padding: 20px 40px;
                    background-color: #fff;
                    border-radius: 10px;
                    margin: 0 auto;

                    .code-input {
                        width: 45%;
                    }
                }
            }
        }


    }

    @media screen and (min-width: 1400px) {
        #app .el-main {
            margin-top: 20px;

            .main {
                max-width: 1400px;
                margin: 0 auto;

                .content {
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    margin: 0 auto;

                    .code-input {
                        width: 60%;
                    }
                }
            }
        }
    }
</style>
