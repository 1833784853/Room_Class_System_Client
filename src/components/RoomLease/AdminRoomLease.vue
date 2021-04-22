<template>
    <div class="container">
        <el-row class="top">
            <el-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <el-button-group v-if="btnSize == 'mini'">
                    <el-button type="primary" icon="el-icon-arrow-left" @click="$router.back()" :size="btnSize">
                    </el-button>
                    <el-badge :value="totalPage" class="item">
                        <el-button type="warning" icon="el-icon-edit"
                                   @click="addDialogVisible = true" :size="btnSize">
                        </el-button>
                    </el-badge>
                    <!--                    <el-button v-show="showDelAllBtn" type="danger" :loading="delBtnIsLoading" icon="el-icon-delete"-->
                    <!--                               @click="deleteAllRow" :size="btnSize">-->
                    <!--                    </el-button>-->
                </el-button-group>
                <el-button-group v-else>
                    <el-button type="primary" icon="el-icon-arrow-left" @click="$router.back()" :size="btnSize">返回
                    </el-button>
                    <el-badge :value="totalPage" class="item">
                        <el-button type="warning" icon="el-icon-edit"
                                   @click="addDialogVisible = true" :size="btnSize">添加合同信息
                        </el-button>
                    </el-badge>
                    <!--                    <el-button v-show="showDelAllBtn" type="danger" :loading="delBtnIsLoading" icon="el-icon-delete"-->
                    <!--                               @click="deleteAllRow" :size="btnSize">{{delBtnIsLoading?"删除中..":"删除所有选中"}}-->
                    <!--                    </el-button>-->
                </el-button-group>
            </el-col>
        </el-row>
        <el-table
                :data="roomLeaseData"
                style="width: 100%" v-loading="loadingRoom">
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
                    label="价格">
                <template slot-scope="scope">
                    <i class="el-icon-money"></i>
                    <span style="margin-left: 10px">{{ scope.row.roomNO.roomPrice }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="租赁人"
                    prop="userID.userName">
            </el-table-column>
            <el-table-column
                    label="租赁人身份证号"
                    prop="userID.userCard">
            </el-table-column>
            <el-table-column
                    label="租赁人联系方式"
                    prop="userID.userID.userPhone">
            </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            plain
                            type="primary"
                            @click="handleDelete(scope.$index, scope.row)">查看合同
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">申请退租
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="totalPageRoomLease"
                :page-size="pageSize"
                style="margin-top: 20px"
                @current-change="handleCurrentChangeRoomLease"
                :current-page.sync="currentPageRoomLease">
        </el-pagination>
        <el-dialog
                :visible.sync="addDialogVisible"
                class="html-dialog"
                :close-on-click-modal="false">
            <el-row class="top">
                <el-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                    <el-button-group v-if="btnSize == 'mini'">
                        <el-button v-show="showDelAllBtn" type="success" :loading="delBtnIsLoading" icon="el-icon-check"
                                   @click="agreeAllRow" :size="btnSize">
                        </el-button>
                        <el-button v-show="showDelAllBtn" type="danger" :loading="delBtnIsLoading" icon="el-icon-close"
                                   @click="deleteAllRow" :size="btnSize">
                        </el-button>
                    </el-button-group>
                    <el-button-group v-else>
                        <el-button v-show="showDelAllBtn" type="success" :loading="delBtnIsLoading" icon="el-icon-check"
                                   @click="agreeAllRow" :size="btnSize">{{delBtnIsLoading?"同意中..":"同意所有选中"}}
                        </el-button>
                        <el-button v-show="showDelAllBtn" type="danger" :loading="delBtnIsLoading" icon="el-icon-close"
                                   @click="deleteAllRow" :size="btnSize">{{delBtnIsLoading?"驳回中..":"驳回所有选中"}}
                        </el-button>
                    </el-button-group>
                </el-col>
            </el-row>
            <el-table
                    :data="tableData"
                    style="width: 100%" v-loading="loading"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
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
                        label="价格">
                    <template slot-scope="scope">
                        <i class="el-icon-money"></i>
                        <span style="margin-left: 10px">{{ scope.row.roomNO.roomPrice }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="租赁人"
                        prop="userID.userName">
                </el-table-column>
                <el-table-column
                        label="租赁人身份证号"
                        prop="userID.userCard">
                </el-table-column>
                <el-table-column
                        label="租赁人联系方式"
                        prop="userID.userID.userPhone">
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                plain
                                type="success"
                                @click="handleAdd(scope.$index, scope.row)">添加合同
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">驳回申请
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
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage">
            </el-pagination>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AdminRoomLease",
        props: {
            userID: String,
            btnSize: String
        },
        watch: {
            userID: {
                handler(val) {
                    if (val === null || val === undefined || val === "") return
                    this.getAdminLease(0)
                },
                immediate: true
            }
        },
        mounted() {

        },
        data() {
            return {
                loading: false,
                loadingRoom: false,
                totalPage: 0,
                pageSize: 10,
                currentPage: 0,
                currentPageRoomLease: 0,
                totalPageRoomLease: 0,
                addDialogVisible: false,
                showDelAllBtn: false,
                delBtnIsLoading: false,
                tableData: [],
                deleteAllRowArr: [],
                roomLeaseData: []
            }
        },
        methods: {
            getAdminLease(pageSize) {
                console.log(this.userID, pageSize, this.pageSize)
                this.loading = true
                this.axios.post("/cselectBystatu", {
                    currentPage: pageSize,
                    pageSize: this.pageSize
                }).then(res => {
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
            // 添加合同
            handleAdd(index, row) {
                this.loading = true
                this.axios.post("/addRoomLeaseList", {
                    roomNO: row.roomNO.roomNO,
                    userID: this.userID,
                    contractUser: row.userID.userName
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success("添加成功")
                        this.getAdminLease(this.currentPage - 1)
                    } else {
                        this.$message.error("添加失败")
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            // 批量驳回
            deleteAllRow() {
                this.loading = true
                this.axios.post("/Admin/editRefusebatch", {
                    applyID: this.deleteAllRowArr
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success("驳回成功")
                        this.getAdminLease(this.currentPage - 1)
                    } else {
                        this.$message.error("驳回失败")
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            // 驳回合同
            handleDelete(index, row) {
                this.loading = true
                this.axios.post("/Tenant/deleteApply", {
                    applyID: row.applyID
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success("驳回成功")
                        this.getAdminLease(this.currentPage - 1)

                    } else {
                        this.$message.error("驳回失败")
                    }
                    this.loading = false
                })
            },
            // 多选框
            handleSelectionChange(data) {
                this.deleteAllRowArr = []
                data.forEach(item => {
                    this.deleteAllRowArr.push(item.applyID)
                })
                this.showDelAllBtn = data.length >= 2
            },
            handleCurrentChange(val) {
                this.getAdminLease(val - 1)
            },
            // 在租列表里的分页触发
            handleCurrentChangeRoomLease(val) {

            }
        }
    }
</script>

<style lang="less" scoped>
    @media screen and (min-width: 240px) {
        #app {
            .container {
                overflow: hidden;
                padding: 10px;

                .top {
                    text-align: left;
                }

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
                padding: 20px;

                .top {
                    text-align: left;
                }

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
                padding: 20px;

                .top {
                    text-align: left;
                }

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