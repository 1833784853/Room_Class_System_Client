<template>
    <div id="app">
        <transition name="el-zoom-in-top">
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
</style>
