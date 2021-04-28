<template>
    <div class="room-list-box" :style="{backgroundColor:bgc,color:textColor}">
        <el-row class="top">
            <el-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <el-button-group v-if="btnSize == 'mini'">
                    <el-button type="primary" icon="el-icon-arrow-left" @click="$router.back()" :size="btnSize">
                    </el-button>
                    <el-button v-if="userType == '管理员'" type="warning" icon="el-icon-edit"
                               @click="addDialogVisible = true" :size="btnSize">
                    </el-button>
                    <el-button v-show="showDelAllBtn" type="danger" :loading="delBtnIsLoading" icon="el-icon-delete"
                               @click="deleteAllRow" :size="btnSize">
                    </el-button>
                </el-button-group>
                <el-button-group v-else>
                    <el-button type="primary" icon="el-icon-arrow-left" @click="$router.back()" :size="btnSize">返回
                    </el-button>
                    <el-button v-if="userType == '管理员'" type="warning" icon="el-icon-edit"
                               @click="addDialogVisible = true" :size="btnSize">添加房源信息
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
                @selection-change="handleSelectionChange"
                :row-style="{backgroundColor: bgc}"
                :cell-style="'background-color:'+bgc+'!important;color:'+textColor+'!important;'"
                :header-cell-style="'background-color:'+bgc+'!important;color:'+textColor+'!important;'">
            <el-table-column
                    type="selection"
                    width="55" v-if="userType == '管理员'">
            </el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="房源编号">
                            <span>{{ props.row.data!= undefined ?props.row.data.roomNO:props.row.roomNO }}</span>
                        </el-form-item>
                        <el-form-item label="发布人">
                            <span>{{ props.row.data!= undefined ?props.row.data.user.userName:props.row.user.userName }}</span>
                        </el-form-item>
                        <el-form-item label="更新时间">
                            <span>{{ props.row.data!= undefined ?props.row.data.roomLatelyTime:props.row.roomLatelyTime }}</span>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <span>{{ props.row.data!= undefined ?props.row.data.user.userPhone:props.row.user.userPhone }}</span>
                        </el-form-item>
                        <el-form-item label="面积">
                            <span>{{ props.row.data!= undefined ?props.row.data.roomArea :props.row.roomArea }}<el-tag
                                    style="margin-left:10px;">（㎡）</el-tag></span>
                        </el-form-item>
                        <el-form-item label="地址">
                            <span>{{ props.row.data!= undefined ?props.row.data.roomAddress :props.row.roomAddress }}</span>
                        </el-form-item>
                        <el-form-item label="价格">
                            <span><el-tag type="danger">￥{{ props.row.data!= undefined ?props.row.data.roomPrice:props.row.roomPrice }}</el-tag></span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column
                    label="日期">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.data!= undefined ? scope.row.data.roomTime:scope.row.roomTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="房源编号">
                <template slot-scope="scope">
                    <span>{{ scope.row.data!= undefined ?scope.row.data.roomNO :scope.row.roomNO }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="地址">
                <template slot-scope="scope">
                    <span>{{ scope.row.data!= undefined ?scope.row.data.roomAddress :scope.row.roomAddress }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="状态">
                <template slot-scope="scope">
                    <span>{{ scope.row.data!= undefined ?scope.row.data.roomStatus :scope.row.roomStatus }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="handleEdit(scope.$index, scope.row)"
                            v-if="userType == '管理员'">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            v-if="userType == '管理员'">删除
                    </el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="applyRoomHandle(scope.$index, scope.row)"
                            v-if="userType != '管理员' && (scope.row.roomStatus == '空闲' || scope.row.data.roomStatus == '空闲')"
                            :disabled="scope.row.data != undefined?scope.row.isApply:false">{{scope.row.data != undefined && scope.row.isApply?'已申请':'申请看房'}}
                    </el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-dialog :close-on-click-modal="false" title="修改房源" :visible.sync="dialogFormVisible"
                   :destroy-on-close="true" :before-close="closeDialogHandle">
            <el-form status-icon ref="form" :rules="rules" label-position="center" :model="form" label-width="100px"
                     size="small">
                <el-form-item label="房源地址：" label-suffix="￥" prop="roomAddress">
                    <el-input v-model="form.roomAddress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房源面积：" style="text-align: left" prop="roomArea">
                    <el-input v-model="form.roomArea" autocomplete="off" style="width: 40%">
                    </el-input>
                    <el-tag>㎡</el-tag>
                </el-form-item>
                <el-form-item label="房源单价：" style="text-align: left" prop="roomPrice">
                    <el-input v-model="form.roomPrice" autocomplete="off" style="width: 40%">
                    </el-input>
                    <el-tag type="danger">元</el-tag>
                </el-form-item>
                <el-form-item label="房源状态：" style="text-align: left" prop="roomStatus">
                    <el-select v-model="form.roomStatus" placeholder="请选择状态">
                        <el-option label="空闲" value="空闲"></el-option>
                        <el-option label="已租" value="已租"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogHandle">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')" :loading="editBtnIsLoading">
                    {{editBtnIsLoading?"修改中":"修改"}}
                </el-button>
            </div>
        </el-dialog>

        <el-dialog :close-on-click-modal="false" title="添加房源" :visible.sync="addDialogVisible"
                   :destroy-on-close="true" :before-close="closeDialogHandle">
            <el-form status-icon ref="form" :rules="rules" label-position="center" :model="form" label-width="100px"
                     size="small">
                <el-form-item label="房源地址：" label-suffix="￥" prop="roomAddress">
                    <el-input v-model="form.roomAddress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房源面积：" style="text-align: left" prop="roomArea">
                    <el-input v-model="form.roomArea" autocomplete="off" style="width: 40%">
                    </el-input>
                    <el-tag>㎡</el-tag>
                </el-form-item>
                <el-form-item label="房源单价：" style="text-align: left" prop="roomPrice">
                    <el-input v-model="form.roomPrice" autocomplete="off" style="width: 40%">
                    </el-input>
                    <el-tag type="danger">元</el-tag>
                </el-form-item>
                <el-form-item label="房源状态：" style="text-align: left" prop="roomStatus">
                    <el-select v-model="form.roomStatus" placeholder="请选择状态">
                        <el-option label="空闲" value="空闲"></el-option>
                        <el-option label="已租" value="已租"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogHandle">取 消</el-button>
                <el-button type="primary" @click="addSubmitForm('form')" :loading="editBtnIsLoading">
                    {{editBtnIsLoading?"添加中":"添加"}}
                </el-button>
            </div>
        </el-dialog>
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
    import {Message} from 'element-ui'

    export default {
        name: "RoomList",
        props: {
            updateMenuTitle: Function,
            userType: String,
            userID: String,
            btnSize: String,
            bgc: String,
            textColor:String,
        },
        mounted() {
            this.updateMenuTitle("房源列表")
            setTimeout(() => {
                if (this.userType == "管理员") this.getRoomSource(0)
                else this.getTenantRoomList(0)
            }, 100)
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
                if (/^\d+.?\d{0,2}$/.test(value)) {
                    callback()
                } else {
                    callback(new Error("请输入正确的数字，小数为2位！！"))
                }
            }
            let validateRoomPrice = (rule, value, callback) => {
                value = value.trim()
                if (/^\d+.?\d{0,2}$/.test(value)) {
                    callback()
                } else {
                    callback(new Error("请输入正确的数字，小数为2位！！"))
                }
            }
            let validateRoomStatus = (rule, value, callback) => {
                value = value.trim()
                if (value === '') {
                    callback('请选择状态')
                }
                callback();
            }
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

                rules: {
                    roomAddress: {validator: validateRoomAddress, trigger: 'blur'},
                    roomArea: {validator: validateRoomArea, trigger: 'blur'},
                    roomPrice: {validator: validateRoomPrice, trigger: 'blur'},
                    roomStatus: {validator: validateRoomStatus, trigger: 'blur'},
                }
            }
        },
        methods: {
            handleEdit(index, row) {
                this.form.roomNO = row.roomNO
                this.form.roomAddress = row.roomAddress
                this.form.roomArea = row.roomArea + ''
                this.form.roomPrice = row.roomPrice + ''
                this.form.roomStatus = row.roomStatus
                this.dialogFormVisible = true;
            },
            closeDialogHandle() {
                this.form.roomAddress = ''
                this.form.roomArea = ''
                this.form.roomPrice = ''
                this.form.roomStatus = ''
                this.addDialogVisible = false
                this.dialogFormVisible = false
            },
            handleDelete(index, row) {
                this.$MessageBox.confirm('此操作将永久删除该记录, 是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post("/RoomSource/delete", {
                        roomNO: row.roomNO
                    }).then(res => {
                        if (res.status == 200 && res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getRoomSource(this.currentPage - 1)
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    })
                })

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editBtnIsLoading = true;
                        this.axios.post("/RoomSource/edit", this.form).then(res => {
                            if (res.status == 200 && res.data.code == 200) {
                                Message.success(res.data.msg)
                            } else {
                                Message.error(res.data.msg)
                            }
                            this.getRoomSource(this.currentPage - 1)
                            this.editBtnIsLoading = false
                            this.dialogFormVisible = false
                        }).catch(() => {
                            this.editBtnIsLoading = false
                            this.dialogFormVisible = false
                        })
                    } else {
                        return false;
                    }
                });
            },
            addSubmitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editBtnIsLoading = true;
                        let {
                            roomAddress,
                            roomArea,
                            roomPrice,
                            roomStatus
                        } = this.form
                        this.axios.post("/RoomSource/add", {
                            roomAddress,
                            roomArea,
                            roomPrice,
                            roomStatus,
                            userID: this.userID
                        }).then(res => {
                            if (res.status == 200) {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg);
                                    this.editBtnIsLoading = false;
                                    this.getRoomSource(this.currentPage - 1)
                                    this.closeDialogHandle()
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            } else {
                                this.$message.error("网络异常，请重试！！")
                            }
                        }).catch(() => {
                            this.editBtnIsLoading = false;
                        })
                    } else {
                        return false;
                    }
                });
            },
            handleCurrentChange(val) {
                this.getRoomSource(val - 1)
            },
            handleSizeChange(val) {
                this.pageSize = val
            },
            getRoomSource(val) {
                this.isLoading = true
                this.axios.get('/getRoomList?currentPage=' + val + '&pageSize=' + this.pageSize).then(res => {
                    this.tableData = res.data.data
                    this.isLoading = false
                }).catch(() => {
                    this.isLoading = false
                })
            },
            handleSelectionChange(rows) {
                if (rows) {
                    this.showDelAllBtn = rows.length >= 2
                }
                this.deleteAllRowArr = rows;
            },
            deleteAllRow() {
                let deleteAllRoomNOArr = []
                this.deleteAllRowArr.forEach(item => {
                    deleteAllRoomNOArr.push(item.roomNO)
                })
                this.delBtnIsLoading = true
                this.isLoading = true
                this.axios.post("/RoomSource/deleteAll", {
                    deleteAllRoomNOArr
                }).then(res => {
                    if (res.status == 200 && res.data.code == 200) {
                        this.$message.success(res.data.msg)
                        this.getRoomSource(this.currentPage - 1)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.delBtnIsLoading = false;
                    this.isLoading = false;
                }).catch(() => {
                    this.delBtnIsLoading = false;
                    this.isLoading = false;
                })
            },
            applyRoomHandle(index, row) {
                this.isLoading = true
                this.$message.warning("申请中..")
                this.axios.get(`/ApplySeeRoom?userID=${this.userID}&roomNO=${row.roomNO?row.roomNO:row.data.roomNO}`).then(res => {
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
                this.axios.get(`/getApplySeeRoomList?userID=${this.userID}&currentPage=${val}&pageSize=${this.pageSize}`).then(res => {
                    if (res.status == 200) {
                        this.tableData = res.data.data
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
