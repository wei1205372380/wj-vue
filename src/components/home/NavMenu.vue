<template>
    <div class="menu" style="background-color: #34302D">
        <el-row :gutter="20" style="width: 38%">
            <el-col :span="8"  class="menu-item" style="height: 100%">
                <logo/>
            </el-col>
            <el-col :span="16"  class="menu-item">
                <el-menu router mode="horizontal" :default-active="currentPath" style="border-bottom: none">
                    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.path" style="background-color: #34302D; font-size: 16px; color: #FFFFFF">
                        {{ item.name }}
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import logo from "./logo";

    export default {
        name: "NavMenu",
        data() {
            return {
                navList: [
                    {path: "/index", name: "首页"},
                    {path: "/jotter", name: "笔记本"},
                    {path: "/library", name: "图书馆"},
                    {path: "/admin", name: "个人中心"}
                ],
                currentPath: this.$route.path
            }
        },
        components: {logo}
    }
</script>

<style>
    .menu,.menu-item {
        display: flex;
        /*align-items: center;*/
        justify-content: center;
    }
    body {
        margin: 0;
        padding: 0;
    }
</style>
