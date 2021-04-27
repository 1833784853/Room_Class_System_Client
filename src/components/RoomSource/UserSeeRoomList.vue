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
                style="width: 100%"
                v-loading="isLoading"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55" v-if="userType == '管理员'">
            </el-table-column>
<!--            <el-table-column type="expand">-->
<!--                <template slot-scope="props">-->
<!--                    <el-form label-position="left" inline class="demo-table-expand">-->
<!--                        <el-form-item label="房源编号">-->
<!--                            <span>{{props.row.data }}</span>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="发布人">-->
<!--                            <span>{{props.row.data.user }}</span>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="更新时间">-->
<!--                            <span>{{props.row.data.roomLatelyTime }}</span>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="联系电话">-->
<!--                            <span>{{props.row.data.user.userPhone }}</span>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="面积">-->
<!--                            <span>{{props.row.data.roomArea  }}<el-tag-->
<!--                                    style="margin-left:10px;">（㎡）</el-tag></span>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="地址">-->
<!--                            <span>{{props.row.data.roomAddress  }}</span>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="价格">-->
<!--                            <span><el-tag type="danger">￥{{props.row.data.roomPrice }}</el-tag></span>-->
<!--                        </el-form-item>-->
<!--                    </el-form>-->
<!--                </template>-->
<!--            </el-table-column>-->

            <el-table-column
                    prop="roomTime"
                    label="日期">
            </el-table-column>
            <el-table-column
                    prop="roomNO"
                    label="房源编号">
            </el-table-column>
            <el-table-column
                    prop="roomAddress"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="roomStatus"
                    label="状态">
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="handleSee(scope.$index, scope.row)">申请看房
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
    import {Message} from 'element-ui'

    export default {
        name: "UserSeeRoomList",
        props: {
            updateMenuTitle: Function,
            userType: String,
            userID: String,
            btnSize: String
        },
        watch: {
            userID: {
                handler(val) {
                    if (val != undefined || val != "") {
                        this.getTenantRoomList(0)
                    }
                },
                immediate: true
            }
        },
        mounted() {
            this.updateMenuTitle("房源列表")

        },
        data() {

            return {
                isLoading: false,
                editBtnIsLoading: false,
                tableData: [],
                dialogFormVisible: false,
                addDialogVisible: false,
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
            handleCurrentChange(val) {
                this.getRoomSource(val - 1)
            },
            handleSizeChange(val) {
                this.pageSize = val
            },

            handleSelectionChange(rows) {
                if (rows) {
                    this.showDelAllBtn = rows.length >= 2
                }
                this.deleteAllRowArr = rows;
            },
            handleSee(index,row) {
                this.isLoading = true
                this.$message.warning("申请中..")
                this.axios.get(`/getRoomSourceByStatus?userID=${this.userID}&roomNO=${row.roomNO ? row.roomNO : row.data.roomNO}`).then(res => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.msg)
                            this.getTenantRoomList(this.currentPage - 1)
                        } else {
                            this.$message.error(res.data.msg)
                        }
                        this.isLoading = false
                    }
                }).catch(() => {
                    this.isLoading = false
                })
            },
            getTenantRoomList(val) {
                this.isLoading = true
                this.axios.post(`/getRoomSourceByStatus`, {
                    currentPage: val,
                    pageSize: this.pageSize
                }).then(res => {
                    if (res.status == 200) {
                        this.tableData = res.data.data
                        this.totalPage = res.data.totalPage
                    }
                    this.isLoading = false
                }).catch(() => {
                    this.isLoading = false
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