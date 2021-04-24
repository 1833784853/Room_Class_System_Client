<template>
    <div>
        <div id="top">
            <div style="margin-left: 100px; line-height: 55px; height: 55px; ">
                房源编号:{{roomNO}}
            </div>
            <div class="left" style="float: right;margin-right: 10px">
                <svg t="1619102552137" class="icon myicon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2797">
                    <path d="M177.6 804.8H56c-17.6 0-24-6.4-24-24V548.8c0-62.4 46.4-110.4 108.8-112h38.4v-12.8V128c0-40 22.4-62.4 60.8-62.4h377.6c40 0 73.6 14.4 102.4 41.6l81.6 81.6c27.2 28.8 41.6 62.4 41.6 100.8v144H880c52.8 1.6 96 35.2 108.8 84.8 1.6 9.6 3.2 19.2 3.2 30.4v228.8c0 17.6-6.4 25.6-24 25.6h-123.2v88c0 12.8-3.2 25.6-11.2 36.8-11.2 16-27.2 22.4-46.4 22.4H241.6c-38.4 0-60.8-22.4-60.8-60.8v-83.2c-3.2 1.6-3.2 0-3.2-1.6zM768 288H678.4c-19.2 0-35.2-6.4-48-22.4-8-11.2-11.2-24-11.2-36.8V142.4h-368v368h515.2c1.6-75.2 1.6-148.8 1.6-222.4z m0 444.8H252.8V880H768v-147.2z m112-222.4c-20.8 0-36.8 17.6-36.8 36.8 0 19.2 16 36.8 36.8 36.8 20.8 0 36.8-16 36.8-36.8 0-20.8-16-36.8-36.8-36.8z"
                          fill="#ffffff" p-id="2798"></path>
                </svg>
            </div>
        </div>
        <div id="main">
            <div id="title1">
                <h2>租房合同</h2>
            </div>
            <div>
                <div id="base">
                    <p><span class="title">甲方（出租方）：</span>
                        <span class="temp6">{{adminName}}</span>
                        <span class="title">身份证号码：</span>
                        <span class="temp">{{adminCard}}</span>
                    </p><br>
                    <p><span class="title">乙方（承租方）：</span>
                        <span class="temp6">{{userName}}</span>
                        <span class="title">身份证号码：</span>
                        <span class="temp">{{userCard}}</span>
                    </p><br>
                </div>

                <div id="msg">
                    <p><span class="title">第一条&nbsp;房屋基本情况</span>&nbsp;&nbsp;&nbsp;甲方房屋位于<span
                            class="temp1">{{roomAddress}}</span>，
                        房屋建筑面积<span class="temp2">{{roomArea}}</span>㎡。
                    </p>
                    <p><span class="title">第二条&nbsp;租金</span>&nbsp;&nbsp;&nbsp;本房屋每月租金为人民币<span
                            class="temp3">{{price}}</span>元；
                        在每月<span class="temp4">12</span>号交给甲方；甲方收到钱给乙方开现金收据。
                    </p>
                    <p><span class="title">第三条&nbsp;租赁期限</span>&nbsp;&nbsp;&nbsp;
                        租赁时间<span class="temp5">{{time}}</span>至<span class="temp5">{{endTime}}</span>止，为期<span
                                class="temp4">24</span>个月。
                    </p>
                    <p><span class="title">第四条&nbsp;付款方式</span>&nbsp;&nbsp;&nbsp;
                        乙方在租赁期间，水电费，物业费，燃气费，以及其它有乙方居住而产生的费用都由乙方承担，租赁结束，要交清居住期间产生的欠款。
                    </p>
                    <p><span class="title">第五条</span>&nbsp;&nbsp;&nbsp;
                        乙方不得随意损坏房屋设施，如需装修或改造，需先征得甲方同意，并承担装修改造费用，租赁结束时，乙方须将房屋设施恢复原状。
                    </p>
                    <p><span class="title">第六条</span>&nbsp;&nbsp;&nbsp;
                        租赁期间，任何一方提出终止合同，须提前<span class="temp4">1</span>
                        个月书面通知对方，经双方同意后方能终止，若乙方强行终止合同，那么租房的押金将不予退还。
                    </p>
                    <p><span class="title">第七条</span>&nbsp;&nbsp;&nbsp;
                        租赁期满，甲方有权收回出租房屋，乙方应如期交还；乙方如要求续租，则必须在租赁期满<span class="temp4">1</span>个月之前书面通知甲方，
                        经甲方同意后，重新签订租赁合同。
                    </p>
                    <p><span class="title">第八条</span>&nbsp;&nbsp;&nbsp;
                        发生争议，甲、乙双方友好协商解决，协商不好时，则由当地人民法院仲裁。
                    </p>
                    <p><span class="title">第九条</span>&nbsp;&nbsp;&nbsp;
                        本合同一式<span class="temp4">2</span>份，甲、乙双方各执<span class="temp4">1</span>份，自双方签字之日起生效。
                    </p><br>
                </div>
                <div id="bottom">
                    <p>
                <span class="title">
                    甲方（出租方）：<span class="bottom"></span>
                    乙方（承租方）：
                </span>
                    </p>
                    <p>
                <span class="title">日期：<span class="year"></span>年<span class="data"></span>月<span class="data"></span>日
                    <span class="jg"></span>
                    日期：<span class="year"></span>年<span class="data"></span>月<span class="data"></span>日</span>
                    </p>
                    <p>
                <span class="title">
                    联系方式：<span class="lx"></span>
                    联系方式：
                </span>
                    </p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Contract",
        watch: {},
        mounted() {
            this.roomAddress = this.$route.params.roomAddress
            this.adminName = this.$route.params.adminName
            this.userName = this.$route.params.userName
            this.roomArea = this.$route.params.roomArea
            this.time = this.$route.params.time
            this.userCard = this.$route.params.userCard
            this.price = this.$route.params.price
            this.roomNO = this.$route.params.roomNO
        },
        data() {
            return {
                roomAddress: "",
                adminName: "",
                userName: "",
                roomArea: "",
                time: "",
                userCard: "",
                price: "",
                roomNO: ""
            }
        }
    }
</script>

<style lang="less">
    body {
        background-color: #525659;
    }


    #top {
        width: 100%;
        height: 55px;
        background-color: #323639;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    /*图标公共样式*/
    #top .myicon {
        padding: 5px;
        margin-top: 5px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        border: 1px solid #ccc;
        background-color: rgba(0, 0, 0, .2);
    }

    #main {
        width: 900px;
        margin-top: 55px;
        margin: 0px auto;
        background-color: white;
        text-align: left;
        padding-top: 90px;
        padding: 90px 100px 50px 100px;
    }

    #main .temp {
        border-bottom: 1px solid black;
        width: 192px;
        display: inline-block;
        text-align: center;
        margin-right: 10px;
        height: 20px;
    }

    #main .temp6 {
        border-bottom: 1px solid black;
        width: 132px;
        display: inline-block;
        text-align: center;
        margin-right: 10px;
        height: 20px;
    }

    #main .temp1 {
        border-bottom: 1px solid black;
        width: 300px;
        display: inline-block;
        text-align: center;
        margin-left: 10px;
        height: 25px;
    }

    #main .temp2 {
        border-bottom: 1px solid black;
        width: 60px;
        display: inline-block;
        text-align: center;
        margin-left: 10px;
        height: 25px;
    }

    #main .temp3 {
        border-bottom: 1px solid black;
        width: 100px;
        display: inline-block;
        text-align: center;
        margin-left: 10px;
        height: 25px;
    }

    #main .temp4 {
        border-bottom: 1px solid black;
        width: 50px;
        display: inline-block;
        text-align: center;
        margin-left: 10px;
        height: 25px;
    }

    #main .temp5 {
        border-bottom: 1px solid black;
        width: 150px;
        display: inline-block;
        text-align: center;
        margin: 0px 10px;
        height: 25px;
    }

    #title1 {
        text-align: center;
    }

    .title {
        font-size: 17px;
        font-weight: bold;
    }

    #msg {
        line-height: 35px;
    }

    #base {
        margin-top: 30px;
    }

    #bottom {
        line-height: 40px;
    }

    #bottom .bottom {
        display: inline-block;
        width: 150px;
    }

    #bottom .year {
        display: inline-block;
        width: 50px;
    }

    #bottom .data {
        display: inline-block;
        width: 30px;
    }

    #bottom .jg {
        display: inline-block;
        width: 69px;
    }

    #bottom .lx {
        display: inline-block;
        width: 203px;
    }
</style>