<template>
    <div class="container">
        <el-table
                :data="tableData"
                style="width: 100%" v-loading="loading"
                :row-style="{backgroundColor: bgc}"
                :cell-style="'background-color:'+bgc+'!important;color:'+textColor+'!important;'"
                :header-cell-style="'background-color:'+bgc+'!important;color:'+textColor+'!important;'">
            <el-table-column
                    label="房屋编号"
            >
                <template slot-scope="scope">
                    <i class="el-icon-key"></i>
                    <span style="margin-left: 10px">{{ scope.row.roomNO.roomNO }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="地址"
                    prop="roomNO.roomAddress">
            </el-table-column>
            <el-table-column
                    label="面积(㎡)">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.roomNO.roomArea }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="价格">
                <template slot-scope="scope">
                    <i class="el-icon-money"></i>
                    <span style="margin-left: 10px">{{ scope.row.roomNO.roomPrice }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="申请人身份证号"
                    prop="userID.userCard">
            </el-table-column>
            <el-table-column
                    label="申请人联系方式"
                    prop="userID.userID.userPhone">
            </el-table-column>
            <el-table-column
                    label="申请状态">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.applyStatus == 0?'正在申请。。':(scope.row.applyStatus == 1?'已同意申请':'已拒绝申请') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100px">
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
                :current-page.sync="currentPage">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "UserRoomList",
        props: {
            userID: String,
            bgc: String,
            textColor: String
        },
        watch: {
            userID: {
                handler(val) {
                    if (val === null || val === undefined || val === "") return
                    this.getUserApply(0)
                },
                immediate: true
            }
        },
        mounted() {

        },
        data() {
            return {
                loading: false,
                totalPage: 0,
                pageSize: 10,
                currentPage: 0,
                tableData: []
            }
        },
        methods: {
            getUserApply(pageSize) {
                this.loading = true
                this.axios.get(`/Tenant/getApplylistUserid?userID=${this.userID}&currentPage=${pageSize}&pageSize=${this.pageSize}`).then(res => {
                    this.loading = false
                    if (res.data.code == 200) {
                        this.tableData = res.data.data
                        this.totalPage = res.data.totalPage
                    } else {
                        this.$message.error("获取数据失败，请刷新后重试")
                    }
                }).catch(err => {
                    this.loading = false
                    this.$message.error("获取数据失败，请刷新后重试")
                })
            },
            handleDelete(index, row) {
                this.loading = true
                this.axios.post("/Tenant/deleteApply", {
                    applyID: row.applyID
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
                        this.getUserApply(this.currentPage - 1)

                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.loading = false
                })
            },
            handleSizeChange(val) {

            },
            handleCurrentChange(val) {
                this.getUserApply(val - 1)
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