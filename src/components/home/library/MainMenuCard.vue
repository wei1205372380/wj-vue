<template>
    <div style="width: 180px; height: 250px; margin: 0 10px 20px 0">
        <div style="width: 100%; height: 80%">
            <el-button style="width: 100%; height: 100%; padding: 0; border: none; border-radius: unset; line-height: 0" @click="toBooksPage">
                <el-image :src="require('../../../assets/img/library/' + tag.id + '.jpg')" style="width: 100%; height: 100%" fit="fill"/>
            </el-button>
        </div>

        <div style="width: 100%; height: 20%" class="main-tag-foot">
            <el-cascader :placeholder="tag.name" :props="props" :show-all-levels="false" clearable :disabled="tag.id == '000'" @change="changeToTag" v-model="content"></el-cascader>
        </div>
    </div>
</template>

<script>
    import  { getSubTags } from "../../../request/api";

    export default {
        name: "MainMenuCard",
        props: ["tag"],
        data() {
            return {
                content: [],
                toTagId: this.tag.id,
                props: {
                    checkStrictly: true,
                    expandTrigger: "hover",
                    lazy: true,
                    lazyLoad: (node, resolve) => {
                        let id = node.value ? node.value : this.tag.id;
                        let { level } = node;
                        getSubTags(id)
                            .then(response => {
                                let nodes = response.data.data.map(item => ({
                                    value: item.id,
                                    label: item.name,
                                    leaf: level >= 1
                                }));
                                resolve(nodes);
                            });
                    }

                }
            }
        },
        watch: {
            content() {
                if (this.content.length === 0) {
                    this.toTagId = this.tag.id
                }
            }
        },
        methods: {
            toBooksPage() {
                this.$router.push({path: "books", query: {tagId: this.toTagId}});
            },
            changeToTag(id) {
                this.toTagId = id[id.length - 1];
            }
        }
    }
</script>

<style>
    .main-tag-foot .el-input__inner {
        border-radius: unset;
        border: none;
        color: black;
    }
    .main-tag-foot .el-input__inner::-webkit-input-placeholder {
        color: black;
    }
</style>
