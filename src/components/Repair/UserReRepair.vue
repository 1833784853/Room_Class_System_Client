<template>
    <div class="container" :style="{backgroundColor: bgc}">
        <el-row class="top">
            <el-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <el-button-group v-if="btnSize == 'mini'">
                    <el-button type="primary" icon="el-icon-arrow-left" @click="$router.back()" :size="btnSize">
                    </el-button>
                    <el-button type="warning" icon="el-icon-edit"
                               @click="addDialogVisible = true" :size="btnSize">
                    </el-button>
                    <el-button v-show="showDelAllBtn" type="danger" :loading="delBtnIsLoading"
                               icon="el-icon-delete"
                               @click="deleteAllRow" :size="btnSize">
                    </el-button>
                </el-button-group>
                <el-button-group v-else>
                    <el-button type="primary" icon="el-icon-arrow-left" @click="$router.back()" :size="btnSize">返回
                    </el-button>
                    <el-button type="warning" icon="el-icon-edit"
                               @click="addDialogVisible = true" :size="btnSize">我要报障
                    </el-button>
                    <el-button v-show="showDelAllBtn" type="danger" :loading="delBtnIsLoading" icon="el-icon-delete"
                               @click="deleteAllRow" :size="btnSize">{{delBtnIsLoading?"删除中..":"删除所有选中"}}
                    </el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-table
                :data="repairData"
                style="width: 100%" v-loading="loadingRoom"
                :row-style="{backgroundColor: bgc}"
                @selection-change="handleSelectionChange"
                :cell-style="'background-color:'+bgc+'!important;color:'+textColor+'!important;'"
                :header-cell-style="'background-color:'+bgc+'!important;color:'+textColor+'!important;'">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="报障日期"
            >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.roomNO.roomNO }}</span>
                </template>
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
                    label="租赁人"
                    prop="userID.userName">
            </el-table-column>
            <el-table-column
                    label="报障内容"
                    prop="repairContent">
            </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            plain
                            type="primary"
                            @click="editRoom(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="deleteRoom(scope.$index, scope.row)">删除
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
                @current-change="handleRe"
                :current-page.sync="currentPageRoomLease">
        </el-pagination>
        <el-dialog
                :visible.sync="addDialogVisible"
                :close-on-click-modal="false"
                title="我要报障"
        >
            <el-form status-icon ref="form" :rules="rules" label-position="center" :model="form" label-width="100px"
                     size="small">
                <el-form-item label="房源地址：" prop="roomAddress">
                    <el-select v-model="form.roomAddress" placeholder="请选择报障的房源地址" style="width: 100%;">
                        <el-option :label="item.roomNO.roomAddress" :value="item.roomNO.roomNO"
                                   v-for="item in roomSource"
                                   :key="item.roomNO.roomNO">
                            <span style="float: left">{{ item.roomNO.roomAddress }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报障内容：" style="text-align: left" prop="content">
                    <el-input type="textarea" :rows="6" v-model="form.content" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="报障时间：" style="text-align: left">
                    <el-col :span="11">
                        <el-form-item prop="date">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="time">
                            <el-time-picker placeholder="选择时间" v-model="form.time"
                                            style="width: 100%;"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogHandle">取 消</el-button>
                <el-button type="primary" @click="addSubmitForm('form')" :loading="editBtnIsLoading">
                    {{editBtnIsLoading?"添加中":"添加"}}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
                :visible.sync="updateDialogVisible"
                :close-on-click-modal="false"
                title="修改报障信息"
        >
            <el-form status-icon ref="form" :rules="rules" label-position="center" :model="form" label-width="100px"
                     size="small">
                <el-form-item label="房源地址：" prop="roomAddress">
                    <el-select v-model="form.roomAddress" placeholder="请选择报障的房源地址" style="width: 100%;">
                        <el-option :label="item.roomNO.roomAddress" :value="item.roomNO.roomNO"
                                   v-for="item in roomSource"
                                   :key="item.roomNO.roomNO">
                            <span style="float: left">{{ item.roomNO.roomAddress }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报障内容：" style="text-align: left" prop="content">
                    <el-input type="textarea" :rows="6" v-model="form.content" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="报障时间：" style="text-align: left">
                    <el-col :span="11">
                        <el-form-item prop="date">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="time">
                            <el-time-picker placeholder="选择时间" v-model="form.time"
                                            style="width: 100%;"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogHandle">取 消</el-button>
                <el-button type="primary" @click="updateForm('form')" :loading="editBtnIsLoading">
                    {{editBtnIsLoading?"提交中":"提交"}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserReRepair",
        props: {
            userID: String,
            btnSize: String,
            bgc: String,
            textColor: String,
            updateMenuTitle: Function
        },
        watch: {
            userID: {
                handler(val) {
                    if (val != null && val != undefined) {
                        this.axios.get(`/getUserInfo?userID=${val}`).then(res => {
                            this.card = res.data.data[0].userCard
                            console.log(this)
                            this.getUserLease(0)
                        })
                        this.getUserRepair(0)
                    }
                },
                immediate: true
            }
        },
        mounted() {
            this.updateMenuTitle("未处理报障")
        },
        data() {
            let validateRoomAddress = (rule, value, callback) => {
                value = value.trim()
                if (value === "") {
                    callback(new Error("请输入地址！！"))
                }
                callback();
            }
            let validateRoomArea = (rule, value, callback) => {
                value = value.trim()
                if (value === "") {
                    callback(new Error("请输入报障内容！！"))
                }
                callback();
            }
            return {
                loadingRoom: false,
                totalPage: 1,
                pageSize: 10,
                currentPage: 1,
                editBtnIsLoading: false,
                addDialogVisible: false,
                updateDialogVisible: false,
                showDelAllBtn: false,
                delBtnIsLoading: false,
                repairData: [],
                deleteAllRowArr: [],
                roomSource: [],
                card: "",
                form: {
                    roomAddress: "",
                    content: "",
                    date: "",
                    time: ""
                },
                rules: {
                    roomAddress: {validator: validateRoomAddress, trigger: 'blur'},
                    content: {validator: validateRoomArea, trigger: 'blur'},
                }
            }
        },
        methods: {
            getUserRepair(currentPage) {
                this.loadingRoom = true
                this.axios.post("/repairlistTenant", {
                    userID: this.userID,
                    status: 0,
                    currentPage: currentPage,
                    pageSize: this.pageSize
                }).then(res => {
                    this.loadingRoom = false
                    if (res.data.code == 200) {
                        this.repairData = res.data.data
                        this.totalPage = res.data.data.length
                    } else {
                        this.$message.error("获取数据失败，请刷新后重试")
                    }
                }).catch(() => {
                    this.loadingRoom = false
                    this.$message.error("获取数据失败，请刷新后重试")
                })
            },
            getUserLease(currentPage) {
                console.log(this.userID, currentPage, this.pageSize, this.card)
                this.loadingRoom = true
                this.axios.post("/getRoomLeaseByRent", {
                    userCard: this.card,
                    currentPage: currentPage,
                    pageSize: 100000
                }).then(res => {
                    this.loadingRoom = false
                    if (res.data.code == 200) {
                        this.roomSource = res.data.data
                        this.totalPage = res.data.data.length
                    } else {
                        this.$message.error("获取数据失败，请刷新后重试")
                    }
                }).catch(err => {
                    this.loadingRoom = false
                    this.$message.error("获取数据失败，请刷新后重试")
                })
            },
            handleRe() {

            },
            // 当前页改变时
            currentPageRoomLease(val) {

            },
            closeDialogHandle(done) {
                this.form.date = "";
                this.form.time = "";
                this.form.content = "";
                this.form.roomAddress = "";
                this.addDialogVisible = false;
                this.updateDialogVisible = false;
                done
            },
            addSubmitForm(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let timeFormat = ""
                        if (this.form.date === "" && this.form.time === "") {
                            let date = new Date();
                            timeFormat = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                        } else {
                            if (this.form.date === "") {
                                var date = new Date()
                                var time = new Date(this.form.time)
                                timeFormat = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " " + (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":" + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ":" + (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds())
                            } else {
                                var date = new Date(this.form.date)
                                var time = new Date()
                                timeFormat = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " " + (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":" + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ":" + (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds())
                            }
                        }
                        this.editBtnIsLoading = true
                        this.axios.post("/insetReport", {
                            roomNO: this.form.roomAddress,
                            repairContent: this.form.content,
                            userID: this.userID,
                            repairTime: timeFormat
                        }).then(res => {
                            this.editBtnIsLoading = false
                            if (res.data.code == 200) {
                                this.closeDialogHandle()
                                this.$message.success(res.data.msg)
                                this.getUserRepair(this.currentPage - 1)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        }).catch(() => {
                            this.editBtnIsLoading = false
                        })
                    }
                })
            },
            updateForm(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let timeFormat = ""
                        if (this.form.date === "" && this.form.time === "") {
                            let date = new Date();
                            timeFormat = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                        } else {
                            if (this.form.date === "") {
                                var date = new Date()
                                var time = new Date(this.form.time)
                                timeFormat = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " " + (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":" + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ":" + (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds())
                            } else {
                                var date = new Date(this.form.date)
                                var time = new Date()
                                timeFormat = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " " + (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":" + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ":" + (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds())
                            }
                        }
                        this.editBtnIsLoading = true
                        this.axios.post("/insetReport", {
                            roomNO: this.form.roomAddress,
                            repairContent: this.form.content,
                            userID: this.userID,
                            repairTime: timeFormat
                        }).then(res => {
                            this.editBtnIsLoading = false
                            if (res.data.code == 200) {
                                this.closeDialogHandle()
                                this.$message.success(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        }).catch(() => {
                            this.editBtnIsLoading = false
                        })
                    }
                })
            },
            // 修改
            editRoom(index, row) {
                this.form.roomAddress = row.roomNO.roomNO
                this.form.content = row.repairContent
                this.form.date = new Date(row.repairTime)
                this.form.time = new Date(row.repairTime)
                this.updateDialogVisible = true
            },
            handleSelectionChange(val) {
                this.deleteAllRowArr = []
                this.showDelAllBtn = val.length >= 2;
                val.forEach(item => {
                    this.deleteAllRowArr.push(item.repairID)
                })
            },
            deleteRoom(index, row) {
                this.loadingRoom = true
                this.axios.post("/deleteReport", {
                    repairID: row.repairID
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
                        this.getUserRepair(this.currentPage - 1)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.loadingRoom = false
                }).catch(() => {
                    this.loadingRoom = false
                })
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