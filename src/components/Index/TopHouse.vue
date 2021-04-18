<template>
    <div class="hotList" v-loading="isLoading">
        <div class="title-box">
            <el-row>
                <el-col :sm="18" :xs="18" class="left-box">
                    <i class="el-icon-office-building"></i>
                    <span class="title">热门房</span>
                    <span style="margin-left: 10px; padding: 7px; font-size:14px; border-radius: 20px;background-color:red;color: #fff">new</span>
                </el-col>
                <el-col :sm="6" :xs="6" class="right-box">
                    <el-button size="small" round>更多<i class="el-icon-d-arrow-right
"></i></el-button>
                </el-col>
            </el-row>
        </div>
        <div class="houseContent">
            <el-row>
                <el-col :lg="24" :md="12" :sm="24" v-for="item in itemData">
                    <div class="topHouseItem"  @click="goDetails(item)">
                        <div class="header">
                            <el-image :src="item.imgUrl" fit="contain"
                                      :style="{'height':'100%','width':'100%'}">
                                <div slot="error" class="image-slot">
                                    <el-tooltip content="暂无图片" placement="top" effect="light">
                                        <i class="el-icon-picture-outline"
                                           style="font-size:3rem;cursor: pointer"></i>
                                    </el-tooltip>
                                </div>
                            </el-image>
                            <div class="priceBox">
                                <span class="price-fix">￥</span>
                                <span class="priceText">{{item.newsData.roomNO.roomPrice}}</span>
                            </div>
                        </div>
                        <div class="footer">
                            <span>{{item.newsData.newTitle}}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "TopHouse",
    mounted() {
        this.isLoading = true
        this.axios.get("/News/getNewHouses?newTypeID=" + 2).then((res) => {
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
            console.log(data)
            this.$router.push("/details/"+data.newsData.roomNewID)
        }
    }
}
</script>

<style lang="less" scoped>
@bgc: #00d2ff;
@activeColor: #0125ff;
@media screen and (min-width: 240px) {
    #app {
        .el-main {
            padding: 0;
        }

        .hotList {
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

            .houseContent {
                .topHouseItem {
                    background-color: #fff;
                    padding: 20px;
                    height: 250px;
                    margin-bottom: 10px;

                    .header {
                        position: relative;
                        height: 200px;

                        .priceBox {
                            position: absolute;
                            bottom: 10px;
                            padding: 5px 15px;
                            left: 50%;
                            transform: translateX(-50%);
                            background-color: rgba(255, 255, 255, .3);
                            border-radius: 10px;

                            span {
                                color: red;
                            }
                        }
                    }

                    .footer span {
                        font-size: 18px;
                        word-break: break-all;
                        white-space: pre-warp;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;

                    }

                    transition: all .5s;

                    &:hover {
                        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 678px) {
    #app {
        .hotList {
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

            .houseContent {
                .topHouseItem {
                    background-color: #fff;
                    padding: 20px;
                    height: 350px;
                    margin-bottom: 10px;

                    .header {
                        position: relative;
                        height: 300px;

                        .priceBox {
                            position: absolute;
                            bottom: 10px;
                            padding: 5px 15px;
                            left: 50%;
                            transform: translateX(-50%);
                            background-color: rgba(255, 255, 255, .3);
                            border-radius: 10px;

                            span {
                                color: red;
                            }
                        }
                    }

                    .footer span {
                        font-size: 18px;
                        word-break: break-all;
                        white-space: pre-warp;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;

                    }

                    transition: all .5s;

                    &:hover {
                        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 1330px) {
    #app {
        .hotList {
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

            .houseContent {
                .topHouseItem {
                    background-color: #fff;
                    padding: 20px;
                    height: 250px;
                    margin-bottom: 10px;

                    .header {
                        position: relative;
                        height: 200px;

                        .priceBox {
                            position: absolute;
                            bottom: 10px;
                            padding: 5px 15px;
                            left: 50%;
                            transform: translateX(-50%);
                            background-color: rgba(255, 255, 255, .3);
                            border-radius: 10px;

                            span {
                                color: red;
                            }
                        }
                    }

                    .footer span {
                        font-size: 18px;
                        word-break: break-all;
                        white-space: pre-warp;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;

                    }

                    transition: all .5s;

                    &:hover {
                        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
                    }
                }
            }
        }
    }
}
</style>