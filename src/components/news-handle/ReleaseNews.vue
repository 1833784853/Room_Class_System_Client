<template>
    <div class="release-news">
        <el-row class="top">
            <el-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <el-button-group v-if="btnSize == 'small'">
                    <el-button type="primary"  size="small" icon="el-icon-arrow-left" @click="$router.back()">返回</el-button>
                    <el-button type="warning"  size="small" icon="el-icon-edit" @click="showAddTypeBox = true">添加新闻类型</el-button>
                </el-button-group>
                <el-button-group v-else>
                    <el-button type="primary"  size="mini" icon="el-icon-arrow-left" @click="$router.back()"></el-button>
                    <el-button type="warning"  size="mini" icon="el-icon-edit" @click="showAddTypeBox = true"></el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px"
                 :label-position="formLabelPosition">
            <el-row class="main">
                <el-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                    <el-form-item label="标题" prop="title">
                        <el-input type="text" v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新闻描述" prop="description">
                        <el-input type="textarea" v-model="form.description" autocomplete="off" rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="发布人" prop="username">
                        <el-input type="text" v-model="username" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="房源编号：" prop="roomNO">
                        <el-select v-model="form.roomNO" placeholder="请选择发布新闻的房源编号" style="width: 100%;">
                            <el-option :label="item.roomNO" :value="item.roomNO" v-for="item in roomSource"
                                       :key="item.roomID">
                              <span style="float: left">{{ item.roomNO }}</span>
                              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.roomStatus }}</span>

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="新闻类型" prop="newsType">
                        <el-select v-model="form.newsType" placeholder="请选择发布新闻类型" style="width: 100%;">
                            <el-option :label="item.newTypeName" :value="item.id" v-for="item in newsTypes"
                                       :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发布时间">
                        <el-col :span="11">
                            <el-form-item prop="date">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align: center">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="time">
                                <el-time-picker placeholder="选择时间" v-model="form.time"
                                                style="width: 100%;"></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col>
                    <el-form-item label="新闻详情内容">
                        <WangEditor :getEdithorContent="getEdithorContent"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="success" @click="submitForm('form')">发布新闻</el-button>
            </el-form-item>
        </el-form>
        <el-dialog :close-on-click-modal="false" title="添加新闻类型" :visible.sync="showAddTypeBox"
                   :destroy-on-close="true">
            <el-form status-icon ref="typeForm" :rules="rules" :label-position="formLabelPosition" :model="typeForm"
                     label-width="150px"
                     size="small">
                <el-form-item label="新闻类型名称" prop="type">
                    <el-input v-model="typeForm.type" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddTypeBox = false">取 消</el-button>
                <el-button type="primary" @click="addNewsType('typeForm')" :loading="addBtnIsLoading">
                    {{addBtnIsLoading?"添加中":"添加"}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import WangEditor from "./WangEditor";

    export default {
        name: "ReleaseNews",
        mounted() {
            this.updateMenuTitle("发布新闻")
            this.axios.get("/News/getNewsTypes").then(res => {
                this.newsTypes = res.data.data
            }).catch(() => {
                this.$message.error("数据加载失败，请检测网络")
            })
            // 获取所有的房源信息
            this.axios.get("/getRoomSourceAll").then(res => {
                this.roomSource = res.data.data
            }).catch(() => {
                this.$message.error("数据加载失败，请检测网络")
            })

        },
        components: {
            WangEditor
        },
        props: {
            updateMenuTitle: Function,
            username: String,
            formLabelPosition: String,
            userID: String,
            btnSize: String
        },
        data() {
            let validateTitle = (rule, value, callback) => {
                value = value.trim()
                if (value == '') {
                    callback(new Error("请输入新闻标题"))
                } else {
                    callback()
                }
            }
            let validateDescription = (rule, value, callback) => {
                value = value.trim()
                if (value == '') {
                    callback(new Error("请输入新闻描述"))
                } else if (!(value.length >= 10 && value.length <= 100)) {
                    callback(new Error("请输入长度为10-100的新闻描述"))
                } else {
                    callback()
                }
            }
            let validateNewsType = (rule, value, callback) => {
                value = value.trim()
                if (value == '') {
                    callback(new Error("请输入新闻类型"))
                } else if (value.length < 2) {
                    callback(new Error("请输入2个字符以上"))
                } else {
                    this.axios.get("/News/checkTypeName?typeName=" + value).then(res => {
                        if (res.status == 200 && res.data.code == 200) {
                            callback()
                        } else {
                            callback(new Error(res.data.msg))
                        }
                    }).catch(() => {
                        callback(new Error("网络出现异常，请检测网络"))
                    })
                }
            }
            return {
                form: {
                    title: '',
                    username: this.username,
                    roomNO: '',
                    date: '',
                    time: '',
                    newsType: '',
                    description: ''
                },
                typeForm: {
                    type: ''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入新闻标题', trigger: 'blur'},
                        {validator: validateTitle, trigger: 'blur'}
                    ],
                    roomNO: [
                        {required: true, message: '请选择房源', trigger: 'blur'}
                    ],
                    newsType: [
                        {required: true, message: '请选择新闻类型', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入新闻描述', trigger: 'blur'},
                        {validator: validateDescription, trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请输入新闻类型', trigger: 'blur'},
                        {validator: validateNewsType, trigger: 'blur'}
                    ],
                },
                edithorContent: '',
                removeImgArr: [],
                newsTypes: [],
                roomSource: [],
                showAddTypeBox: false,
                addBtnIsLoading: false

            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var content = this.edithorContent.trim();
                        if (content == '') {
                            this.$message.error("请输入新闻内容")
                            return false
                        } else if (content.length<50) {
                            this.$message.error("请输入50个字符以上的新闻内容")
                            return false
                        }
                        let {title, roomNO, date, time, newsType, description} = this.form
                        if (date != "") {
                            let dateFormat = new Date(date);
                            date = `${dateFormat.getFullYear()}-${dateFormat.getMonth()+1}-${dateFormat.getDate()}`
                        }
                        if (time != "") {
                            let dateFormat = new Date(time);
                            time = `${parseInt(dateFormat.getHours())<10?'0'+dateFormat.getHours():dateFormat.getHours()}:${dateFormat.getMinutes()<10?'0'+dateFormat.getMinutes():dateFormat.getMinutes()}:${dateFormat.getSeconds()<10?'0'+dateFormat.getSeconds():dateFormat.getSeconds()}`
                        }
                        this.axios.post("/News/addNews", {
                            title,
                            userID: this.userID,
                            roomNO,
                            date,
                            time,
                            newsType,
                            content,
                            description
                        }).then(res => {
                            if (res.status == 200 && res.data.code == 200) {
                                if (res.data.msg == "添加成功") {
                                    this.$message.success(res.data.msg)
                                    this.$router.push("/home/news-handle")
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                        // this.axios.post("/News/delete",{
                        //     fileUrls:this.removeImgArr
                        // })
                    } else {
                        return false
                    }
                });
            },
            addNewsType(typeForm) {
                this.$refs[typeForm].validate((valid) => {
                    if (valid) {
                        this.addBtnIsLoading = true;
                        let {type} = this.typeForm
                        this.axios.post("/News/addNewsType", {
                            typeName: type
                        }).then(res => {
                            if (res.status == 200 && res.data.code == 200) {
                                this.$message.success(res.data.msg)
                                this.typeForm.type = ""
                                this.axios.get("/News/getNewsTypes").then(res => {
                                    this.newsTypes = res.data.data
                                }).catch(() => {
                                    this.$message.error("数据加载失败，请检测网络")
                                })
                                this.showAddTypeBox = false;
                            } else {
                                this.$message.error(res.data.msg)
                            }
                            this.addBtnIsLoading = false;
                        })
                    } else {
                        return false;
                    }
                })
            },
            getEdithorContent(html, removeImgArr) {
                this.edithorContent = html;
                this.removeImgArr = removeImgArr
            }
        }
    }
</script>

<style lang="less" scoped>

    @media screen and (min-width: 240px) {
        #app {
            .release-news {
                padding: 10px;
                text-align: left;
                border-radius: 0;
                background-color: #fff;

                .top {
                    text-align: left;
                    margin-bottom: 10px;
                }
            }
        }
    }

    @media screen and (min-width: 768px) {
        #app {
            .release-news {
                padding: 10px;
                border-radius: 10px;

                .top {
                    text-align: left;
                    margin-bottom: 10px;
                }
            }
        }
    }

    @media screen and (min-width: 1330px) {
        #app {
            .release-news {
                padding: 10px;

                .top {
                    text-align: left;
                    margin-bottom: 10px;
                }
            }
        }
    }

</style>
