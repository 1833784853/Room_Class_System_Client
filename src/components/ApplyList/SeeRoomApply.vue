<template>
    <div class="room-list-box">
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
                @selection-change="handleSelectionChange">
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
                            :disabled="scope.row.data != undefined?scope.row.isApply:false">{{scope.row.data !=
                        undefined && scope.row.isApply?'已申请':'申请看房'}}
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

                rules: {
                    roomAddress: {validator: validateRoomAddress, trigger: 'blur'},
                    roomArea: {validator: validateRoomArea, trigger: 'blur'},
                    roomPrice: {validator: validateRoomPrice, trigger: 'blur'},
                    roomStatus: {validator: validateRoomStatus, trigger: 'blur'},
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
