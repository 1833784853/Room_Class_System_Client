<template>
    <el-container>
        <el-header height="70px">
            <IndexNav/>
        </el-header>
        <el-main>
            <div class="main">
                <div class="top">
                    <h2>房屋租赁系统用户注册</h2>
                </div>
                <div class="bottom">
                    <el-row>
                        <el-col :lg="24">
                            <div class="content">
                                <el-form status-icon :model="commonForm" :rules="rules" ref="commonForm"
                                         label-width="70px"
                                         label-position="center"
                                         class="demo-ruleForm">
                                    <el-form-item label="手机号" prop="phone">
                                        <el-input type="text" autocomplete="off" v-model="commonForm.phone"
                                                  placeholder="请输入手机号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="用户名" prop="username">
                                        <el-input type="text" autocomplete="off" v-model="commonForm.username"
                                                  placeholder="请输入用户名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" prop="password">
                                        <el-input type="password"
                                                  autocomplete="off" v-model="commonForm.password"
                                                  placeholder="请输入密码"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-progress :percentage="percentage" :color="customColorMethod"
                                                     :format="formatpwd"></el-progress>
                                    </el-form-item>
                                    <el-form-item label="确认密码" prop="repassword">
                                        <el-input type="password"
                                                  autocomplete="off" v-model="commonForm.repassword"
                                                  placeholder="请输入确认密码"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="code" style="">
                                        <el-input
                                                autocomplete="off" v-model="commonForm.code" placeholder="请输入验证码"
                                                class="code-input" style="float: left"></el-input>
                                        <VerificationCode :cgCode='cgCode' :identifyCode="identifyCode"
                                                          style="float: right;"/>
                                    </el-form-item>
                                    <el-form-item label-width="0" style="margin-top: 40px">
                                        <el-button type="primary" class="register-btn" @click="submitForm('commonForm')"
                                                   :loading="isloading">
                                            注册
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-main>
        <el-footer>
            <IndexFooter/>
        </el-footer>
    </el-container>
</template>

<script>
    import IndexNav from "../components/Index/IndexNav";
    import IndexFooter from "../components/Index/IndexFooter";
    import VerificationCode from "../components/Login/VerificationCode";
    import {Message} from 'element-ui';

    export default {
        name: "Register",
        mounted() {
            // 是否有登录过 ， 登陆过直接去后台页面
            this.cgCode()
        },
        data() {
            let validateUsername = (rule, value, callback) => {
                value = value.trim()
                let regExp = /^[\u4e00-\u9fa5\w]{3,16}$/g // 校验只能是中文和字母、数字、_组成
                if (value === '') {
                    callback(new Error("请输入用户名"))
                } else if (!regExp.test(value)) {
                    callback(new Error("用户名只能是中文、字母、数字、下划线组成的3-16个字符！！"))
                } else {
                    this.axios({
                        method: 'get',
                        url: '/checkUserIslive?username=' + value, // 请求接口，获取该用户名是否被注册

                    }).then(res => {
                        if (res.status == 200) {
                            if (res.data.msg == '未注册') {
                                callback()
                            } else if (res.data.msg == "已注册") {
                                callback(new Error("该用户名已被注册，请更换"))
                            } else {
                                callback(new Error(res.data.msg))
                            }
                        }
                    })
                }
            }

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
                    username: '',
                    password: "",
                    phone: '',
                    repassword: '',
                    code: ''
                },
                percentage: 0,
                isloading: false,
                identifyCode: "",
                rules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'}
                    ],
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
            IndexNav,
            IndexFooter,
            VerificationCode
        },
        methods: {
            submitForm(commonForm) {
                this.$refs[commonForm].validate((vaild) => {
                    if (vaild) {
                        let {username, password, phone, code, repassword} = this.commonForm
                        this.axios.post('/register', this.$qs.stringify({
                            username,
                            password,
                            phone,
                            repassword,
                            code
                        })).then(res => {
                            if (res.status == 200) {
                                if (res.data.msg == "注册成功") {
                                    this.$router.push('/login/common')
                                    Message.success(res.data.msg)
                                } else {
                                    Message.error(res.data.msg)
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
                    console.log(percentage)
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
    @bgc: #00d2ff;
    @color: #00d2ff;
    @activeColor: #0125ff;
    .el-header {
        background-color: @bgc;
    }

    .el-main {
        overflow: visible;
        height: auto;
    }

    @media screen and (min-width: 240px) {
        .register-btn {
            width: 100%;
        }

        #app .el-main {
            background-color: #fff;

            .main {
                margin-top: 20px;
                position: static;

                .top {
                    height: 65px;

                    h2 {
                        height: 100%;
                        line-height: 65px;
                        color: @color;
                    }
                }

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

                .top {
                    height: 85px;
                    background-image: url("../assets/top.png");
                    background-position: center top;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    margin-bottom: -3px;

                    h2 {
                        height: 100%;
                        line-height: 85px;
                        color: @color;
                    }
                }

                .bottom {
                    background: url("../assets/main.png") center 100% no-repeat;
                    background-size: 100% 100%;
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

                .bottom {
                    margin: 0 50px 100px;
                    padding: 20px 0 100px;
                    background-image: url("../assets/main.png");
                    background-position: center top;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;

                    .content {
                        width: 40%;
                        padding: 20px 40px;
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
    }
</style>
