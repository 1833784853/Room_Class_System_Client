<template>
    <div class="room-list-box" :style="{backgroundColor: bgc,color:textColor,transition: 'all .4s'}">
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
                </el-button-group>
                <el-button-group v-else>
                    <el-button type="primary" icon="el-icon-arrow-left" @click="$router.back()" :size="btnSize">返回
                    </el-button>
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
                @selection-change="handleSelectionChange"
                :row-style="{backgroundColor: bgc}"
                :cell-style="'background-color:'+bgc+'!important;color:'+textColor+'!important;'"
                :header-cell-style="'background-color:'+bgc+'!important;color:'+textColor+'!important;'">
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
                    label="状态">
                <template slot-scope="scope">
                    <el-tag type="warning">正在申请退租</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    label="申请人姓名"
                    prop="userID.userName">
            </el-table-column>
            <el-table-column
                    label="申请人身份证号"
                    prop="userID.userCard">
            </el-table-column>
            <el-table-column
                    label="申请人联系方式"
                    prop="userID.userID.userPhone">
            </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            plain
                            type="success"
                            @click="handleAgree(scope.$index, scope.row)">同意
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">驳回
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
        name: "AdminAppleReroom",
        props: {
            updateMenuTitle: Function,
            userID: String,
            btnSize: String,
            bgc: String,
            textColor: String
        },
        watch: {
            userID: {
                handler(val) {

                }
            }
        },
        mounted() {
            this.updateMenuTitle("退房申请列表")
            this.getApplyReroom(0)
        },
        data() {
            return {
                totalPage: 1,
                pageSize: 10,
                tableData: [],
                applyIDArr: [],
                roomNOArr: [],
                roomListIDArr: [],
                delBtnIsLoading: false,
                showDelAllBtn: false,
                currentPage: 1,
                loading: false
            }
        },
        methods: {
            // 同意
            handleAgree(index, row) {
                this.loading = true
                this.axios.post("/Admin/editAgreeRefund", {
                    applyID: row.applyID,
                    roomListID: row.roomListID,
                    roomNO: row.roomNO.roomNO
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
                        this.getApplyReroom(this.currentPage - 1)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            // 驳回
            handleDelete(index, row) {
                this.loading = true
                this.axios.post("/Admin/editRefuseRefund", {
                    applyID: row.applyID,
                    roomNO: row.roomNO.roomNO,
                    roomListID: row.roomListID
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
                        this.getApplyReroom(this.currentPage - 1)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            // 页面变化时触发
            handleCurrentChange(val) {
                this.getApplyReroom(val - 1)
            },
            // 批量同意
            agreeAllRow() {
                this.delBtnIsLoading = true
                this.axios.post("/Admin/editAgreeRefundList", {
                    applyID: this.applyIDArr,
                    roomNO: this.roomNOArr,
                    roomListID: this.roomListIDArr
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
                        this.getApplyReroom(this.currentPage - 1)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.delBtnIsLoading = false
                }).catch(() => {
                    this.delBtnIsLoading = false
                })
            },
            deleteAllRow() {
                this.delBtnIsLoading = true
                this.axios.post("/Admin/editRefuseRefundList",{
                    applyID: this.applyIDArr,
                    roomNO: this.roomNOArr,
                    roomListID: this.roomListIDArr
                }).then(res=>{
                    if (res.data.code==200) {
                        this.$message.success(res.data.msg)
                        this.getApplyReroom(this.currentPage - 1)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.delBtnIsLoading = false
                }).catch(()=>{
                    this.delBtnIsLoading = false
                })
            },
            // 多选框
            handleSelectionChange(val) {
                this.applyIDArr = []
                this.roomListIDArr = []
                this.roomNOArr = []
                this.showDelAllBtn = val.length >= 2
                val.forEach(item => {
                    this.applyIDArr.push(item.applyID)
                    this.roomListIDArr.push(item.roomListID)
                    this.roomNOArr.push(item.roomNO.roomNO)
                })
            },
            getApplyReroom(currentPage) {
                this.loading = true
                this.axios.get(`/Admin/getApplylistRefund?currentPage=${currentPage}&pageSize=${this.pageSize}`).then(res => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data
                        this.totalPage = res.data.totalPage
                    } else {
                        this.$message.error("获取数据失败，请稍后重试")
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
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