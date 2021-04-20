<template>
    <el-container>
        <el-header height="70px">
            <IndexNav/>
        </el-header>
        <el-main>
            <div class="news-content">
                <div class="houseTitle">
                    <span>{{data.newTitle}}</span>
                </div>
                <el-row class="titleDetail hidden-xs-only">
                    <el-col class="line" :lg="3" :md="4" :sm="8" :xs="6">
                        {{data.roomNO.roomPrice}}
                        <span class="danwei">元/月</span>
                    </el-col>
                    <el-col class="line" :lg="3" :md="4" :sm="8" :xs="6" style="color: #333">
                        {{data.roomNO.roomArea}}
                        <span class="danwei">平方米</span>
                    </el-col>
                    <el-col :lg="4" :md="4" :sm="8" :xs="12" style="color: #ccc;font-size: 14px;line-height: 40px">
                        房屋编号：{{data.roomNO.roomNO}}
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :lg="16" :md="16" :sm="24">
                        <el-carousel class="houseBanner">
                            <el-carousel-item v-for="item in imgUrls" :key="item" style="height: 100%">
                                <img :src="item" class="houseBannerImg">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                    <el-col :lg="8" :md="8" :sm="24" class="houseDetail">
                        <div class="header">
                            <span class="title"><i class="el-icon-chat-line-square"></i>房屋信息</span>
                        </div>
                        <div class="content">
                            <el-row :gutter="20" style="margin-top: 10px">
                                <el-col :lg="12" :md="24">面积：
                                    <span class="item">{{data.roomNO.roomArea}}平方米</span>
                                </el-col>
                                <el-col :lg="12" :md="24">类型：
                                    <span class="item">{{data.newTypeID.newTypeName}}</span>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" style="margin-top: 10px">
                                <el-col :lg="24" :md="24">地址：
                                    <span class="item">{{data.roomNO.roomAddress}}</span>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" style="margin-top: 10px">
                                <el-col :lg="24" :md="24">租金：
                                    <span class="item" style="color: #ff3030;font-size: 18px">
                                        {{data.roomNO.roomPrice}}
                                        <span style="font-size: 14px">元/月</span>
                                    </span>
                                </el-col>
                            </el-row>

                            <el-row :gutter="20" style="margin-top: 10px">
                                <el-col :lg="24" :md="24">描述：
                                    <span class="item">{{data.newDescription}}</span>
                                </el-col>
                            </el-row>
                            <div style="margin-top: 10px">
                                <el-button type="success" plain round @click="addSeeUserApply"
                                           :loading="applyBtnLoading" :disabled="btnText == '已申请'">{{applyBtnLoading?'申请中..':btnText}}
                                </el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="houseInformation">
                    <div class="header">
                        <span class="title"><i class="el-icon-chat-line-square"></i>房屋新闻</span>
                    </div>
                    <div class="content" v-html="data.newHTML">
                    </div>
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

    export default {

        name: "Details",
        components: {
            IndexFooter,
            IndexNav
        },
        watch: {
            userID: {
                handler(val) {
                    if (val == undefined || val == null) return
                    this.userID = val
                    this.isApply()
                },
                immediate: true
            }
        },
        mounted() {
            this.axios.get(`/News/getNews?roomNewID=${this.$route.params.id}`).then(res => {
                if (res.data.code == 200) {
                    this.data = res.data.data
                    this.getImages(this.data)
                    this.axios.post(`/News/updateNewsCount`, {
                        roomNewID: this.data.roomNewID
                    }).then(res => {
                        if (res.data.code == 200) {
                            this.isApply()
                        } else {
                            this.$message.error("获取数据失败，请刷新重试")
                        }
                    })
                } else {
                    this.$message.error("获取数据失败，请刷新重试")
                }
            })
            this.axios.get("/login/getUser").then(result => {
                if (result.data.data) {
                    this.userID = result.data.data.userID;
                }
            }).catch(err => {
                this.applyBtnLoading = false
            })
        },
        data() {
            return {
                applyBtnLoading: false,
                data: {},
                imgUrls: [],
                btnText: "申请看房",
                userID: null
            }
        },
        methods: {
            getImages(data) {
                let html = data.newHTML
                let exg = /http(.*?)"/g

                html.match(exg).forEach(item => {
                    this.imgUrls.push(item.substring(0, item.length - 1))
                })
            },
            addSeeUserApply() {
                this.applyBtnLoading = true
                if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == null) {
                    this.$message.error("请登陆后操作")
                    this.$router.push("/login/common")
                    this.applyBtnLoading = false
                } else {
                    this.axios.get("/login/checked").then(res => {
                        if (res.data.msg == '未登录') {
                            this.$message.error("请登陆后操作")
                            this.$router.push("/login/common")
                            this.applyBtnLoading = false
                        } else {
                            this.axios.get("/login/getUser").then(result => {
                                this.userID = result.data.data.userID;
                                this.axios.post("/Tenant/roomapply", {
                                    userID: this.userID,
                                    roomNO: this.data.roomNO.roomNO
                                }).then(res => {
                                    this.$message.success(res.data.msg)
                                    this.applyBtnLoading = false
                                    this.isApply()
                                }).catch(err => {
                                    this.applyBtnLoading = false
                                })
                            }).catch(err => {
                                this.applyBtnLoading = false
                            })
                        }
                    }).catch(err => {
                        this.applyBtnLoading = false
                    })
                }
            },
            isApply() {
                this.axios.get(`/Tenant/getApplyByIdNo?userID=${this.userID}&roomNO=${this.data.roomNO.roomNO}`).then(res => {
                    if (res.data.msg == "已申请") {
                        this.btnText = res.data.msg
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @bgc: #00d2ff;
    @activeColor: #0125ff;

    .container-main(@width) {
        min-width: @width;
        margin: 0 auto;
    }

    #app {
        .el-header {
            background-color: @bgc;
        }

        .el-main {
            overflow: visible;
            height: auto;
            padding-top: 20px;
            background-color: #fafafa;
        }

        .news-content {
            text-align: left;
            overflow: hidden;
        }
    }

    @media screen and (min-width: 240px) {
        #app .news-content {
            min-width: 240px;
            padding: 0px 10px;

            .houseTitle {
                text-align: left;
                font-size: 18px;
                color: #333;
                padding-bottom: 20px;
            }

            .line {
                border-right: 1px solid #ccc;
            }

            .titleDetail {
                text-align: center;
                font-size: 12px;
                color: #ff3030;

                .danwei {
                    font-size: 14px;
                }
            }

            .houseBanner {
                height: 250px;
                margin-bottom: 10px;

                .houseBannerImg {
                    height: 250px;
                    display: block;
                    width: 100%;
                }
            }

            .houseDetail {
                .content {
                    font-size: 16px;
                    color: #b3b3b3;

                    .item {
                        color: #767676;
                    }
                }
            }

            .header {
                i {
                    margin-right: 10px;
                    font-size: 16px;
                    color: @bgc;
                }

                font-size: 18px;
                padding-bottom: 10px;
                color: #767676;
                border-bottom: 1px solid #ccc;
            }

            .houseInformation {
                margin-top: 20px;
            }
        }
    }

    @media screen and (min-width: 768px) {
        #app .news-content {
            min-width: 678px;
            margin: 0 auto;
            padding: 10px 0;

            .houseTitle {
                text-align: left;
                font-size: 26px;
                color: #333;
                padding-bottom: 20px;
            }

            .line {
                border-right: 1px solid #ccc;
            }

            .titleDetail {
                text-align: center;
                font-size: 24px;
                color: #ff3030;

                .danwei {
                    font-size: 16px;
                }
            }

            .houseBanner {
                height: 400px;
                margin-bottom: 10px;

                .houseBannerImg {
                    height: 400px;
                    display: block;
                    width: 100%;
                }
            }

            .houseDetail {
                .content {
                    font-size: 16px;
                    color: #b3b3b3;

                    .item {
                        color: #767676;
                    }
                }
            }

            .header {
                i {
                    margin-right: 10px;
                    font-size: 24px;
                    color: @bgc;
                }

                font-size: 24px;
                padding-bottom: 10px;
                color: #767676;
                border-bottom: 1px solid #ccc;
            }

            .houseInformation {
                margin-top: 20px;
            }
        }
    }

    @media screen and (min-width: 1330px) {
        #app .news-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px 0;

            .houseTitle {
                text-align: left;
                font-size: 26px;
                color: #333;
                padding-bottom: 20px;
            }

            .line {
                border-right: 1px solid #ccc;
            }

            .titleDetail {
                text-align: center;
                font-size: 24px;
                color: #ff3030;

                .danwei {
                    font-size: 16px;
                }
            }

            .houseBanner {
                height: 500px;

                .houseBannerImg {
                    height: 500px;
                    display: block;
                    width: 100%;
                }
            }

            .houseDetail {
                .content {
                    font-size: 16px;
                    color: #b3b3b3;

                    .item {
                        color: #767676;
                    }
                }
            }

            .header {
                i {
                    margin-right: 10px;
                    font-size: 24px;
                    color: @bgc;
                }

                font-size: 24px;
                padding-bottom: 10px;
                color: #767676;
                border-bottom: 1px solid #ccc;
            }

            .houseInformation {
                margin-top: 20px;
            }
        }

    }
</style>
