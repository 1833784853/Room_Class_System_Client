<template>
    <div class="release-news" v-loading="isloading">
        <el-row class="top">
            <el-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <el-button-group>
                    <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="$router.back()">返回
                    </el-button>
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
                                       :key="item.roomID"></el-option>
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
                        <WangEditor :getEdithorContent="getEdithorContent" :value="value"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="success" @click="submitForm('form')">保存新闻</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import WangEditor from "./WangEditor";

    export default {
        name: "NewEdit",
        mounted() {
            this.updateMenuTitle(`新闻编辑(ID:${this.$route.params.roomNewID})`)
            this.isloading = true
            this.axios.get("/News/getNewsTypes").then(res => {
                this.newsTypes = res.data.data
            }).catch(() => {
                this.$message.error("数据加载失败，请检测网络")
            })
            this.axios.get("/getRoomSourceAll").then(res => {
                this.roomSource = res.data.data
            }).catch(() => {
                this.$message.error("数据加载失败，请检测网络")
            })
            const roomNewID = this.$route.params.roomNewID;
            if (roomNewID) {
                this.axios.get("/News/getNews?roomNewID=" + roomNewID).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        let data = res.data.data
                        this.form.title = data.newTitle
                        this.form.roomNO = data.roomNO.roomNO
                        this.form.description = data.newDescription
                        var dateTimeArr = data.newTime.split(" ");
                        let dateTime = new Date(data.newTime)
                        if (dateTimeArr.length < 2) {
                            if (/[-]+/g.test(dateTimeArr[0])) {
                                this.form.date = dateTime
                            } else {
                                this.form.time = dateTime
                            }
                        } else {
                            this.form.date = dateTime
                            this.form.time = dateTime
                        }
                        this.form.newsType = data.newTypeID.id
                        this.value = data.newHTML
                        this.isloading = false
                    } else {
                        this.$message.error(res.data.msg)
                        this.isloading = false
                    }
                })
            } else {
                this.$message.error("编辑失败，缺少必要参数")
                this.$router.back()
            }

        },
        components: {
            WangEditor
        },
        props: {
            updateMenuTitle: Function,
            username: String,
            formLabelPosition: String,
            userID: String
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
                value:'',
                removeImgArr: [],
                newsTypes: [],
                roomSource: [],
                addBtnIsLoading: false,
                isloading:false
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var content = this.edithorContent.trim();
                        if (content == '') {
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
                        this.axios.post("/News/updateNews", {
                            roomNewID:this.$route.params.roomNewID,
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
                                if (res.data.msg == "修改成功") {
                                    this.$message.success(res.data.msg)
                                    this.$router.push("/home/news-handle")
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            }
                        })
                    } else {
                        return false
                    }
                });
            },
            getEdithorContent(html, removeImgArr) {
                this.edithorContent = html
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
