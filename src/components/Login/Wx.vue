<template>
    <div class="right" style="position: relative">
        <el-form
                label-position="center"
                class="demo-ruleForm">
            <div id="weixin"></div>
            <el-form-item label-width="0">
                <el-button @click="$router.back()" class="login-btn" size="medium" round type="warning" plain>返回
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import "../../../public/static/js/wxlogin"

    export default {
        name: "Wx",
        mounted() {
            new WxLogin({
                id: "weixin",
                appid: 'wx7287a60bb700fd21',
                scope: "snsapi_login",
                redirect_uri: "http://www.txjava.cn/api/wxLogin"
            })

        },
        data() {
            return {}

        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    @bgc: #00d2ff;
    @media screen and (min-width: 240px) {
        #weixin {
            height: 335px;
            overflow: hidden;
            margin-bottom: 10px;
        }

        .main {
            .bottom {
                padding: 80px 15px;

                .left {
                    margin-left: 125px;
                }

                .right {

                    .login-btn {
                        width: 100%;
                        display: block;
                    }

                    .login-btn-phone {
                        color: #fff;
                        font-size: 18px;
                        padding: 12px 30px;
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
        #weixin {
            height: 335px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        .main {
            .bottom {
                .left {
                    margin-left: 125px;
                }
            }
        }

    }

    @media screen and (min-width: 1400px) {
        #weixin {
            height: 335px;
            overflow: hidden;
            margin-bottom: 10px;
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

                    .login-btn {
                        width: 100%;
                        display: block;
                    }

                    .login-btn-phone {
                        color: #fff;
                        font-size: 18px;
                        padding: 12px 30px;
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
</style>
