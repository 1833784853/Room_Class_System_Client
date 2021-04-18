<template>
    <div class="adminHomeBox" :style="{backgroundColor:bgc,color:textColor}">
        <el-row gutter="20" style="height: 50%">
            <el-col :lg="16" :md="24" :sm="24" style="height: 100%">
                <div class="seeCountBar"></div>
            </el-col>
            <el-col :lg="8" :md="24" :sm="24" style="height: 100%">
                <div class="pieNews"></div>
            </el-col>
        </el-row>
        <el-row gutter="20" style="height: 50%">
            <el-col :lg="16" :md="24" :sm="24" style="height: 100%">
                <div class="lineNums"></div>
            </el-col>
            <el-col :lg="8" style="height: 100%">

            </el-col>
        </el-row>
    </div>
</template>

<script>
    let echarts = require('echarts');

    export default {
        name: "AdminInfo",
        props: {
            formLabelPosition: String,
            updateMenuTitle: Function,
            userID: String,
            userType: String,
            bgc: String,
            textColor: String,
            activeColor: String,
            flag: Boolean,
        },
        watch: {
            flag: {
                handler(val) {
                    this.setEchartsView()
                }
            },
            barData: {
                handler(val) {
                    let set = [];
                    let pieArr = []
                    let lineArr = []
                    val.forEach(item => {
                        let map = new Map()
                        let obj = {}
                        let lineObj = {}
                        if (set.length == 0) {
                            map.set(item.newTime.split(" ")[0], 1)
                            set.push(map)
                        } else {
                            let flag = false
                            let tmp = null
                            let indexi = 0
                            set.forEach((ii, index) => {
                                if (ii.get(item.newTime.split(" ")[0]) !== undefined && flag === false) {
                                    flag = true
                                    tmp = ii.get(item.newTime.split(" ")[0])
                                    indexi = index
                                }
                            })
                            if (flag) {
                                var is = set[indexi].delete(item.newTime.split(" ")[0]);
                                map.set(item.newTime.split(" ")[0], tmp + 1)
                            } else {
                                map.delete(item.newTime.split(" ")[0])
                                map.set(item.newTime.split(" ")[0], 1)
                            }
                            set.push(map)
                        }
                        if (pieArr.length == 0) {
                            let num = 0
                            let sum = 0
                            val.forEach(i => {
                                if (item.newTypeID.newTypeName === i.newTypeID.newTypeName) {
                                    num += 1
                                    sum += i.newSeeCount
                                }
                            })
                            obj.name = item.newTypeID.newTypeName
                            lineObj.name = item.newTypeID.newTypeName
                            lineObj.value = sum
                            obj.value = num
                            pieArr.push(obj)
                            lineArr.push(lineObj)
                        } else {
                            let flag = true
                            pieArr.forEach(y => {
                                if (y.name === item.newTypeID.newTypeName) flag = false
                            })
                            if (flag) {
                                let num = 0
                                let sum = 0
                                val.forEach(i => {
                                    if (item.newTypeID.newTypeName === i.newTypeID.newTypeName) {
                                        sum += i.newSeeCount
                                        num += 1
                                    }
                                })
                                obj.name = item.newTypeID.newTypeName
                                obj.value = num
                                lineObj.name = item.newTypeID.newTypeName
                                lineObj.value = sum
                                pieArr.push(obj)
                                lineArr.push(lineObj)
                            }
                        }
                    })
                    let xArr = []
                    let yArr = []
                    set.forEach(item => {
                        item.forEach((value, key) => {
                            xArr.push(key)
                            yArr.push(value)
                        })
                    })

                    let lineX = []
                    let lineY = []
                    lineArr.forEach(item => {
                        lineX.push(item.name)
                        lineY.push(item.value)
                    })

                    this.$nextTick(() => {
                        this.option = {
                            title: {
                                text: "每天发布的新闻数量",
                                left: 'center'
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    crossStyle: {
                                        color: '#999'
                                    }
                                }
                            },
                            xAxis: {
                                data: xArr
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: yArr,
                                type: 'bar',
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(180, 180, 180, 0.2)'
                                },
                                itemStyle: {
                                    color: "#13CE66"
                                }
                            }]
                        }
                        this.pieOption = {
                            title: {
                                text: '各新闻类型的新闻数量占比',
                                left: 'center'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b} : {c} ({d}%)'
                            },
                            legend: {
                                left: 'center',
                                top: 'bottom',
                                data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    mark: {show: true},
                                    dataView: {show: true, readOnly: false},
                                    restore: {show: true},
                                    saveAsImage: {show: true}
                                }
                            },
                            series: [
                                {
                                    name: '各新闻类别占比',
                                    type: 'pie',
                                    radius: [30, 160],
                                    center: ['50%', '50%'],
                                    roseType: 'area',
                                    itemStyle: {
                                        borderRadius: 5
                                    },
                                    data: pieArr
                                }
                            ]
                        };
                        this.lineOption = {
                            title: {
                                text: '各新闻类型的浏览次数',
                                left: 'center'
                            },
                            xAxis: {
                                type: 'category',
                                data: lineX,

                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            yAxis: {
                                type: 'value',
                                label: {
                                    text: '次数'
                                }
                            },
                            series: [{
                                data: lineY,
                                type: 'line'
                            }]
                        }
                        this.setEchartsView()
                    })
                }
            }
        },
        mounted() {
            this.updateMenuTitle("首页")
            this.axios.get("/News/getAll").then(res => {
                if (res.data.code == 200) {
                    this.barData = res.data.data
                }
            })
        },
        data() {
            return {
                barData: [],
                barCharts: null,
                pieCharts: null,
                lineCharts: null,
                option: {},
                pieOption: {},
                lineOption: {}

            }
        },
        methods: {
            setEchartsView() {
                if (this.barCharts != null && this.pieCharts != null) {
                    this.barCharts.dispose();
                    this.pieCharts.dispose();
                    this.lineCharts.dispose();
                }
                if (this.bgc == "#fff") {
                    let dom = document.querySelector(".seeCountBar");
                    this.barCharts = echarts.init(dom, "light");
                    this.barCharts.setOption(this.option)
                    let pie = document.querySelector(".pieNews");
                    this.pieCharts = echarts.init(pie, "light");
                    this.pieCharts.setOption(this.pieOption)
                    let line = document.querySelector(".lineNums");
                    this.lineCharts = echarts.init(line, "light");
                    this.lineCharts.setOption(this.lineOption)
                } else {
                    let dom = document.querySelector(".seeCountBar");
                    this.barCharts = echarts.init(dom, "dark");
                    this.barCharts.setOption(this.option)
                    let pie = document.querySelector(".pieNews");
                    this.pieCharts = echarts.init(pie, "dark");
                    this.pieCharts.setOption(this.pieOption)
                    let line = document.querySelector(".lineNums");
                    this.lineCharts = echarts.init(line, "dark");
                    this.lineCharts.setOption(this.lineOption)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @media screen and (min-width: 240px) {

    }

    @media screen and (min-width: 768px) {

    }

    @media screen and (min-width: 1400px) {
        #app .adminHomeBox {
            padding: 20px;
            height: 100%;

            .seeCountBar, .pieNews, .lineNums {
                height: 100%;
            }
        }
    }
</style>