<template>
    <span>
        <el-badge :value="total" :max="99" class="hidden-xs-only" v-if="userType == '管理员'">
            <el-dropdown trigger="hover" :style="{color:color,fontSize:'16px'}">
                <span class="el-dropdown-link">
                    消息<i class="el-icon-bell el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        看房申请
                        <el-badge :value="seeRoomApplyBadge"/>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        退房申请
                        <el-badge :value="outRoomApplyBadge"/>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        待处理报障
                        <el-badge :value="reportApplyBadge"/>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-badge>
        <el-badge :value="totalTenant" :max="99" class="hidden-xs-only" v-if="userType == '认证用户'">
            <el-dropdown trigger="hover" :style="{color:color,fontSize:'16px'}">
                <span class="el-dropdown-link">
                    消息<i class="el-icon-bell el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        待缴租金
                        <el-badge :value="recolletApplyBadgeTenant"/>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        已处理报障
                        <el-badge :value="portApplyBadgeTenant"/>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-badge>
    </span>
</template>

<script>
    export default {
        name: "MessageBadge",
        props: {
            userType: String,
            color: String,
            userID: String
        },
        watch: {
            userType: {
                handler(val) {
                    if (val == '管理员') {
                        // this.adminGetMessageNoti()
                    }
                },
                immediate: true
            },
            seeRoomApplyBadge: {
                handler(val) {
                    this.total = this.outRoomApplyBadge + val + this.reportApplyBadge
                }
            },
            outRoomApplyBadge: {
                handler(val) {
                    this.total = this.seeRoomApplyBadge + val + this.reportApplyBadge
                }
            },
            reportApplyBadge: {
                handler(val) {
                    this.total = this.outRoomApplyBadge + val + this.seeRoomApplyBadge
                }
            },

            recolletApplyBadgeTenant: {
                handler(val) {
                    this.totalTenant = val  + this.portApplyBadgeTenant
                }
            },

            portApplyBadgeTenant: {
                handler(val) {
                    this.totalTenant = val + this.recolletApplyBadgeTenant
                }
            }

        },
        mounted() {
            // this.getCountRoomApply()
        },
        data() {
            return {
                seeRoomApplyBadge: 0,
                outRoomApplyBadge: 0,
                reportApplyBadge: 0,
                total: 0,
                isOnline: true,
                recolletApplyBadgeTenant: 0,
                portApplyBadgeTenant: 0,
                totalTenant: 0
            }
        },
        methods: {
            adminGetMessageNoti() {
                if (!this.isOnline) return;
                this.axios.get(`/getAdminRoomApplyMessage?userID=${this.userID}`, {
                    timeout: 180000,
                }).then(res => {
                    if (res.data) {
                        if (res.data.code == 200) {
                            res.data.data.forEach((item, i) => {
                                setTimeout(() => {
                                    this.$notify({
                                        title: item.title,
                                        type: 'info',
                                        message: `【${item.date}】 ${item.content}`
                                    })
                                }, i * 100)
                            })
                            this.getCountRoomApply()
                        }
                    }
                    if (res.data.code == 400) return;
                    else {
                        this.adminGetMessageNoti()
                    }
                }).catch(() => {
                    this.adminGetMessageNoti()
                })
            },
            getCountRoomApply() {
                this.axios.get('/getCountRoomApply').then(res => {
                    if (res.status == 200 && res.data.code == 200) {
                        this.seeRoomApplyBadge = res.data.count
                    }
                })
            }
        },
        beforeDestroy() {
            this.axios.get(`/offline?userID=${this.userID}`).then(res => {
                console.log(res);
                this.isOnline = false
            }).catch(() => {
                this.isOnline = false
            })
        },


    }
</script>

<style lang="less" scoped>
    @media screen and (min-width: 240px) {


        .header .right .el-dropdown {
            transform: translateY(-10px);
            margin-right: 10px;
        }
    }

    @media screen and (min-width: 768px) {


        .header .right .el-dropdown {
            transform: translateY(-10px);
            margin-right: 10px;
        }
    }

    @media screen and (min-width: 1330px) {


        .header .right .el-dropdown {
            transform: translateY(-10px);
        }
    }
</style>
