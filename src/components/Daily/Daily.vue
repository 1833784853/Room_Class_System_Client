<template>
    <div class="container" v-loading="loading">
        <el-row class="top">
            <el-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <el-button-group v-if="btnSize == 'small'">
                    <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="$router.back()">返回
                    </el-button>
                    <el-button type="warning" size="small" icon="el-icon-edit" @click="showAddBox = true">添加日常
                    </el-button>
                </el-button-group>
                <el-button-group v-else>
                    <el-button type="primary" size="mini" icon="el-icon-arrow-left" @click="$router.back()"></el-button>
                    <el-button type="warning" size="mini" icon="el-icon-edit"
                               @click="showAddBox = true"></el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-calendar>
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                {{data.day.split("-")[2]}}
                <div :class="data.isSelected?'isActive':''" style="height: 60px;overflow: hidden">
                    <div v-for="item in cdata" v-if="data.day == item.dailyTime"
                         style="font-size: 14px;text-align: left;" @click="showEditBox(item)">
                        <i class="el-icon-star-on" style="color: red"></i>
                        {{item.dailyTitle}}
                    </div>
                </div>
            </template>
        </el-calendar>
        <!--        添加 日常-->
        <el-dialog :close-on-click-modal="false" title="添加日常" :visible.sync="showAddBox"
                   :destroy-on-close="true" :before-close="closeDialogHandle">
            <el-form status-icon ref="form" :rules="rules" label-position="center" :model="form" label-width="100px"
                     size="small">
                <el-form-item label="日常标题" prop="title">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="日常内容" style="text-align: left" prop="content">
                    <el-input type="textarea" v-model="form.content" autocomplete="off">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogHandle">取 消</el-button>
                <el-button type="primary" @click="addSubmitForm('form')" :loading="addBtnLoading">
                    {{addBtnLoading?"添加中":"添加"}}
                </el-button>
            </div>
        </el-dialog>
        <!--        编辑日常-->
        <el-dialog :close-on-click-modal="false" title="编辑日常" :visible.sync="showEditBoxFlag"
                   :destroy-on-close="true" :before-close="closeDialogHandle">
            <el-form status-icon ref="form" :rules="rules" label-position="center" :model="form" label-width="100px"
                     size="small">
                <el-form-item label="日常标题" prop="title">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="日常内容" style="text-align: left" prop="content">
                    <el-input type="textarea" v-model="form.content" autocomplete="off">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogHandle">取 消</el-button>
                <el-button type="primary" @click="editSubmitForm('form')" :loading="editBtnLoading">
                    {{editBtnLoading?"修改中":"修改"}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Daily",
        props: {
            btnSize: String,
            userID: String,
            userType: String
        },
        watch: {
            userID: {
                handler() {
                    this.getDaily()
                },
                immediate: true
            },

        },
        data() {
            let validateTitle = (rule, value, callback) => {
                value = value.trim()
                if (value === "") {
                    callback(new Error("请输入标题！！"))
                }
                callback();
            }
            let validateContent = (rule, value, callback) => {
                value = value.trim()
                if (value === "") {
                    callback(new Error("请输入日常内容！！"))
                }
                callback();
            }
            return {
                showAddBox: false,
                addBtnLoading: false,
                loading: false,
                showEditBoxFlag: false,
                editBtnLoading: false,
                cdata: [],
                form: {
                    title: "",
                    content: "",
                    dailyID: 0
                },
                rules: {
                    title: {validator: validateTitle, trigger: 'blur'},
                    content: {validator: validateContent, trigger: 'blur'},
                }
            }
        },
        methods: {
            closeDialogHandle() {
                this.form.title = ""
                this.form.content = ""
                this.showAddBox = false
                this.showEditBoxFlag = false
            },
            getDaily() {
                this.loading = true
                this.axios.get("/Tenant/getDailylistUserId?userID=" + this.userID).then(res => {
                    if (res.data.code == 200) {
                        this.cdata = res.data.data
                    }
                    this.loading = false
                })
            },
            showEditBox(data) {
                console.log(data)
                this.form.title = data.dailyTitle
                this.form.content = data.dailyContent
                this.form.dailyID = data.dailyID
                this.showEditBoxFlag = true
            },
            addSubmitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addBtnLoading = true;
                        this.axios.post("/Admin/addDaily", {
                            userID: this.userID,
                            dailyTitle: this.form.title,
                            dailyContent: this.form.content
                        }).then(res => {
                            if (res.data.code == 200) {
                                console.log(res.data)
                                this.$message.success(res.data.msg)
                                this.closeDialogHandle()
                                this.getDaily()
                            } else {
                                this.$message.error(res.data.msg)
                            }
                            this.addBtnLoading = false
                        }).catch(err => {
                            this.addBtnLoading = false
                        })
                    }
                });
            },
            editSubmitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editBtnLoading = true;
                        this.axios.post("/Tenant/editDaily", {
                            dailyID: this.form.dailyID,
                            userID: this.userID,
                            dailyTitle: this.form.title,
                            dailyContent: this.form.content
                        }).then(res => {
                            if (res.data.code == 200) {
                                this.$message.success(res.data.msg)
                                this.closeDialogHandle()
                                this.getDaily()
                            } else {
                                this.$message.error(res.data.msg)
                            }
                            this.editBtnLoading = false
                        }).catch(err => {
                            this.editBtnLoading = false
                        })
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .isActive {
        height: 100%;
        overflow: scroll !important;
    }

    @media screen and (min-width: 240px) {
        #app {
            .container {
                overflow: hidden;
                padding: 5px;

                .top {
                    text-align: left;
                }

                .demo-table-expand {
                    font-size: 0;
                }

                .demo-table-expand label {
                    width: 90px;
                    color: #99a9bf;
                }

                .demo-table-expand .el-form-item {
                    margin-right: 0;
                    margin-bottom: 0;
                    width: 100%;
                }
            }
        }
    }

    @media screen and (min-width: 768px) {
        #app {
            .container {
                padding: 10px;

                .top {
                    text-align: left;
                }

                .demo-table-expand {
                    font-size: 0;
                }

                .demo-table-expand label {
                    width: 90px;
                    color: #99a9bf;
                }

                .demo-table-expand .el-form-item {
                    margin-right: 0;
                    margin-bottom: 0;
                    width: 100%;
                }
            }
        }
    }

    @media screen and (min-width: 1330px) {
        #app {
            .container {
                padding: 10px;

                .top {
                    text-align: left;
                }

                .demo-table-expand {
                    font-size: 0;
                }

                .demo-table-expand label {
                    width: 90px;
                    color: #99a9bf;
                }

                .demo-table-expand .el-form-item {
                    margin-right: 0;
                    margin-bottom: 0;
                    width: 100%;
                }
            }
        }
    }
</style>