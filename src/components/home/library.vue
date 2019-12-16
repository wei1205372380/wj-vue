<template>
    <div id="library">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "library"
    }
</script>

<style scoped>
    #library {
        background: url("../../assets/img/library/library.jpg") no-repeat center;
        background-size: cover;
        position: fixed;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
</style>
