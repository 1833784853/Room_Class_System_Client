<template>
    <div class="room-list-box">
        <el-row class="top">
            <el-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <el-button-group v-if="btnSize == 'mini'">
                    <el-button type="primary" icon="el-icon-arrow-left" @click="$router.back()" :size="btnSize">
                    </el-button>

                    <el-button v-show="showDelAllBtn" type="success" :loading="delBtnIsLoading" icon="el-icon-check"
                               @click="agreeAllRow" :size="btnSize">
                    </el-button>
                    <el-button v-show="showDelAllBtn" type="danger" :loading="delBtnIsLoading" icon="el-icon-close"
                               @click="deleteAllRow" :size="btnSize">
                    </el-button>
                    <el-button v-show="showDelAllBtn" type="danger" plain :loading="delBtnIsLoading"
                               icon="el-icon-delete"
                               @click="deleteAll" :size="btnSize">
                    </el-button>
                </el-button-group>
                <el-button-group v-else>
                    <el-button type="primary" icon="el-icon-arrow-left" @click="$router.back()" :size="btnSize">返回
                    </el-button>
                    <el-button v-show="showDelAllBtn" type="success" :loading="delBtnIsLoading" icon="el-icon-check"
                               @click="agreeAllRow" :size="btnSize">{{delBtnIsLoading?"同意中..":"同意所有选中"}}
                    </el-button>
                    <el-button v-show="showDelAllBtn" type="danger" :loading="delBtnIsLoading" icon="el-icon-close"
                               @click="deleteAllRow" :size="btnSize">{{delBtnIsLoading?"拒绝中..":"拒绝所有选中"}}
                    </el-button>
                    <el-button v-show="showDelAllBtn" type="danger" plain :loading="delBtnIsLoading"
                               icon="el-icon-delete"
                               @click="deleteAll" :size="btnSize">{{delBtnIsLoading?"删除中..":"删除所有选中"}}
                    </el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table
                :data="tableData"
                style="width: 100%"
                v-loading="isLoading"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55" v-if="userType == '管理员'">
            </el-table-column>
            <el-table-column
                    label="房源编号">
                <template slot-scope="scope">
                    <span>{{ scope.row.roomNO.roomNO }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="地址">
                <template slot-scope="scope">
                    <span>{{ scope.row.roomNO.roomAddress}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="面积(㎡)">
                <template slot-scope="scope">
                    <span>{{ scope.row.roomNO.roomArea}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="价格">
                <template slot-scope="scope">
                    <span>{{ scope.row.roomNO.roomPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="申请人姓名">
                <template slot-scope="scope">
                    <span>{{ scope.row.userID.userName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="申请人联系电话">
                <template slot-scope="scope">
                    <span>{{ scope.row.userID.userID.userPhone}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="申请人身份证号">
                <template slot-scope="scope">
                    <span>{{ scope.row.userID.userCard}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="success"
                            plain
                            v-if="scope.row.applyStatus == 0"
                            @click="handleArgee(scope.$index, scope.row)">同意
                    </el-button>
                    <el-button
                            size="mini"
                            plain
                            type="danger"
                            v-if="scope.row.applyStatus == 0"
                            @click="handleDelete(scope.$index, scope.row)"
                    >拒绝
                    </el-button>
                    <el-tag type="success" v-else-if="scope.row.applyStatus == 1" style="margin-right: 10px">已同意申请
                    </el-tag>

                    <el-tag type="danger" v-else-if="scope.row.applyStatus == 2" style="margin-right: 10px">已拒绝申请
                    </el-tag>

                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDel(scope.$index, scope.row)"
                    >删除
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
    </div>
</template>

<script>
    export default {
        name: "SeeRoomApply",
        props: {
            updateMenuTitle: Function,
            userType: String,
            userID: String,
            btnSize: String
        },
        mounted() {
            this.updateMenuTitle("看房申请列表")
            this.getApplyAll(0)
        },
        data() {
            return {
                isLoading: false,
                tableData: [],
                showDelAllBtn: false,
                delBtnIsLoading: false,
                applyLoading: false,
                deleteAllRowArr: [],
                form: {
                    roomNO: '',
                    roomAddress: '',
                    roomArea: '',
                    roomPrice: '',
                    roomStatus: '',
                },
                totalPage: 0,
                pageSize: 10,
                currentPage: 0,
            }
        },
        methods: {
            getApplyAll(currentPage) {
                this.isLoading = true
                this.axios.get(`/Admin/getlistAll?currentPage=${currentPage}&pageSize=${this.pageSize}`).then(res => {
                    this.tableData = res.data.data
                    this.totalPage = res.data.totalPage
                    this.isLoading = false
                }).catch(err => {
                    this.isLoading = false
                })
            },
            // 批量同意
            agreeAllRow() {
                this.isLoading = true
                this.axios.post("/Admin/editAgreebatch", {
                    applyID: this.deleteAllRowArr
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
                        this.getApplyAll(this.currentPage - 1)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.isLoading = false
                }).catch(() => {
                    this.isLoading = false
                })
            },
            // 批量拒绝
            deleteAllRow() {
                this.isLoading = true
                this.axios.post("/Admin/editRefusebatch", {
                    applyID: this.deleteAllRowArr
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
                        this.getApplyAll(this.currentPage - 1)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.isLoading = false
                }).catch(() => {
                    this.isLoading = false
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
            handleArgee(index, row) {
                this.isLoading = true
                this.axios.post("/Admin/editApply", {
                    applyStatus: 1,
                    applyID: row.applyID
                }).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success("操作成功")
                        this.getApplyAll(this.currentPage)
                    } else {
                        this.$message.error("操作失败")
                    }
                    this.isLoading = false
                }).catch(() => {

                    this.isLoading = false
                })
            },
            handleDelete(index, row) {
                this.isLoading = true
                this.axios.post("/Admin/editApply", {
                    applyStatus: 2,
                    applyID: row.applyID
                }).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success("操作成功")
                        this.getApplyAll(this.currentPage)
                    } else {
                        this.$message.error("操作失败")
                    }
                    this.isLoading = false
                }).catch(() => {

                    this.isLoading = false
                })
            },
            handleCurrentChange(val) {
                // 换页事件
                this.getApplyAll(this.currentPage - 1)
            },
            // 逐个删除
            handleDel(index, row) {
                this.isLoading = true
                this.axios.post("/Tenant/deleteApply", {
                    applyID: row.applyID
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
                        this.getApplyAll(this.currentPage - 1)

                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.isLoading = false
                }).catch(() => {
                    this.isLoading = false
                })
            },
            // 批量删除
            deleteAll() {
                this.delBtnIsLoading = true
                this.axios.post("/Tenant/deletebatch", {
                    applyID: this.deleteAllRowArr
                }).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success("删除成功")
                        this.getApplyAll(this.currentPage - 1)
                    } else {
                        this.$message.error("删除失败")
                    }
                    this.delBtnIsLoading = false
                }).catch(() => {
                    this.delBtnIsLoading = false
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .room-list-box {
        background-color: #fff;
        border-radius: 10px;
        padding: 10px;

        .top {
            text-align: left;
        }
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

    @media screen and (min-width: 240px) {

    }

    @media screen and (min-width: 768px) {

    }

    @media screen and (min-width: 1330px) {

    }
</style>
