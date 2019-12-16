<template>
    <div class="main-menu-tag" style="margin-top: 50px">
        <div class="search-book" style="display: flex; justify-content: center" v-if="this.$route.path.match('/LibraryHome')">
            <el-row :gutter="20" style="margin-bottom: 50px; width: 500px; display: flex; align-items: center">
                <el-col :span="20">
                    <el-input placeholder="作者或者书名"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button icon="el-icon-search" circle size="medium" type="primary"></el-button>
                </el-col>
            </el-row>
        </div>
        <el-row style="width: 950px; height: 280px">
            <el-col v-for="(item,i) in firstRowTags" :key="i" :span="4.8">
                <MainMenuCard :tag="item"/>
            </el-col>
        </el-row>
        <el-row style="width: 950px; height: 280px">
            <el-col v-for="(item,i) in secondRowTags" :key="i" :span="4.8">
                <MainMenuCard :tag="item"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import MainMenuCard from "./MainMenuCard";
    import { getSubTags } from "../../../request/api";

    export default {
        name: "LibraryHome",
        data() {
            return {
                allTags: [],
                firstRowTags: [],
                secondRowTags: []
            }
        },
        components: {MainMenuCard},
        mounted() {
            getSubTags(this.GLOBAL.originalTagId)
                .then(response => {
                    this.allTags = response.data.data;
                    this.firstRowTags = this.allTags.slice(0, 5);
                    this.secondRowTags = this.allTags.slice(5, 10);
                })
        }
    }
</script>

<style scoped>

</style>
