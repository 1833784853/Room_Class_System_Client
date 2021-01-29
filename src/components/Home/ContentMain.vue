<template>
    <div class="main">
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="日期">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="姓名">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                style="margin-top: 20px"
                :small="small">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "ContentMain",
        props: {
            small: Boolean,
        },
        data: function () {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                pageSize: 10,
                total: 1000
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        }
    }
</script>

<style scoped>
    @media screen and (min-width: 240px) {

        .hidden-xs-only {
            display: none;
        }

        .el-container {
            height: 100%;
        }

    }

    @media screen and (min-width: 768px) {


        .hidden-xs-only {
            display: inline-block
        }

        .logo-box {
            text-align: center;
            display: block;
        }
        .el-main {
            background-color: #E9EEF3;
            margin: 20px!important;
        }

        .header .left {
            float: left;
            text-align: center;
        }

        .header .right {
            float: right;
            text-align: center;
        }

        .el-breadcrumb {
            margin-top: 30px;
            font-size: 16px;
            margin-right: 15px;
        }

        .header .right .el-button {
            transform: translateY(-14px);
        }

        .header .right .username {
            display: inline-block;
            transform: translateY(-12px);
            margin: 0 10px;
        }

        .header .right .el-dropdown {
            transform: translateY(-10px);
            margin-right: 10px;
        }

        .main {
            padding: 15px;
            border-radius: 15px;
            /*background-color: #fff;*/
        }
    }

    @media screen and (min-width: 1330px) {

        .el-aside {
            background-color: #D3DCE6;
            color: #333;
            text-align: center;
            height: 100%;
            width: 200px !important;
        }

        .header {
            margin: 15px 0;
            border-radius: 15px;
            padding: 0 20px;
            background-color: #fff;
            overflow: hidden;
            text-align: center;
        }

        .header .left {
            float: left;
            text-align: center;
            width: 50%;
        }

        .header .right {
            float: right;
            text-align: center;
        }

        .el-breadcrumb {
            margin-top: 30px;
            font-size: 16px;
            margin-right: 15px;
        }

        .header .right .el-button {
            transform: translateY(-14px);
        }

        .header .right .username {
            display: inline-block;
            transform: translateY(-12px);
            margin: 0 10px;
        }

        .header .right .el-dropdown {
            transform: translateY(-10px);
            margin-right: 10px;
        }
    }
</style>
