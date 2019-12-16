<template>
    <el-button type="text">
        <span style="padding: 10px 0px 5px; font-family: fantasy" @click="toIndex">
            <span class="title" style="font-size: 30px; color: #FFFFFF">White Jotter</span>
            <span class="designer" style="color: #9A9A9A">
                <span style="font-size: 7px">by</span>
                <span style="font-size: 15px">Lin</span>
            </span>
        </span>
    </el-button>
</template>

<script>
    export default {
        name: "logo",
        methods: {
            toIndex() {
                this.$router.push("/index");
            }
        }
    }
</script>

<style scoped>

</style>
