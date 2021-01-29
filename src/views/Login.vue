<template>
    <el-container>
        <el-header height="70px">
            <IndexNav/>
        </el-header>
        <el-main>
            <div class="main">
                <div class="top">
                    <h2>欢迎登录房屋租赁系统</h2>
                </div>
                <div class="bottom">
                    <el-row>
                        <el-col :lg="12" :md="12" class="hidden-sm-and-down">
                            <div class="left" v-loading.fullscreen.lock="fullscreenLoading">
                                <el-carousel>
                                    <el-carousel-item v-for="item in imgData" :key="item.id">
                                        <el-image :src="item.bannerImgUrl"></el-image>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="24" :xs="24" style="position: relative;"
                                class="right-content-box">
                            <transition name="el-zoom-in-center">
                                <router-view style="position: absolute;"/>
                            </transition>
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

    export default {
        name: "Login",
        mounted() {
            this.fullscreenLoading = true
            this.axios.get("/banner-handle/getBannerAll").then(res => {
                if (res.status == 200 && res.data.code == 200) {
                    this.imgData = res.data.data
                }
                this.fullscreenLoading = false
            }).catch(() => {
                this.fullscreenLoading = false
            })
        },
        data() {
            return {
                fullscreenLoading: false,
                imgData: []
            }
        },
        components: {
            IndexNav,
            IndexFooter
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

    #app .el-main {
        overflow: visible;
        height: auto;
        padding: 0 0 20px;
    }

    @media screen and (min-width: 240px) {
        #app .el-main {
            background-color: #eee;

            .right-content-box {
                height: 600px;
            }

            .main {
                margin: 0 auto;

                .top {
                    height: 85px;
                    background-color: #fff;
                    margin: 10px;
                    border-radius: 5px;

                    h2 {
                        height: 100%;
                        line-height: 85px;
                        color: @color;
                    }
                }

                .bottom {
                    height: 402px;
                    margin: 10px;
                    background-color: #fff;
                    border-radius: 7px;
                    .right {
                        padding: 20px;
                        width: 100%;
                        background-color: #fff;
                        border-radius: 15px;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 768px) {
        #app .el-main {
            background-color: #fff;

            .main {
                margin: 0 auto;

                .top {
                    margin: 10px 0 0;
                    height: 85px;
                    background-image: url("../assets/top.png");
                    background-position: center;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;

                    h2 {
                        height: 100%;
                        line-height: 85px;
                        color: @color;
                        margin-bottom: 0;
                    }
                }

                .bottom {
                    margin-top: -2px;
                    padding: 30px 40px;
                    height: 702px;
                    background-image: url("../assets/main.png");
                    background-position: center;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;

                    .left {
                        margin-left: 20px;
                    }

                    .right {
                        padding: 20px 20px;
                        margin-left: 70px;
                        margin-right: 150px;
                        background-color: #fff;
                        border-radius: 15px;
                        width: 90%;
                    }
                }
            }
        }


    }

    @media screen and (min-width: 1400px) {
        #app .el-main .main {
            max-width: 1400px;

            .top {
                height: 85px;
                background: url("../assets/top.png") center 100% no-repeat;

            }

            .bottom {
                padding: 50px 40px;
                margin-top: -2px;
                height: 702px;
                background: url("../assets/main.png") center 100% no-repeat;

                .left {
                    margin-left: 125px;
                }

                .right {
                    padding: 30px 40px;
                    margin-left: 50px;
                    margin-right: 150px;
                    background-color: #fff;
                    border-radius: 15px;
                    width: 75%;
                }
            }
        }
    }
</style>
