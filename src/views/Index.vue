<template>
    <!--    首页    -->
    <el-container>
        <el-header height="70px">
            <IndexNav/>
        </el-header>
        <el-main>
            <BannerComponent/>
            <div class="news-content">
                <el-row :gutter="20">
                    <el-col :lg="18">
                        <NewHouse />
                        <LeaseHouse />
                    </el-col>
                    <el-col :lg="6">
                        <TopHouse />
                    </el-col>
                </el-row>
            </div>
        </el-main>
        <el-footer>
            <IndexFooter/>
        </el-footer>
    </el-container>
</template>

<script>
    import IndexNav from "../components/Index/IndexNav";
    import IndexFooter from "../components/Index/IndexFooter";
    import BannerComponent from "../components/Index/BannerComponent"
    import NewHouse from "../components/Index/NewHouse";
    import LeaseHouse from "../components/Index/LeaseHouse"
    import TopHouse from "../components/Index/TopHouse";

    export default {
        name: "Index",
        components: {
            IndexNav,
            IndexFooter,
            BannerComponent,
            NewHouse,
            LeaseHouse,
            TopHouse
        },

    }
</script>

<style lang="less" scoped>
    @bgc: #00d2ff;
    @activeColor: #0125ff;

    .container-main(@width) {
        min-width: @width;
        margin: 0 auto;
    }

    #app {
        .el-header {
            background-color: @bgc;
        }

        .el-main {
            overflow: visible;
            height: auto;
            padding-top: 20px;
            background-color: #fafafa;
        }
        .news-content {
            overflow: hidden;
        }
    }
    @media screen and (min-width: 240px) {
        #app .news-content {
            min-width: 240px;
        }
    }
    @media screen and (min-width: 768px) {
        #app .news-content {
            min-width: 678px;
            margin: 0 auto;
            padding: 10px 0;
        }
    }
    @media screen and (min-width: 1330px) {
        #app .news-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px 0;
        }
    }
</style>
