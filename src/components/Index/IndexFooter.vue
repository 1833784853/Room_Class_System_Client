<template>
    <div class="footer">
        <el-row class="footer-box">
            <el-col :md="6" :sm="12" :xs="12" :span="10">
                <ul>
                    <li class="title">技术支持</li>
                    <li>小组：颠沛流离</li>
                </ul>
            </el-col>
            <el-col :md="6" :sm="12" :xs="12">
                <ul>
                    <li class="title">联系人</li>
                    <li>蔡林</li>
                    <li>何思密</li>
                    <li>龙玉婷</li>
                    <li>廖勇</li>
                </ul>
            </el-col>
            <el-col class="copy"><span>2019-2021 &copy; 广西职业技术学院-百度人工智能产业学院</span></el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "IndexFooter"
    }
</script>

<style lang="less" scoped>
    @bgc: #00d2ff;
    @media screen and (min-width: 240px) {
        .footer-box {
            min-width: 240px;
            margin: 0 auto;
        }
        .footer {
            background-color: @bgc;
            color: #fff;

            .footer-box {
                max-width: 1400px;
                margin: 0 auto;
            }

            .title {
                font-size: 18px;
            }

            .el-col {
                text-align: left;

                ul li {
                    margin-top: 5px;
                }
            }

            .copy {
                padding: 20px 0;

                span {
                    font-size: 14px;
                }

                text-align: center;
            }
        }
    }

    @media screen and (min-width: 768px) {
        .footer-box {
            min-width: 485px;
            margin: 0 auto;
        }
        .footer {
            background-color: @bgc;
            color: #fff;

            .footer-box {
                max-width: 1400px;
                margin: 0 auto;
            }

            .title {
                font-size: 24px;
            }

            .el-col {
                text-align: left;

                ul li {
                    margin-top: 5px;
                }
            }

            .copy {
                padding: 20px 0;

                span {
                    font-size: 18px;
                }

                text-align: center;
            }
        }
    }

    @media screen and (min-width: 1400px) {
        .el-main {
            height: auto;
        }
        .footer {
            background-color: @bgc;
            color: #fff;

            .footer-box {
                max-width: 1400px;
                margin: 0 auto;
            }

            .title {
                font-size: 24px;
            }

            .el-col {
                text-align: left;

                ul li {
                    margin-top: 5px;
                }
            }

            .copy {
                padding: 20px 0;

                span {
                    font-size: 18px;
                }

                text-align: center;
            }
        }

    }
</style>
