<template>
    <div class="room-list-box">
        <el-row class="top">
            <el-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <el-button-group v-if="btnSize == 'mini'">
                    <el-button type="primary" icon="el-icon-arrow-left" @click="$router.back()" :size="btnSize">
                    </el-button>
                    <el-button v-show="showDelAllBtn" type="danger" :loading="delBtnIsLoading" icon="el-icon-delete"
                               @click="deleteAllRow" :size="btnSize">
                    </el-button>
                </el-button-group>
                <el-button-group v-else>
                    <el-button type="primary" icon="el-icon-arrow-left" @click="$router.back()" :size="btnSize">返回
                    </el-button>
                    <el-button v-show="showDelAllBtn" type="danger" :loading="delBtnIsLoading" icon="el-icon-delete"
                               @click="deleteAllRow" :size="btnSize">{{delBtnIsLoading?"删除中..":"删除所有选中"}}
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
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "UserReroomLease",
        props: {
            updateMenuTitle: Function,
            userType: String,
            userID: String,
            btnSize: String
        },
        watch: {
            userID: {
                handler(val) {
                    if (val === null || val === undefined || val === "") return
                    this.axios.get(`/getUserInfo?userID=${val}`).then(res => {
                        this.card = res.data.data[0].userCard
                        this.getReroomLeaseList(this.currentPage - 1)
                    })
                },
                immediate:true
            },
            tableData: {
                handler(val) {
                    if (val.length == 0) {
                        this.getReroomLeaseList(this.currentPage - 1)
                    }
                }
            }
        },
        data() {
            return {
                loading: false,
                tableData: [],
                selectBoxData: [],
                totalPage: 0,
                pageSize: 10,
                currentPage: 1,
                delBtnIsLoading: false,
                showDelAllBtn: false,
                card:""
            }
        },
        mounted() {
            this.updateMenuTitle("已退租列表")
        },
        methods: {
            getReroomLeaseList(currentPage) {
                this.loading = true
                this.axios.post("/getRoomLeaseByWithout", {
                    userCard:this.card,
                    currentPage,
                    pageSize: this.pageSize
                }).then(res => {
                    this.loading = false
                    this.tableData = res.data.data
                    this.totalPage = res.data.totalPage
                }).catch(() => {
                    this.loading = false
                })
            },
            // 多选框钩子
            handleSelectionChange(val) {
                this.selectBoxData = []
                val.forEach(item=>{
                    this.selectBoxData.push(item.roomListID)
                })
                this.showDelAllBtn = this.selectBoxData.length >= 2
            },
            // 换页时触发
            handleCurrentChange(val) {
                this.getReroomLeaseList(this.currentPage - 1)
            },
            handleDelete(index, row) {
                this.loading = true
                this.axios.post("/deleteRoomLeaseList", {
                    roomListID: row.roomListID
                }).then(res => {
                    this.loading = false
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
                        this.getReroomLeaseList(this.currentPage - 1)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                }).catch(() => {
                    this.loading = false
                })
            },
            deleteAllRow() {
                this.loading = true
                this.delBtnIsLoading = true
                this.axios.post("/batchdeleteRoomLeaseList", {
                    roomListID: this.selectBoxData
                }).then(res => {
                    this.loading = true
                    this.delBtnIsLoading = true
                    if (res.data.code == 200) {
                        this.$message.success("删除成功")
                        this.getReroomLeaseList(this.currentPage - 1)
                    } else {
                        this.$message.error("删除失败")
                    }
                }).catch(() => {
                    this.loading = false
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