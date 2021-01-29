<template v-loading.fullscreen.lock="fullscreenLoading">
    <div class="container-main" @mouseover="enterBannerBox" @mouseleave="autoMove()">
        <div class="banner-box-list">
            <ul class="banners"
                :style="{width:bannersWidth+'%',transform:'translateX(-'+imgIndex*(100/imgData.length)+'%)',transition:isTransition}">
                <li :style="{width:(100/imgData.length+'%')}" v-for="(item,i) in imgData" :key="i">
                    <a href="javascript:;">
                        <img :src="item.bannerImgUrl"/>
                    </a>
                    <div class="banner-container">
                        <div class="container">
                            <div class="title">{{item.bannerTitle}}</div>
                            <p>{{item.bannerContent}}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="arr-box hidden-sm-only hidden-xs-only">
                <li :class="index == i?'arr-active':''" @mouseover="move(i)"
                    v-for="(item,i) in arrImgData"
                    :key="i" :i="i" v-if="i<arrImgData.length-1">
                    <img :src="item.bannerImgUrl"
                         style="width: 100%;height: 100%;display: block" alt="">
                </li>
            </ul>
            <div class="left el-icon-arrow-left" @click="toLeft"></div>
            <div class="right el-icon-arrow-right" @click="toRight"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BannerComponent",
        mounted() {
            this.fullscreenLoading = true
            this.axios.get("/banner-handle/getBannerAll").then(res => {
                if (res.status == 200 && res.data.code == 200) {
                    this.imgData = res.data.data
                    this.arrImgData = res.data.data
                    this.imgData.push(res.data.data[0])
                    this.bannersWidth = this.imgData.length * 100
                    this.autoMove()
                }
                this.fullscreenLoading = false
            }).catch(() => {
                this.fullscreenLoading = false
            })
        },
        data() {
            return {
                bannersWidth: 0,
                imgData: [],
                arrImgData: [],
                fullscreenLoading: false,
                index: 0,
                imgIndex: 0,
                isTransition: 'all .4s',
                TimeID: '',
                flag: true
            }
        },
        methods: {
            move(i) {
                this.isTransition = "all .4s"
                this.imgIndex = i;
                this.index = i;
            },
            autoMove() {
                clearInterval(this.TimeID)
                this.TimeID = setInterval(() => {
                    this.toRight()
                }, 2000)
            },
            enterBannerBox() {
                clearInterval(this.TimeID)
            },
            toLeft() {
                if (this.flag) {
                    this.flag = false;
                    if (this.imgIndex <= 0) {
                        this.index = this.imgData.length - 2;
                        this.isTransition = "none";
                        this.imgIndex = this.imgData.length - 1;
                        setTimeout(() => {
                            this.imgIndex--;
                            this.isTransition = "all .4s";
                            this.move(this.imgIndex)
                        }, 10)
                    } else {
                        this.imgIndex--;
                        this.isTransition = "all .4s";
                        this.move(this.imgIndex)
                    }
                    setTimeout(() => {
                        this.flag = true;
                    }, 400)
                }
            },
            toRight() {
                if (this.flag) {
                    this.imgIndex++;
                    this.flag = false;
                    if (this.imgIndex >= this.imgData.length - 1) {
                        this.index = 0;
                        setTimeout(() => {
                            this.isTransition = "none";
                            this.imgIndex = 0;
                        }, 400)
                    } else {
                        this.isTransition = "all .4s";
                        this.move(this.imgIndex)
                    }
                    setTimeout(() => {
                        this.flag = true;
                    }, 400)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @bgc: #00d2ff;
    #app {

        .arr-box {
            li.arr-active {
                border: 1px solid @bgc !important;
                opacity: 1 !important;
            }
        }

        .banner-box-list {
            width: 100%;
            overflow: hidden;
            position: relative;

            .left, .right {
                position: absolute;
                cursor: pointer;
            }

            .banners {
                overflow: hidden;

                li {
                    overflow: hidden;
                    list-style-type: none;
                    float: left;
                    position: relative;

                    a {
                        width: 100%;
                        height: 100%;
                        display: block;

                        img {
                            width: 100%;
                            height: 660px;
                            display: block;
                        }
                    }

                    .banner-container {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        padding: 10px;

                        .container {
                            text-align: left;
                            height: 100%;
                            border-radius: 6px;
                            color: #fff;
                            background-color: rgba(0, 0, 0, .4);
                        }
                    }
                }
            }
        }

        .el-main {
            overflow: visible;
            height: auto;
            background-color: transparent;
            padding: 0;
        }
    }

    @media screen and (min-width: 240px) {
        #app {

            .container-main {
                min-width: 240px;
                margin: 0 auto;

                .banner-box-list {
                    .left, .right {
                        background-color: rgba(0, 0, 0, .4);
                        padding: 5px;
                        border-radius: 50%;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 36px;
                        color: #fff;
                    }

                    .left {
                        left: 2%;
                    }

                    .right {
                        right: 2%;
                    }
                    .arr-box {
                        position: absolute;
                        right: 20px;
                        bottom: 30px;
                        overflow: hidden;

                        li {
                            opacity: 0.5;
                            width: 60px;
                            height: 30px;
                            border: 1px solid transparent;
                            border-radius: 2px;
                            float: left;
                            margin-right: 10px;
                        }
                    }

                    .banners {

                        img {
                            height: 240px;
                        }

                        .banner-container {
                            height: 30%;

                            .container {
                                .title {
                                    font-size: 16px;
                                    padding: 5px 10px;
                                    font-weight: bold;
                                }

                                p {
                                    font-size: 12px;
                                    padding: 0 10px;
                                    color: #c0ccda;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 768px) {
        #app {
            .container-main {
                min-width: 680px;
                margin: 0 auto;

                .banner-box-list {
                    .left, .right {
                        background-color: rgba(0, 0, 0, .4);
                        padding: 5px;
                        border-radius: 50%;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 54px;
                        color: #fff;
                    }

                    .left {
                        left: 2%;
                    }

                    .right {
                        right: 2%;
                    }
                    .arr-box {
                        position: absolute;
                        right: 20px;
                        bottom: 30px;
                        overflow: hidden;

                        li {
                            opacity: 0.5;
                            width: 60px;
                            height: 30px;
                            border: 1px solid transparent;
                            border-radius: 2px;
                            float: left;
                            margin-right: 10px;
                        }
                    }

                    .banners {


                        img {
                            height: 460px;
                        }

                        .banner-container {
                            height: 15%;

                            .container {
                                .title {
                                    font-size: 24px;
                                    padding: 10px 20px;
                                    font-weight: bold;
                                }

                                p {
                                    font-size: 16px;
                                    padding: 0 20px;
                                    color: #c0ccda;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 1400px) {

        #app {
            .container-main {
                max-width: 1400px;
                margin: 0 auto;

                .banner-box-list {
                    .left, .right {
                        background-color: rgba(0, 0, 0, .4);
                        padding: 5px;
                        border-radius: 50%;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 64px;
                        color: #fff;
                    }

                    .left {
                        left: 2%;
                    }

                    .right {
                        right: 2%;
                    }

                    .arr-box {
                        position: absolute;
                        right: 20px;
                        bottom: 30px;
                        overflow: hidden;

                        li {
                            opacity: 0.5;
                            width: 60px;
                            height: 30px;
                            border: 1px solid transparent;
                            border-radius: 2px;
                            float: left;
                            margin-right: 10px;
                        }
                    }

                    .banners {
                        .banner-container {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            padding: 10px;

                            .container {
                                text-align: left;
                                height: 100%;
                                border-radius: 6px;
                                color: #fff;
                                background-color: rgba(0, 0, 0, .4);
                            }
                        }

                        img {
                            height: 660px;
                        }

                        .banner-container {
                            height: 20%;

                            .container {
                                .title {
                                    font-size: 24px;
                                    padding: 10px 20px;
                                    font-weight: bold;
                                    color: #fff;
                                }

                                p {
                                    font-size: 18px;
                                    padding: 0 20px;
                                    color: #c0ccda;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
