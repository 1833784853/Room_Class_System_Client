<template>
    <div class="banner-box" v-loading="isLoading">
        <div class="top">
            <el-button size="medium" type="primary" plain @click="showAddBox = true">添加轮播图</el-button>
        </div>
        <div class="imglistbox">
            <div v-for="item in imgData" :key="item.src" class="banner-item">
                <div style="break-inside:avoid;">
                    <el-image :src="item.bannerImgUrl" :preview-src-list="item.bigSrc">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image>
                    <div class="title">
                        <h4>{{item.bannerTitle}}</h4>
                    </div>
                    <p>{{item.bannerContent}}</p>
                </div>
            </div>
        </div>

        <el-dialog :close-on-click-modal="false" title="添加轮播图" :visible.sync="showAddBox"
                   :destroy-on-close="true">
            <el-form :label-position="formLabelPosition" status-icon ref="form" :rules="rules" :model="form" label-width="100px"
                     size="small">
                <el-form-item label="标题：" prop="title" style="text-align: left">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容：" style="text-align: left" prop="content">
                    <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="图片：" style="text-align:left">
                    <el-upload
                            action=""
                            :http-request="fileUpload"
                            list-type="picture-card"
                            :before-upload="beforeAvatarUpload"
                            :on-preview="handlePictureCardPreview"
                            ref="upload"
                            :auto-upload="false"
                            :limit="1"
                            :on-success="handlePictureCardSuccess">
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">只能上传图片格式的文件（建议尺寸1400x800）</div>
                    </el-upload>

                    <el-dialog :visible.sync="dialogVisible" append-to-body>
                        <img width="100%" :src="imgUrl">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddBox = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')" :loading="addBtnLoading">
                    {{addBtnLoading?"添加中":"添加"}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "Banner-handle",
        props: {
            updateMenuTitle: Function,
            formLabelPosition:String
        },
        mounted() {
            this.updateMenuTitle("轮播图管理")
            this.getBannerData()

        },
        data() {
            let validateTitle = (rule, value, callback) => {
                value = value.trim()
                if (value == '') {
                    callback(new Error("请输入标题"))
                } else {
                    callback()
                }
            }
            let validateContent = (rule, value, callback) => {
                value = value.trim()
                if (value == '') {
                    callback(new Error("请输入内容"))
                } else {
                    callback()
                }
            }
            return {
                showAddBox: false,
                addBtnLoading: false,
                dialogVisible: false,
                imgUrl: '',
                isLoading: false,
                form: {
                    title: '',
                    content: ''
                },
                rules: {
                    title: {validator: validateTitle, trigger: 'blur'},
                    content: {validator: validateContent, trigger: 'blur'}
                },
                imgData: []
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs.upload.submit();
                    }
                })
            },
            handlePictureCardPreview(file) {
                this.imgUrl = file.url
                this.dialogVisible = true;
            },
            beforeAvatarUpload(file) {
                const fileType = file.type === 'image/jpeg' || file.type === 'image/png'
                const fileSize = file.size / 1024 / 1024 < 5
                if (!fileType) {
                    this.$message.error("请上传图片文件、jpg、png")
                    return false;
                }
                if (!fileSize) {
                    this.$message.error("上传失败，文件大小为5M以下")
                    return false;
                }
                return fileType && fileSize
            },
            fileUpload(file, data) {
                this.addBtnLoading = true;
                let {title, content} = this.form
                var formData = new FormData();
                formData.append("file", file.file)
                formData.append("title", title)
                formData.append("content", content)
                this.axios.post("/banner-handle/add", formData, {
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then(res => {
                    this.addBtnLoading = false;
                    if (res.status == 200 && res.data.code == 200) {
                        // Message.success(res.data.msg)
                        this.$message.success(res.data.msg)
                        this.showAddBox = false;
                        this.getBannerData()
                    } else {
                        this.$message.error(res.data.msg)
                    }
                }).catch(() => {
                    this.addBtnLoading = false;
                })
            },
            handlePictureCardSuccess(response, file, list) {
                console.log(response, file, list)
            },
            getBannerData() {
                this.isLoading = true
                this.axios.get("/banner-handle/getBannerAll").then(res => {
                    if (res.status == 200 && res.data.code == 200) {
                        this.imgData = res.data.data;
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

    @media screen and (min-width: 240px) {
        .imglistbox {
            -moz-column-count: 2; /* Firefox */
            -webkit-column-count: 2; /* Safari 和 Chrome */
            column-count: 2;
            -moz-column-gap: 20px;
            -webkit-column-gap: 20px;
            column-gap: 20px;
            display: inline-block;
        }

        #app .banner-box {
            padding: 5px;
            border-radius: 0;
            background-color: #fff;

            .top {
                text-align: left;
                margin: 10px 0;
            }

        }
    }

    @media screen and (min-width: 768px) {
        #app .banner-box {
            .imglistbox {
                -moz-column-count: 4; /* Firefox */
                -webkit-column-count: 4; /* Safari 和 Chrome */
                column-count: 4;
                -moz-column-gap: 15px;
                -webkit-column-gap: 15px;
                column-gap: 15px;
                display: inline-block;
            }

            padding: 10px;
            border-radius: 10px;
            background-color: #fff;

            .top {
                text-align: left;
                margin: 20px 0;
            }

            .banner-item {
                padding: 10px;
                transition: all .4s;

                &:hover {
                    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                }
            }
        }

    }

    @media screen and (min-width: 1330px) {
        #app .banner-box {
            .imglistbox {
                -moz-column-count: 6; /* Firefox */
                -webkit-column-count: 6; /* Safari 和 Chrome */
                column-count: 6;
                -moz-column-gap: 30px;
                -webkit-column-gap: 30px;
                column-gap: 30px;
                display: inline-block;
            }

            padding: 20px;
            border-radius: 10px;
            background-color: #fff;

            .top {
                text-align: left;
                margin: 20px 0;
            }

            .banner-item {
                padding: 10px;
                transition: all .4s;

                &:hover {
                    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                }
            }
        }
    }
</style>
