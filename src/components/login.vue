<template>
    <div>
        <el-form :model="data" label-width="100px">
            <el-form-item label="用户名">
                <el-input v-model="data.username" autocomplete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="data.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('data')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            submitForm(data) {
                console.log(this.data);
            }
        }
    }
</script>

<style scoped>

</style>
