<template>
    <div class="new-house-box" v-loading="isLoading">
        <div class="title-box">
            <el-row>
                <el-col :sm="18" :xs="18" class="left-box">
                    <i class="el-icon-office-building"></i>
                    <span class="title">新房</span>
                </el-col>
                <el-col :sm="6" :xs="6" class="right-box">
                    <el-button size="small" round>更多<i class="el-icon-d-arrow-right
"></i></el-button>
                </el-col>
            </el-row>
        </div>
        <el-row class="content" :gutter="10">
            <el-col :lg="12" :md="12" :sm="12" :xs="24" v-for="item in itemData" :key="item.newsData.roomNewID">
                <div @click="goDetails(item)">
                    <el-card class="item" style="cursor: pointer;" shadow="hover">
                        <el-row :gutter="10">
                            <el-col :lg="10" :md="12" :sm="12" :xs="24">
                                <div class="item-left-top">
                                    <el-image :src="item.imgUrl" fit="contain"
                                              :style="{'height':'100%','width':'100%'}">
                                        <div slot="error" class="image-slot">
                                            <el-tooltip content="暂无图片" placement="top" effect="light">
                                                <i class="el-icon-picture-outline"
                                                   style="font-size:3rem;cursor: pointer"></i>
                                            </el-tooltip>
                                        </div>
                                    </el-image>
                                </div>
                                <div class="item-left-bottom">
                                    ￥<span>{{item.newsData.roomNO.roomPrice}}</span>
                                </div>
                            </el-col>
                            <el-col :lg="14" :md="12" :sm="12" :xs="24">
                                <div class="item-right">
                                    <div class="house-title">{{item.newsData.newTitle}}</div>
                                    <p>{{item.newsData.newDescription}}</p>
                                    <ul class="house-bottom">
                                        <li class="time-box"><i class="el-icon-date" style="margin-right: 5px"></i>{{item.newsData.newTime}}
                                        </li>
                                        <li class="see-box"><i class="el-icon-view" style="margin-right: 5px"></i>{{item.newsData.newSeeCount}}
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "NewHouse",
        mounted() {
            this.isLoading = true
            this.axios.get("/News/getNewHouses?newTypeID=" + 1).then((res) => {
                if (res.status == 200 && res.data.code == 200) {
                    this.itemData = res.data.data
                    this.isLoading = false
                }
            }).catch(() => {
                this.isLoading = false
            })
        },
        data() {
            return {
                itemData: [],
                isLoading: false
            }
        },
        methods: {
            goDetails(data) {
                console.log(data.newsData.roomNewID)
                this.$router.push("/details/"+data.newsData.roomNewID)
            }
        }
    }
</script>

<style lang="less">
    @bgc: #00d2ff;
    @activeColor: #0125ff;
    @media screen and (min-width: 240px) {
        #app {
            .el-main {
                padding: 0;
            }

            .new-house-box {
                .title-box {
                    border-bottom: 1px solid @bgc;
                    padding: 10px;
                    margin-top: 10px;
                    .left-box {
                        text-align: left;
                        border-left: 5px solid @bgc;
                        padding-left: 5px;

                        i {
                            font-size: 22px;
                        }

                        .title {

                            font-size: 24px;
                            margin-left: 10px;
                        }
                    }
                    .right-box {
                        text-align: right;
                    }
                }

                .content {
                    padding: 0px 10px 20px;

                    .item {
                        margin-top: 20px;
                    }

                    .el-image {
                        width: 100%;

                        .image-slot {
                            width: 100%;
                            height: 150px;
                            line-height: 150px;
                            color: #cdcbcb;
                            background-color: #f1f1f1;
                        }
                    }

                    .item-right {
                        text-align: left;

                        .house-title {
                            font-size: 16px;
                            font-weight: bold;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }

                        p {
                            font-size: 14px;
                            margin: 10px 0;
                            color: #ccc;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 4;
                            -webkit-box-orient: vertical;
                        }

                        .house-bottom {
                            font-size: 14px;
                            overflow: hidden;
                            color: #bbbbbb;

                            .time-box {
                                float: left;
                            }

                            .see-box {
                                float: right;
                            }
                        }
                    }

                    .item-left-bottom {
                        color: red;
                        font-size: 14px;
                        margin: 10px 0;
                        span {
                            font-size: 18px;
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 678px) {
        #app {
            .new-house-box {
                .title-box {
                    border-bottom: 1px solid @bgc;
                    padding: 5px 0;

                    .left-box {
                        text-align: left;
                        border-left: 5px solid @bgc;
                        padding-left: 5px;

                        i {
                            font-size: 22px;
                        }

                        .title {

                            font-size: 24px;
                            margin-left: 10px;
                        }
                    }

                    .right-box {
                        text-align: right;
                    }
                }

                .content {
                    padding: 0px 10px 20px;

                    .item {
                        margin-top: 20px;

                        .item-left-top {
                            height: 150px;
                        }
                    }

                    .el-image {
                        width: 100%;

                        .image-slot {
                            width: 100%;
                            height: 150px;
                            line-height: 150px;
                            color: #cdcbcb;
                            background-color: #f1f1f1;
                        }
                    }

                    .item-right {
                        text-align: left;

                        .house-title {
                            font-size: 18px;
                            font-weight: bold;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }

                        p {
                            font-size: 14px;
                            margin: 10px 0;
                            color: #ccc;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 4;
                            height: 80px;
                            -webkit-box-orient: vertical;
                        }

                        .house-bottom {
                            font-size: 14px;
                            overflow: hidden;
                            color: #bbbbbb;

                            .time-box {
                                float: left;
                            }

                            .see-box {
                                float: right;
                            }
                        }
                    }

                    .item-left-bottom {
                        color: red;
                        font-size: 14px;

                        span {
                            font-size: 18px;
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 1330px) {
        #app {
            .new-house-box {
                .title-box {
                    border-bottom: 1px solid @bgc;
                    padding: 5px 0;

                    .left-box {
                        text-align: left;
                        border-left: 5px solid @bgc;
                        padding-left: 5px;

                        i {
                            font-size: 22px;
                        }

                        .title {

                            font-size: 24px;
                            margin-left: 10px;
                        }
                    }

                    .right-box {
                        text-align: right;
                    }
                }

                .content {
                    padding: 0px 10px 20px;

                    .item {
                        margin-top: 20px;

                        .item-left-top {
                            height: 150px;
                        }
                    }

                    .el-image {
                        width: 100%;

                        .image-slot {
                            width: 100%;
                            height: 150px;
                            line-height: 150px;
                            color: #cdcbcb;
                            background-color: #f1f1f1;
                        }
                    }

                    .item-right {
                        text-align: left;

                        .house-title {
                            font-size: 18px;
                            font-weight: bold;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }

                        p {
                            font-size: 14px;
                            margin: 10px 0;
                            color: #ccc;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 4;
                            -webkit-box-orient: vertical;
                        }

                        .house-bottom {
                            font-size: 12px;
                            overflow: hidden;
                            color: #bbbbbb;

                            .time-box {
                                float: left;
                            }

                            .see-box {
                                float: right;
                            }
                        }
                    }

                    .item-left-bottom {
                        color: red;
                        font-size: 14px;
                        margin-top: 10px;

                        span {
                            font-size: 18px;
                        }
                    }
                }
            }
        }
    }
</style>
