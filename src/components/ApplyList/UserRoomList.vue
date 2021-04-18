<template>
    <div class="container">
        <el-table
                :data="tableData"
                style="width: 100%" v-loading="loading">
            <el-table-column
                    label="房屋编号">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="地址">
            </el-table-column>
            <el-table-column
                    label="面积">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="价格">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="申请人身份证号">
            </el-table-column>
            <el-table-column
                    label="申请人联系方式">
            </el-table-column>
            <el-table-column
                    label="申请状态">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
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
                :total="totalPage"
                :page-size="pageSize"
                style="margin-top: 20px"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                hide-on-single-page>
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "UserRoomList",
        props: {
            userID: String
        },
        mounted() {
            this.getUserApply(0)
        },
        data() {
            return {
                loading: false,
                totalPage: 0,
                pageSize: 10,
                tableData: []
            }
        },
        methods: {
            getUserApply(pageSize) {
                this.loading = true
                this.axios.get("/").then(res => {
                    this.loading = false
                    if (res.data.code == 200) {
                        this.tableData = res.data.data
                    } else {
                        this.$message.error("获取数据失败，请刷新后重试")
                    }
                }).catch(err => {
                    this.loading = false
                    this.$message.error("获取数据失败，请刷新后重试")
                })
            },
            handleDelete(index, row) {

            },
            handleSizeChange(val) {

            },
            handleCurrentChange(val) {

            }
        }
    }
</script>

<style lang="less" scoped>
    @media screen and (min-width: 240px) {
        #app {
            .container {
                overflow: hidden;
                padding: 5px;

                .demo-table-expand {
                    font-size: 0;
                }

                .demo-table-expand label {
                    width: 90px;
                    color: #99a9bf;
                }

                .demo-table-expand .el-form-item {
                    margin-right: 0;
                    margin-bottom: 0;
                    width: 100%;
                }
            }
        }
    }

    @media screen and (min-width: 768px) {
        #app {
            .container {
                padding: 10px;

                .demo-table-expand {
                    font-size: 0;
                }

                .demo-table-expand label {
                    width: 90px;
                    color: #99a9bf;
                }

                .demo-table-expand .el-form-item {
                    margin-right: 0;
                    margin-bottom: 0;
                    width: 100%;
                }
            }
        }
    }

    @media screen and (min-width: 1330px) {
        #app {
            .container {
                padding: 10px;

                .demo-table-expand {
                    font-size: 0;
                }

                .demo-table-expand label {
                    width: 90px;
                    color: #99a9bf;
                }

                .demo-table-expand .el-form-item {
                    margin-right: 0;
                    margin-bottom: 0;
                    width: 100%;
                }
            }
        }
    }
</style>