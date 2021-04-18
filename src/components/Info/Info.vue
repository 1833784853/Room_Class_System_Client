<template>
    <AdminInfo v-if="userType === '管理员'" :formLabelPosition="formLabelPosition" :updateMenuTitle="updateMenuTitle"
               :userID="userID" :bgc="bgc"
               :text-color="textColor"
               :active-color="activeColor" :flag="flag"/>
    <UserInfo v-else-if="userType === '普通用户'" :formLabelPosition="formLabelPosition" :updateMenuTitle="updateMenuTitle" :userID="userID"
              :bgc="bgc"
              :text-color="textColor"
              :active-color="activeColor" :flag="flag"/>
    <div v-else></div>
</template>

<script>
    import AdminInfo from "./AdminInfo";
    import UserInfo from "./UserInfo";

    export default {
        name: "Info",
        props: {
            formLabelPosition: String,
            updateMenuTitle: Function,
            userID: String,
            userType: String,
            bgc: String,
            textColor: String,
            activeColor: String,
            flag: Boolean,
        },
        components: {
            AdminInfo,
            UserInfo
        },
        mounted() {
        },
        data() {

            return {}
        },
        methods: {}
    }
</script>

<style lang="less" scoped>

</style>
