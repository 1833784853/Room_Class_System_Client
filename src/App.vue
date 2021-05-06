<template>
    <div id="app">
        <transition name="el-fade-in-linear">
            <router-view style="position: absolute;width: 100%"/>
        </transition>
    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {}
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    ul {
        list-style-type: none;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }

    .image-slot {
        height: 100%;
        position: relative;
        background-color: #eee;
    }

    .image-slot i {
        position: absolute;
        top: 50%;
        left: 50%;
        color: #CDCBCB;
        transform: translate(-50%, -50%);
    }

    .houseBanner .el-carousel__container {
        height: 100%;
    }

    #app .el-calendar-day {
        height: 100px;
    }
    #app .dialogWrite {
        background-color: #fff;
        color: #909399;
    }
    #app .dialogBlank {
        background-color: #100C2A;
        color: #fff;
    }
</style>
