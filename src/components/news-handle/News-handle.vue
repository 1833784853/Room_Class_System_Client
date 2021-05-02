<template>
    <div class="news-box">
        <div class="top">

        </div>
        <div class="container">
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    v-loading="isLoading"
                    :row-style="{backgroundColor: bgc}"
                    :cell-style="'background-color:'+bgc+'!important;color:'+textColor+'!important;'"
                    :header-cell-style="'background-color:'+bgc+'!important;color:'+textColor+'!important;'">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="房源编号">
                                <span>{{ props.row.roomNO.roomNO }}</span>
                            </el-form-item>
                            <el-form-item label="面积">
                                <span>{{ props.row.roomNO.roomArea }}<el-tag
                                        style="margin-left:10px;">（㎡）</el-tag></span>
                            </el-form-item>
                            <el-form-item label="地址">
                                <span>{{ props.row.roomNO.roomAddress }}</span>
                            </el-form-item>
                            <el-form-item label="价格">
                                <span><el-tag type="danger">￥{{ props.row.roomNO.roomPrice }}</el-tag></span>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" icon="el-icon-search" @click="handleNewsHtml(props.row)">预览新闻内容
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>

                <el-table-column
                        label="发布日期">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.newTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="newTitle"
                        label="标题">
                </el-table-column>
                <el-table-column
                        prop="userID.userID.userName"
                        label="发布人">
                </el-table-column>
                <el-table-column
                        prop="newSeeCount"
                        label="浏览次数">
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
            <el-dialog
                    :visible.sync="showNewContent"
                    class="html-dialog">
                <div v-html="newsHtml"></div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "News-handle",
        props: {
            updateMenuTitle: Function,
            bgc:String,
            textColor:String
        },
        mounted() {
            this.updateMenuTitle("新闻管理")
            this.getRoomNews(0)
        },
        data() {
            return {
                isLoading: false,
                tableData: [],
                showNewContent: false,
                newsHtml: '',
                totalPage: 0,
                pageSize: 10,
                currentPage: 0,
            }
        },
        methods: {
            handleEdit(index, row) {
                this.$router.push({
                    path: `/home/news-edit-page/${row.roomNewID}`
                })
            },
            handleDelete(index, row) {
                this.$MessageBox.confirm('此操作将永久删除该记录, 是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post("/News/deleteNews", {
                        roomNewID: row.roomNewID
                    }).then(res => {
                        if (res.status == 200 && res.data.code == 200) {
                            this.$message.success("删除成功")
                            this.getRoomNews(this.currentPage - 1)
                        } else {
                            this.$message.error("删除失败")
                        }
                    })
                })
            },
            handleNewsHtml(row) {
                this.showNewContent = true
                this.newsHtml = row.newHTML
            },
            handleSizeChange(val) {
                console.log(`多少条: ${val}`);
            },
            handleCurrentChange(val) {
                this.getRoomNews(val - 1)
            },
            getRoomNews(val) {
                this.isLoading = true;
                this.axios.post('/News/getAllNews', {
                    "currentPage": val,
                    "pageSize": this.pageSize
                }).then(res => {
                    if (res.status == 200 && res.data.code == 200) {
                        this.tableData = res.data.data.newsList
                        this.totalPage = res.data.data.count
                    }
                    this.isLoading = false;
                }).catch(() => {
                    this.isLoading = false;
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
                padding: 5px;

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
                padding: 10px;

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
                padding: 10px;

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
