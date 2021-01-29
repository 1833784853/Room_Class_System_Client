<template>
    <div class="room-list-box">
        <div></div>
        <el-table
                :data="tableData"
                style="width: 100%"
                v-loading="isLoading">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="房源编号">
                            <span>{{ props.row.roomNO }}</span>
                        </el-form-item>
                        <el-form-item label="发布人">
                            <span>{{ props.row.user.userName }}</span>
                        </el-form-item>
                        <el-form-item label="更新时间">
                            <span>{{ props.row.roomLatelyTime }}</span>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <span>{{ props.row.user.userPhone }}</span>
                        </el-form-item>
                        <el-form-item label="面积">
                            <span>{{ props.row.roomArea }}<el-tag style="margin-left:10px;">（㎡）</el-tag></span>
                        </el-form-item>
                        <el-form-item label="地址">
                            <span>{{ props.row.roomAddress }}</span>
                        </el-form-item>
                        <el-form-item label="价格">
                            <span><el-tag type="danger">￥{{ props.row.roomPrice }}</el-tag></span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column
                    label="日期">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.roomTime }}</span>
                </template>
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
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            plain
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
        <el-dialog :close-on-click-modal="false" title="修改房源" :visible.sync="dialogFormVisible"
                   :destroy-on-close="true">
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
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')" :loading="editBtnIsLoading">
                    {{editBtnIsLoading?"修改中":"修改"}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {Message} from 'element-ui'

    export default {
        name: "RoomList",
        props:{
            updateMenuTitle:Function
        },
        mounted() {
            this.updateMenuTitle("房源列表")
            this.getRoomSource()
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
                form: {
                    roomNO: '',
                    roomAddress: '',
                    roomArea: '',
                    roomPrice: '',
                    roomStatus: '',
                },

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
                            this.getRoomSource()
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
                            this.getRoomSource()
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
            getRoomSource() {
                this.isLoading = true
                this.axios.get('/getRoomList').then(res => {
                    this.tableData = res.data.data
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
        overflow: hidden;
        padding: 10px;
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
