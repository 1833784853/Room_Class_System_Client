<template>
    <div class="student-box" >
<!--        <StudentItem v-for="(item,i) in datas" :key="i" :data="item"/>-->
    </div>
</template>

<script>
    import 'vue-cli-plugin-axios'
    export default {
        name: "StudentList",
        mounted() {

        },
        data:function () {
            return {
                isLoading:false,
                datas:[{
                    id:1,
                    name:"小红",
                    status:1,
                    time:"2020-12-11"
                },{
                    id:2,
                    name:"小红",
                    status:0,
                    time:"2020-12-11"
                },{
                    id:3,
                    name:"小红",
                    status:0,
                    time:"2020-12-11"
                }]
            }
        },

    }
</script>

<style scoped>
    .student-box {
        background-color: #fff;

    }
</style>
