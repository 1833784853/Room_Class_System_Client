<template>
    <div class="editor" v-loading="isLoading">
        <div ref="toolbar" class="toolbar">
        </div>
        <div ref="editor" class="text">
        </div>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
        name: "WangEditor",
        data() {
            return {
                // uploadPath,
                editor: null,
                info_: "",
                isLoading: false,
                addImgArr: [], // 往富文本里添加的图片
                removeImgArr: []
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            isClear: {
                type: Boolean,
                default: false
            },
            getEdithorContent: Function
        },
        watch: {
            isClear(val) {
                // 触发清除文本域内容
                if (val) {
                    this.editor.txt.clear()
                    this.info_ = null
                }
            },
            info_: {
                handler(value) {
                    let index = 0;
                    while ((index = value.indexOf("<img", index + 3)) != -1) {
                        let start = value.indexOf("http", index)
                        let end = value.indexOf("\"", start + 1)
                        let string = value.substring(start, end)
                        if (this.addImgArr.length > 0) {
                            this.addImgArr.forEach(item => {
                                let flag = true;
                                this.addImgArr.forEach(i => {
                                    if (string == i) {
                                        flag = false;
                                    }
                                })
                                if (flag) {
                                    this.addImgArr.push(string)

                                }
                            })
                        } else {
                            this.addImgArr.push(string)
                        }
                    }
                }
                //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
            },
            value: {
                handler(value) {
                    if (this.editor != null) {
                        this.editor.txt.html(value)
                    }
                },
                immediate: true
            }
        },
        mounted() {
            this.seteditor()
        },
        methods: {
            seteditor() {
                this.editor = new E(this.$refs.toolbar, this.$refs.editor)
                this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
                this.editor.config.uploadImgMaxLength = 1 // 限制一次最多上传 1 张图片
                this.editor.config.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
                // 配置菜单
                this.editor.config.menus = [
                    'head',
                    'bold',
                    'fontSize',
                    'fontName',
                    'italic',
                    'underline',
                    'strikeThrough',
                    'indent',
                    'lineHeight',
                    'foreColor',
                    'backColor',
                    'link',
                    'list',
                    'todo',
                    'justify',
                    'quote',
                    'emoticon',
                    'image',
                    'video',
                    'table',
                    'code',
                    'splitLine',
                    'undo',
                    'redo',
                ]

                this.editor.config.uploadImgHooks = {
                    fail: (xhr, editor, result) => {
                        // 插入图片失败回调
                        this.$message.error("图片上传失败，请联系管理员！！")
                    },
                    timeout: (xhr, editor) => {
                        // 网络超时的回调
                        this.$message.error("网络开小差啦！")
                    },
                    error: (xhr, editor) => {
                        // 图片上传错误的回调
                        this.$message.error("图片上传失败，请重新上传")
                    },
                }
                this.editor.config.customUploadImg = (resultFiles, insertImgFn) => {
                    var formData = new FormData();
                    this.isLoading = true;
                    formData.append("file", resultFiles[0])
                    this.axios.post('/News/getNewsImgUrl', formData, {
                        headers: {'Content-Type': 'multipart/form-data'},
                    }).then((res) => {
                        if (res.status == 200 && res.data.errno == 0) {
                            this.addImgArr.push(res.data.data[0])
                            insertImgFn(res.data.data)
                        }
                    }).catch(() => {
                        this.isLoading = false;
                    })
                    // 上传图片，返回结果，将图片插入到编辑器中
                }
                this.editor.config.onchange = (html) => {
                    if (html == "") return
                    this.info_ = html // 绑定当前逐渐地值
                    this.addImgArr.forEach(i => {
                        let flag = true;
                        if (this.info_.indexOf(i) == -1) {
                            this.removeImgArr.forEach(item => {
                                if (item == i) {
                                    flag = false
                                }
                            })
                            if (flag) {
                                this.removeImgArr.push(i)

                            }
                        }
                    })
                    this.getEdithorContent(this.info_, this.removeImgArr)
                }
                this.editor.config.showFullScreen = true
                // 创建富文本编辑器
                this.editor.create()
            }
        }
    }
</script>

<style scoped>
    .editor {
        width: 100%;
        margin: 0 auto;
        position: relative;
        z-index: 0;
    }

    .toolbar {
        border: 1px solid #ccc;
    }

    .text {
        border: 1px solid #ccc;
        min-height: 500px;
    }
</style>
