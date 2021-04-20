<template>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px"
             :label-position="formLabelPosition">
        <el-row>
            <el-col>
                <p></p>
            </el-col>
        </el-row>
        <el-row class="main">
            <el-form-item>
                <el-tag type="danger">请认真填写此信息，此信息将用于房屋的租赁等信息上</el-tag>
            </el-form-item>
            <el-col :sm="24" :xs="24">
                <el-form-item label="姓名" prop="username">
                    <el-input type="text" v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="useremail">
                    <el-input type="text" v-model="form.useremail" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="card">
                    <el-input type="text" v-model="form.card" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col :offset="4" :span="30">
                            <el-button type="success" @click="submitForm('form')">提交</el-button>
                        </el-col>
                        <el-col :offset="4" :span="30">
                            <el-button @click="$router.back()">返回</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "UserInfo",
        props: {
            formLabelPosition: String,
            updateMenuTitle: Function,
            userID: String
        },
        mounted() {
            this.updateMenuTitle("实名认证")
        },
        data() {
            let validateName = (rule, value, callback) => {
                value = value.trim()
                if (value == '') {
                    callback(new Error("请输入姓名!"))
                } else {
                    callback()
                }
            }
            let validateEmail = (rule, value, callback) => {
                value = value.trim()
                if (value == '') {
                    callback(new Error("请输入邮箱!"))
                } else if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
                    callback(new Error("请输入正确的邮箱格式!"))
                } else {
                    callback()
                }
            }
            let validateCard = (rule, value, callback) => {
                value = value.trim()
                if (value == '') {
                    callback(new Error("请输入身份证号!"))
                } else {
                    callback()
                }
            }
            return {
                form: {
                    username: "",
                    useremail: "",
                    card: ""
                },
                rules: {
                    username: [
                        {validator: validateName, trigger: 'blur'}
                    ],
                    useremail: [
                        {validator: validateEmail, trigger: 'blur'}
                    ],
                    card: [
                        {validator: validateCard, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(commonForm) {
                this.$refs[commonForm].validate((vaild) => {
                    if (vaild) {
                        let {username, useremail, card} = this.form
                        this.axios.post("/registerUserInfo", {
                            userID: this.userID,
                            username,
                            useremail,
                            card
                        }).then(res => {
                            if (res.data.code == 200) {
                                localStorage.setItem("token", res.data.token)
                                this.$router.go(0)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>

    @media screen and (min-width: 240px) {

    }

    @media screen and (min-width: 768px) {

    }

    @media screen and (min-width: 1400px) {
        #app .main {
            width: 30%;
            margin: 20px auto;
        }
    }
</style>